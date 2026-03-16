import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Chat.css";
import { useQuery } from "@tanstack/react-query";
import { ConnectionRequest } from "../../services/Api/user";
import { useAuth } from "../../hooks/useAuth";
import { soketConnection } from "../../services/socket/socketConnection";
import { ChatConnection } from "../../services/socket/socket";

function Chat() {
  const { user: loginUser } = useAuth();
  const currentUserId = loginUser?.data?._id;

  const [activeChatId, setActiveChatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const socketRef = useRef(null);
  const chatEndRef = useRef(null);
  const prevChatId = useRef(null);

  // ─── 1. FETCH CONNECTIONS ──────────────────────────────────────────────────
  const {
    data: connections = {},
    isLoading: connectionsLoading,
    isError,
    error: connectionsError,
  } = useQuery({
    queryKey: ["user/connection/receive/chat"],
    queryFn: ConnectionRequest.getConnection,
  });

  // Shape connections — determine friend based on which side is NOT the current user
  const friendList = (connections?.data ?? []).map((c) => {
    const friend =
      c?.fromUserId?._id === currentUserId ? c?.toUserId : c?.fromUserId;
    return {
      id: friend?._id,
      name: friend?.name ?? "Unknown",
      img:
        friend?.profileId?.profilePic ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(friend?.name ?? "U")}`,
      online: false,
    };
  });

  // Auto-select first friend once list loads
  useEffect(() => {
    if (friendList.length > 0 && !activeChatId) {
      setActiveChatId(friendList[0].id); // ✅ .id not ._id
    }
  }, [friendList.length]);

  // ─── 2. FETCH CHAT HISTORY when active chat changes ───────────────────────
  useEffect(() => {
    if (!activeChatId || !currentUserId) return;

    const loadHistory = async () => {
      try {
        setChatLoading(true);
        setMessages([]);

        const response = await ChatConnection.getChat(activeChatId);

        // Backend returns: { data: { participate:[...], message:[...] } }
        // OR flat:          { participate:[...], message:[...] }
        const chatDoc =
          response?.data?.data ?? // axios wraps in .data
          response?.data ??
          response;

        const history = chatDoc?.message ?? [];

        const shaped = history.map((m) => ({
          id: m._id?.toString() ?? `${Date.now()}-${Math.random()}`,
          text: m.text,
          // ✅ toString() comparison handles ObjectId vs string mismatch
          fromMe: (m.senderId?._id ?? m.senderId)?.toString() === currentUserId?.toString(),
          time: new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(shaped);
      } catch (err) {
        console.error("❌ Failed to load chat history:", err);
      } finally {
        setChatLoading(false);
      }
    };

    loadHistory();
  }, [activeChatId, currentUserId]);

  // ─── 3. SOCKET — connect once, switch rooms when activeChatId changes ─────
  useEffect(() => {
    if (!currentUserId) return;

    // Create singleton socket only once
    if (!socketRef.current) {
      socketRef.current = soketConnection();
    }

    const socket = socketRef.current;

    // Wait until actually connected before emitting
    const joinRoom = () => {
      // Leave previous room
      if (prevChatId.current && prevChatId.current !== activeChatId) {
        socket.emit("leaveChat", {
          userId: currentUserId,
          toUserId: prevChatId.current,
        });
        console.log("🚪 Left room:", prevChatId.current);
      }

      // Join new room
      if (activeChatId) {
        socket.emit("joinChat", {
          userId: currentUserId,
          toUserId: activeChatId,
        });
        prevChatId.current = activeChatId;
        console.log("🏠 Joined room:", currentUserId, "<->", activeChatId);
      }
    };

    // If already connected, join immediately; else wait for connect event
    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    // ✅ FIX: backend emits "timestamp" not "createdAt"
    const handleReceive = ({ from, text, timestamp }) => {
      console.log("📩 receiveChat fired:", { from, text, timestamp });

      if (from === currentUserId) return; // already shown optimistically
      if (from !== activeChatId) return; // ignore messages from other rooms

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text,
          fromMe: false,
          time: new Date(timestamp || Date.now()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    };

    socket.on("receiveChat", handleReceive);

    return () => {
      socket.off("connect", joinRoom); // cleanup pending connect listener
      socket.off("receiveChat", handleReceive); // cleanup message listener
    };
  }, [activeChatId, currentUserId]);

  // Disconnect socket only when component fully unmounts
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        console.log("🔌 Socket disconnected on unmount");
      }
    };
  }, []);

  // ─── 4. AUTO-SCROLL ────────────────────────────────────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ─── 5. SEND MESSAGE ───────────────────────────────────────────────────────
  const handleSend = useCallback(() => {
    const msg = msgInput.trim();
    if (!msg || !activeChatId || !socketRef.current) return;

    const now = new Date();

    // Optimistic UI — show immediately
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: msg,
        fromMe: true,
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    // Emit to backend
    socketRef.current.emit("sendChat", {
      userId: currentUserId,
      toUserId: activeChatId,
      text: msg,
    });

    console.log("📤 sendChat emitted:", {
      userId: currentUserId,
      toUserId: activeChatId,
      text: msg,
    });

    setMsgInput("");
  }, [msgInput, activeChatId, currentUserId]);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // ─── 6. DERIVED ────────────────────────────────────────────────────────────
  const filteredFriends = friendList.filter((f) =>
    f?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const activeFriend = friendList.find((f) => f.id === activeChatId) ?? null;

  // ─── 7. RENDER ─────────────────────────────────────────────────────────────
  return (
    <div className="page page-fade" id="pg-messages">
      <div className="app-layout">
        <div className="app-content" style={{ overflow: "hidden" }}>
          <div className="chat-layout">
            {/* ── LEFT PANEL ───────────────────────────────────────────── */}
            <div className="chat-list-panel">
              <div className="cl-header">
                <div className="cl-title">Messages</div>
                <div className="cl-search">
                  <span className="cl-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="cl-list">
                {connectionsLoading && (
                  <div className="cl-status-msg">Loading connections…</div>
                )}
                {isError && (
                  <div className="cl-status-msg" style={{ color: "red" }}>
                    {connectionsError?.response?.data?.message ||
                      "Failed to load connections."}
                  </div>
                )}
                {!connectionsLoading && filteredFriends.length === 0 && (
                  <div className="cl-status-msg">No conversations found.</div>
                )}

                {filteredFriends.map((friend) => {
                  const lastMsg =
                    friend.id === activeChatId
                      ? messages[messages.length - 1]
                      : null;

                  return (
                    <div
                      key={friend.id}
                      className={`cl-item ${friend.id === activeChatId ? "active" : ""}`}
                      onClick={() => {
                        if (friend.id !== activeChatId)
                          setActiveChatId(friend.id);
                      }}
                    >
                      <div className="cl-av">
                        <img src={friend.img} alt={friend.name} />
                        {friend.online && <div className="cl-online" />}
                      </div>
                      <div className="cl-info">
                        <div className="cl-name">{friend.name}</div>
                        <div className="cl-preview">
                          {lastMsg?.text ?? "Say hello 👋"}
                        </div>
                      </div>
                      <div className="cl-meta">
                        <div className="cl-time">{lastMsg?.time ?? ""}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── CHAT WINDOW ──────────────────────────────────────────── */}
            <div className="chat-window" id="chatWindow">
              {activeFriend ? (
                <>
                  <div className="cw-header">
                    <div className="cw-av">
                      <img src={activeFriend.img} alt={activeFriend.name} />
                    </div>
                    <div className="cw-info">
                      <div className="cw-name">{activeFriend.name}</div>
                      <div className="cw-status">
                        {activeFriend.online ? "🟢 Online now" : "⚪ Offline"}
                      </div>
                    </div>
                    <div className="cw-acts">
                      <div className="cw-act-btn">📞</div>
                      <div className="cw-act-btn">🎥</div>
                      <div className="cw-act-btn">👤</div>
                    </div>
                  </div>

                  <div className="cw-messages" id="cwMessages">
                    {chatLoading ? (
                      <div className="cl-status-msg">Loading messages…</div>
                    ) : (
                      <>
                        {messages.map((msg) => (
                          <div key={msg.id} className="msg-group">
                            <div
                              className={`msg ${msg.fromMe ? "sent" : "received"}`}
                            >
                              {msg.text}
                            </div>
                            <div
                              className={`msg-time ${msg.fromMe ? "sent" : "received"}`}
                            >
                              {msg.time}
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </>
                    )}
                  </div>

                  <div className="cw-input-area">
                    <div className="cw-attach">📎</div>
                    <div className="cw-input-wrap">
                      <input
                        className="cw-input"
                        type="text"
                        placeholder="Write a message…"
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}
                        onKeyDown={handleKey}
                      />
                      <button className="cw-emoji-btn">😊</button>
                    </div>
                    <button className="cw-send" onClick={handleSend}>
                      ➤
                    </button>
                  </div>
                </>
              ) : (
                <div className="cw-empty">
                  {connectionsLoading
                    ? "Loading…"
                    : "Select a conversation to start chatting"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
