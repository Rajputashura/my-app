const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Message = require("./models/messageModel");
const {clear} = require("console");
const {User} = require("./models/userModel");
const { json } = require("stream/consumers");

const createWebSocketServer = (server) =>{
    const wss = new ws.WebSocketServer({server});

    wss.on("connection", (connection,req) =>{
        const notifyaboutOnlinePeople = async()=>{
            const onlineUsers = await Promise.all(
                Array.from(wss.clients).map(async(client) => {
                    const {userId,username} = client;
                    const user = await User.findById(userId);
                    const avatarLink = user ? user.avatarLink: null;

                    return {
                        userId,
                        username,
                        avatarLink,
                    };
                })
            );

            [...wss.clients].forEach((client)=>{
                client.send(
                    JSON.stringify({
                     online: onlineUsers,
                    })
                );
            });
        };

        connection.isAlive = true;
        connection.timer = setInterval(()=>{
            connection.ping();
            connection.deathTimer = setTimeout(()=>{
                connection.isAlive  = false;
                clearInterval(connection.timer);
                connection.terminate();
                notifyaboutOnlinePeople();
                console.log("dead");
                
            }, 1000);
        },5000);
        connection.on("pong", ()=>{
            clearTimeout(connection.deathTimer);
        });
        const cookies = req.headers.cookie;

        if(cookies){
            const tokenString   = cookies 
                   .split(";")
                   .find((str) => str.startsWith("authToken ="));
                   if(tokenString){
                    const token = tokenString.split("=")[1];
                    jwt.verify(token,process.env.JWTPRIVATEKEY, {}, (err,userData) =>{
                        if(err) console.log(err);

                        const {_id, firstName, lastName} = userData;
                        connection.userId = _id;
                        connection.username = `${firstName} ${lastName}`;
                        
                    });
                   }
               }
               connection.on("message", async(Message)=>{
                const messageData = JSON.parse(Message.toString());
                const {recipient, text} = messageData;
                const msgDoc = await Message.create({
                    sender : connection.userId,
                    recipient,
                    text,
                });
                if(recipient && text){
                    [...wss.clients].forEach((client)=>{
                        if(client.userId === recipient){
                            client.send(
                                JSON.stringify({
                                    sender : connection.username,
                                    text,
                                    id: msgDoc._id,
                                })
                            );
                        }
                    });
                }
               });
               notifyaboutOnlinePeople();
               console.log("online Users:",onlineUsers);
    });
};
module.exports= createWebSocketServer;