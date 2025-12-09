// import axios from "axios";
// import { useEffect, useState } from "react";

// const API = `${process.env.REACT_APP_API_BASE}/api/messages`;

// const HostMessageSection = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [loading, setLoading] = useState(true);

//     // ✅ Fetch all host messages
//     const fetchMessages = async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get(`${API}`, { withCredentials: true }); // ✅ Fetch from /api/messages
//             if (res.data.success) {
//                 setMessages(res.data.messages);
//             } else {
//                 console.warn("Failed to fetch messages:", res.data.message);
//             }
//         } catch (err) {
//             console.error("Error fetching messages:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchMessages();
//         // Optional: refresh every 5 seconds
//         const interval = setInterval(fetchMessages, 5000);
//         return () => clearInterval(interval);
//     }, []);

//     // ✅ Send a new message
//     const handleSendMessage = async () => {
//         if (!newMessage.trim()) return;
//         try {
//             const res = await axios.post(
//                 `${API}`,
//                 { text: newMessage },
//                 { withCredentials: true }
//             );
//             if (res.data.success) {
//                 setMessages((prev) => [...prev, res.data.message]);
//                 setNewMessage("");
//             } else {
//                 console.warn("Failed to send message:", res.data.message);
//             }
//         } catch (err) {
//             console.error("Error sending message:", err);
//         }
//     };

//     return (
//         <div className="messages-section">
//             <h2>Messages</h2>

//             {loading ? (
//                 <p>Loading messages...</p>
//             ) : (
//                 <div className="chat-box">
//                     {messages.length === 0 ? (
//                         <p>No messages yet.</p>
//                     ) : (
//                         messages.map((msg, index) => (
//                             <div
//                                 key={index}
//                                 className={`chat-message ${msg.sender === "Host" ? "host" : "guest"
//                                     }`}
//                             >
//                                 <p>{msg.text}</p>
//                                 <span className="timestamp">
//                                     {new Date(msg.createdAt).toLocaleTimeString()}
//                                 </span>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}

//             {/* Input for new message */}
//             <div className="chat-input">
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default HostMessageSection;




const HostMessageSection = () => {
    return (

        <div className="booking-status">
            <h2>message Status</h2>
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px", color: "#777" }}>
                🚧 Coming Soon 🚧
            </p>
        </div>

    )
}

export default HostMessageSection



