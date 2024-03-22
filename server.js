const net = require("net");

const server = net.createServer();

// an array of client sockets
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");

  const clientId = clients.length + 1;
  clients.map((client)=>{
    client.socket.write(` user id  with this ${clientId} joined`)
  })
  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    // const dataString = data.toString("utf-8");
    // const id = dataString.substring(0, dataString.indexOf("-"));
    // const message = dataString.substring(dataString.indexOf("-message-") + 9);

    clients.map((client) => {
      // client.socket.write(`> User ${id}: ${message}`);
      client.socket.write(data)
    });
  });
  socket.on("error", () => {
    clients.map((client) => {
        client.socket.write(`User ${clientId} left!`);
    });
});

  clients.push({ id: clientId.toString(), socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});


