import React from 'react';

function Matches() {

 const styles = {
   sidebar: {
     width: "40%",
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

  return (
    <div style={styles.sidebar}>
      <h4 style={styles.sectionTitle}>NEW MATCHES</h4>

      <div style={styles.matches}>
        <div style={styles.match}>
          <img
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200"
            alt="Sophia"
            style={styles.matchImage}
          />
          <span>Sophia</span>
        </div>
      </div>

      <h4 style={{ ...styles.sectionTitle, marginTop: "40px" }}>
        New Connection Request
      </h4>

      <div style={styles.conversation}>
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200"
          alt="Sophia"
          style={styles.conversationImage}
        />
        <div>
          <h5 style={styles.name}>Sophia</h5>
          <p style={styles.message}>I'd love that 🌸</p>
        </div>
        <div style={styles.buttonGroup}>
          <button style={styles.rejectBtn}>Reject</button>
          <button style={styles.acceptBtn}>Accept</button>
        </div>
      </div>
    </div>
  );
}



export default Matches;
