import express from 'express'
import FileWatcher from './fileWatcher.js'
import tempEmailRenderer from './tempEmailRenderer.js'
import MongoDB from './MongoDB.js'


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

function sendEmails(retrievedEmails, socket, room){
   if(retrievedEmails){
        for(var i = 0; i<retrievedEmails.length; i++){
            console.log('emitting emails to: ' + room)
            socket.to(room).emit('email', {email: retrievedEmails[i]});
        }
    }
}


//TODO make sure that the email is properly formatted here and on client side
//this is where filewatcher can be updated of new rooms for clients
io.on('connection', function(socket){
    //this is the default room for sockets
    socket.join('default');
    MongoDB.getEmails('default', sendEmails, socket)
   
    
    //TODO fix bug for some reason MONGODB.getemails isn't emitting
    //to client socket from the callback method if it is called from
    //within this block of code but it works fine above during initiliztion
    let newAddressSocket = socket
    socket.on('newAddress', (addressData) => {
        //rooms only inlcude the local portiion of email no domain
        let updatedAddress = addressData.newAddress.toLowerCase().split("@")[0]
        socket.join(updatedAddress);
        socket.leave(addressData.oldAddress.split("@")[0]);
        MongoDB.getEmails(updatedAddress, sendEmails, newAddressSocket)
    })
});



//Link socket to filewatcher event
EmailWatcher.onNewEmail(
    //upon new email use io to emit data to client                   
    (socketServer, mailObject, room) => 
    {socketServer.to(room).emit('email', { email: mailObject } )}
    , io
    , (mailObject) => (MongoDB.insertEmail(mailObject))
)


//MongoDB.dropCollection('emails');
//MongoDB.createCollection('emails')
//MongoDB.getEmails('default');

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
  console.log(__dirname)
})

