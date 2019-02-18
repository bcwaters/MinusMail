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


io.on('connection', function(socket){
    socket.on('newAddress', (addressData) => {console.log('new email:' + addressData)})
});

//Link socket to filewatcher event
EmailWatcher.onNewEmail(
    //upon new email use io to emit data to client                   
    (socketServer, mailObject) => 
    {socketServer.emit('email', { email: mailObject } )}, io)


app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
  console.log(__dirname)
})

