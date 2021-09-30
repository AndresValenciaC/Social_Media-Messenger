/** Emit cheatsheet
 * https://socket.io/docs/v3/emit-cheatsheet/
   add socket.io-client for client side
*/

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

/** Need to get the socket and user id */

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
// find user to send message

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // When connected
  console.log("User Connected in Socket Server");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // When disconnected
  socket.on("disconnect", () => {
    console.log("User disconnected!");
    removeUser(socket.id);
  });
});
