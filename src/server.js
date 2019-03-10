import express from 'express'
import FileWatcher from './fileWatcher.js'
import tempEmailRenderer from './tempEmailRenderer.js'

const PORT = 8081
const SOCKET_PORT = 3001
const app = express()
const EmailWatcher = new FileWatcher()



const router = express.Router()
//route for main app ^/$ is regular expression for end of string
router.use('^/$', tempEmailRenderer)


router.use(
  express.static('dist', { maxAge: '30d' })
)

//If no route exist reroute to homepage
router.get('*', function(req, res) {
    res.redirect('/');
});

// tell the app to use the above rules
app.use(router)

//Set up socket io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(SOCKET_PORT);

//TODO make sure that the email is properly formatted here and on client side
//this is where filewatcher can be updated of new rooms for clients
io.on('connection', function(socket){
    //this is the default room for sockets
    socket.join('default');
    socket.on('newAddress', (addressData) => {
        //rooms only inlcude the local portiion of email no domain
        socket.join(addressData.newAddress.toLowerCase().split("@")[0]);
        socket.leave(addressData.oldAddress.split("@")[0]);
    })
});

//Link socket to filewatcher event
EmailWatcher.onNewEmail(
    //upon new email use io to emit data to client                   
    (socketServer, mailObject, room) => 
    {socketServer.to(room).emit('email', { email: mailObject } )}
    , io)
router.get('/api/callMongo', (req, res) => {
    //call DB and send data
    MongoDB.getComments('somewhere.com', (result)=>{res.json(result)})
})


MongoDB.createCollection('comments')
MongoDB.insertComment({text: 'This is a comment that has been inserted into the mongoDB. it was the first comment to be inserted.'})
MongoDB.insertComment({text: 'This is another comment. 2nd one inserted'})
MongoDB.insertComment({text: 'This is the 3rd comment. Adding filler to make it longer\n\n\n\n\n\alsdfladksf;akjsdf;lakjsdf;lasdf fadsjladfkjs;asdkfj;asfdas'})


app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
  console.log(__dirname)
})

