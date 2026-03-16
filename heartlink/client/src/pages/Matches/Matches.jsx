import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { ConnectionRequest } from '../../services/Api/user';
import toast from 'react-hot-toast';

function Matches() {

 const styles = {
   sidebar: {
     width: "60%",
     height: "100vh",
     padding: "20px",
     fontFamily: "Arial, sans-serif",
   },

   sectionTitle: {
     fontSize: "12px",
     letterSpacing: "1px",
     color: "#888",
     marginBottom: "15px",
   },

   matches: {
     display: "flex",
     gap: "15px",
   },

   match: {
     textAlign: "center",
     fontSize: "12px",
   },

   matchImage: {
     width: "60px",
     height: "60px",
     borderRadius: "50%",
     objectFit: "cover",
     border: "2px solid #ff4d6d",
     padding: "2px",
   },

   conversation: {
     display: "flex",
     alignItems: "center",
     justifyContent: "space-between",
     marginBottom: "20px",
     padding: "12px",
     borderRadius: "12px",
     cursor: "pointer",
   },

   conversationImage: {
     width: "50px",
     height: "50px",
     borderRadius: "50%",
     objectFit: "cover",
     marginRight: "12px",
   },

   name: {
     margin: 0,
     color:"pink",
     fontSize: "14px",
   },

   message: {
     margin: "4px 0 0",
     fontSize: "13px",
     color: "#aaa",
   },

   buttonGroup: {
     display: "flex",
     alignItems: "center",
     gap: "8px",
   },

   acceptBtn: {
     padding: "4px 10px",
     borderRadius: "12px",
     border: "1px solid #4CAF50",
     background: "transparent",
     color: "#4CAF50",
     fontSize: "12px",
     cursor: "pointer",
   },

   rejectBtn: {
     padding: "4px 10px",
     borderRadius: "12px",
     border: "1px solid #ff4d4d",
     background: "transparent",
     color: "#ff4d4d",
     fontSize: "12px",
     cursor: "pointer",
   },
  };
  


   const { mutate:acceptOrRjectMutation} = useMutation({
     mutationFn: ConnectionRequest.AcceptOrRejectConnection,
     onSuccess: ( data ) => {
       toast.success(data?.message);
     },

     onError: (error) => {
       toast.error(error?.response?.data?.message || "Registration failed");
     },
   });


    const { data: connectionRequest } = useQuery({
      queryKey: ["user/connection"],
      queryFn: ConnectionRequest.connectionRecieve,
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to load profile");
      },
    } );
  
  
  const { data: userConnectionReicieve } = useQuery({
    queryKey: ["user/connection/receve"],
    queryFn: ConnectionRequest.getConnection,
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to load profile");
    },
  } );
  
  

  const ConnectionRecive = connectionRequest?.data

  const handleRequest = (  Id, status  ) => {
    acceptOrRjectMutation( {Id, status } )
  }

  return (
    <div style={styles.sidebar}>
      <h4 style={styles.sectionTitle}>NEW MATCHES</h4>
      {userConnectionReicieve?.data?.map((conenction) => (
        <div style={styles.matches} key={conenction?._id}>
          <div style={styles.match}>
            <img
              src={conenction?.fromUserId?.profileId?.profilePic}
              alt="Sophia"
              style={styles.matchImage}
            />
          </div>
        </div>
      ))}

      <h4 style={{ ...styles.sectionTitle, marginTop: "40px" }}>
        New Connection Request
      </h4>
      <div>
        {ConnectionRecive?.map((userReuest) => (
          <div style={styles.conversation} key={userReuest._id}>
            <img
              src={userReuest?.fromUserId?.profileId?.profilePic}
              alt="Sophia"
              style={styles.conversationImage}
            />
            <div>
              <h5 style={styles.name}>{userReuest?.fromUserId?.name}</h5>
              <p style={styles.message}>
                {userReuest?.fromUserId?.profileId?.bio}
              </p>
            </div>
            <div style={styles.buttonGroup}>
              <button
                style={styles.rejectBtn}
                onClick={() => handleRequest(userReuest?._id, "rejected")}
              >
                Reject
              </button>
              <button
                style={styles.acceptBtn}
                onClick={() => handleRequest(userReuest?._id, "accepted")}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default Matches;
