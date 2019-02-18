import chokidar from 'chokidar'
import fs from 'fs'
const simpleParser = require("mailparser").simpleParser;

class EmailWatcher{
    
    constructor(){
    this.directory = '/tmp/emails/'
    this.watcher = chokidar.watch(this.directory,
                    {ignoreInitial:true,
                     ignored: /[\/\\]\./,
                     awaitWriteFinish:true })

  }
    //server.js provides socket behavior to this method
    onNewEmail(emitEmailEvent, SocketServer){
        //Linking socket to server file directory
        this.watcher.on('all', (event, path) => {
            //for windows change event is called when new file is written
            if(event == 'change'){
                fs.readFile(path,{encoding: 'utf-8'}, 
                    function(err,data){
                    if (!err) { //parse raw email into mailobject.
                                simpleParser(data)
                                .then(mailObject => {
                                //emit mail object with socket server
                                emitEmailEvent(SocketServer, mailObject);  
                            })
                                .catch(
                                err => {console.log('couldnt parse sneding raw data')
                                emitEmailEvent(SocketServer, {text :data});});
                        
                    }else{
                    console.log(err);
                    }
                });
            }
        });
    }  
}

export default EmailWatcher