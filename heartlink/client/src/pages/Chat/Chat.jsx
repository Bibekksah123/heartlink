import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const INITIAL_CONVOS = {
  1: {
    name: "Sophia Laurent",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80",
    online: true,
    msgs: [
      {
        t: "received",
        txt: "Hey! I noticed we matched 😊 I love your travel photos!",
        time: "10:14 AM",
      },
      {
        t: "sent",
        txt: "Thank you! Paris must be incredible for photography. I'd love to visit.",
        time: "10:15 AM",
      },
      {
        t: "received",
        txt: "You absolutely should! The golden hour here is magical. When are you next in Europe?",
        time: "10:17 AM",
      },
      {
        t: "sent",
        txt: "Maybe this spring? I've been meaning to visit the Louvre properly.",
        time: "10:20 AM",
      },
      {
        t: "received",
        txt: "Oh I work near there! I could give you a private curator's tour 🎨",
        time: "10:22 AM",
      },
      {
        t: "sent",
        txt: "That sounds absolutely incredible, I'd love that!",
        time: "10:23 AM",
      },
      { t: "received", txt: "I'd love that 🌸", time: "10:25 AM" },
    ],
  },
  2: {
    name: "Isabella Chen",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    online: false,
    msgs: [
      {
        t: "received",
        txt: "Hi! Your design portfolio is stunning.",
        time: "Yesterday",
      },
      {
        t: "sent",
        txt: "Thank you so much! Architecture and design are basically the same soul.",
        time: "Yesterday",
      },
      {
        t: "received",
        txt: "Exactly! I feel like you'd love the new MOMA exhibition.",
        time: "Yesterday",
      },
      {
        t: "sent",
        txt: "I've been wanting to go! Are you free this weekend?",
        time: "Yesterday",
      },
      { t: "received", txt: "See you Saturday?", time: "2h ago" },
    ],
  },
  3: {
    name: "Elena Voss",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80",
    online: true,
    msgs: [{ t: "received", txt: "New match! Say hello 👋", time: "3h ago" }],
  },
};

function Chat() {
  const [convos, setConvos] = useState(INITIAL_CONVOS);
  const [activeChatId, setActiveChatId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [msgInput, setMsgInput] = useState('');

  const chatWindowRef = useRef(null);

  useEffect(() => {
    // scroll to bottom whenever messages or active chat change
    const container = chatWindowRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [convos, activeChatId]);

  const handleSend = () => {
    if (!msgInput.trim()) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConvos(prev => {
      const convo = { ...prev[activeChatId] };
      convo.msgs = [...convo.msgs, { t: 'sent', txt: msgInput, time: timeString }];
      return { ...prev, [activeChatId]: convo };
    });
    setMsgInput('');
  };

  const handleKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredIds = Object.keys(convos).filter(id =>
    convos[id].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const active = convos[activeChatId];

  return (
    <div className="page page-fade" id="pg-messages">
      <div className="app-layout">
        <div className="app-content" style={{ overflow: 'hidden' }}>
          <div className="chat-layout">
            <div className="chat-list-panel">
              <div className="cl-header">
                <div className="cl-title">Messages</div>
                <div className="cl-search">
                  <span className="cl-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="cl-list">
                {filteredIds.length > 0 ? (
                  filteredIds.map(id => {
                    const m = convos[id];
                    const last = m.msgs[m.msgs.length - 1];
                    const preview = last ? last.txt : '';
                    return (
                      <div
                        key={id}
                        className={`cl-item ${+id === activeChatId ? 'active' : ''}`}
                        onClick={() => setActiveChatId(+id)}
                      >
                        <div className="cl-av">
                          <img src={m.img} alt={m.name} />
                          {m.online && <div className="cl-online" />}
                        </div>
                        <div className="cl-info">
                          <div className="cl-name">{m.name}</div>
                          <div className="cl-preview">{preview}</div>
                        </div>
                        <div className="cl-meta">
                          <div className="cl-time">{last?.time}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ padding: '20px', color: 'var(--muted)', textAlign: 'center' }}>
                    No conversations found.
                  </div>
                )}
              </div>
            </div>
            <div className="chat-window" id="chatWindow">
              {active ? (
                <>
                  <div className="cw-header">
                    <div className="cw-av">
                      <img id="cw-av-img" src={active.img} alt={active.name} />
                    </div>
                    <div className="cw-info">
                      <div className="cw-name" id="cw-name">
                        {active.name}
                      </div>
                      <div className="cw-status">
                        {active.online ? '🟢 Online now' : '⚪ Offline'}
                      </div>
                    </div>
                    <div className="cw-acts">
                      <div className="cw-act-btn">📞</div>
                      <div className="cw-act-btn">🎥</div>
                      <div className="cw-act-btn" onClick={() => {}}>
                        👤
                      </div>
                    </div>
                  </div>
                  <div className="cw-messages" id="cwMessages" ref={chatWindowRef}>
                    {active.msgs.map((msg, idx) => (
                      <div key={idx} className="msg-group">
                        <div className={`msg ${msg.t}`}>{msg.txt}</div>
                        <div className={`msg-time ${msg.t}`}>{msg.time}</div>
                      </div>
                    ))}
                  </div>
                  <div className="cw-input-area">
                    <div className="cw-attach">📎</div>
                    <div className="cw-input-wrap">
                      <input
                        className="cw-input"
                        id="msgInput"
                        type="text"
                        placeholder="Write a message…"
                        value={msgInput}
                        onChange={e => setMsgInput(e.target.value)}
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
                <div className="cw-header">Select a chat</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
