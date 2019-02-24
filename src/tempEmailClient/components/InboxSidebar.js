import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import loaderIcon from '../res/loader.gif';

const styles = theme => ({
    fromText: {
        flex:'1 1 auto', 
        padding: '0px', 
        minWidth:'0px'},
    listItem:{
        backgroundColor: '#ffffff',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderRadius: '0px 0px 15px 15px',      
    },
    listBorder:{
        padding: '0px',
    },
    inboxIcon:{
        color:'gold',
        '&:hover': { color: 'DarkGoldenRod'}},
    deleteIcon:{
        color: 'DarkRed',
        '&:hover': { color: 'red'}},
      emailText:{
        textOverflow: 'clip',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    root:{
        paddingLeft: '10px' 
    },
    loadingText:{
        display: 'block',
        float: 'right',
        fontFamily:'"Courier", "Arial", "Century Schoolbook L"',
        paddingLeft:'5px',
        paddingTop: '5px',
        fontWeight: 'bold'
    },
    loadingIcon:{
        display: "block",
        float: 'left',
        marginBottom: '5px',
    }
    
});

/*  Maybe user doesnt need to have the spinner explained
<span   style={{display:this.state.displayLoader}}
                            className={classes.loadingText}>
                            checking mail
                    </span>

*/
//considering changing this into drop down menu
class InboxSidebar extends React.Component {

    state={displayLoader: 'block'}
    
    componentDidMount(){
     setInterval(() => {
                if(this.state.displayLoader=='none'){
                    this.setState({displayLoader: 'block'}) 
                }else{
                    this.setState({displayLoader: 'none'})
                }
            },
            9 * 1000
        );
         setInterval(() => {
                if(this.state.displayLoader=='block'){
                    this.setState({displayLoader: 'none'}) 
                }
            },
            2 * 1000
        
        );
    }

	render()
	{
	const { classes } = this.props;

    // for every email in prop create inbox icon, from field, and delete icon
    //TODO update the css for the from field
	return (
        <div className={classes.root}>
            <List className={classes.listBorder}>
                 
            <ListItem style={{ paddingBottom: '0px',
                                    zIndex: '1',
                               
                                   
                                    backgroundColor: '#cccccc',
                                    borderWidth: '0px 0px 1px 0px', 
                                    minHeight: '40px',
                                    borderStyle: 'solid'}}>
                    
                <div>   
                    <img style=
        {{display:this.state.displayLoader, float: 'left', marginBottom:'5px'}} 
                        src={loaderIcon} alt='minus mail'/> 
                    
                </div>
            </ListItem>
        
            {  this.props.emailsReceived.length ==0 ?  
                <ListItem className={classes.listItem}><ListItemText primary='inbox empty'/></ListItem>
              : 
                this.props.emailsReceived.map((mailObject, index) => (
                
                <ListItem button key={index} 
                    className={classes.listItem}
                    onClick={()=>this.props.setEmailToView(mailObject)}>
                 <CssBaseline />
                <ListItemText
                    style={{flex:'1 1 auto', padding: '0px', minWidth:'0px', 
                            textOverflow: 'clip',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                            }}
                    primary={mailObject.from.value[0].name}
                    secondary={ mailObject.from.value[0].address} />
                
                <ListItemSecondaryAction>
                <ListItemIcon button key={index} 
                    style={{display: 'inline-flex',
                            flexShrink: '0',
                            marginLeft: '16px',
                            marginRight: '0px'
                            }}
                    onClick={()=>this.props.deleteEmail(index)}>
                     <DeleteIcon className={classes.deleteIcon} /> 
                </ListItemIcon>
                </ListItemSecondaryAction>
                               
                </ListItem>
            ))}
            </List> 
          
        </div>
      
     
        );
	}
}

function log(thing){console.log(thing)}

InboxSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InboxSidebar)