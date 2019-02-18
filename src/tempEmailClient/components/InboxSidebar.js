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
import ChangeAddressBox from './ChangeAddressBox.js'

const styles = theme => ({
    fromText: {
        flex:'1 1 auto', 
        padding: '0px', 
        minWidth:'0px'},
    listItem:{
        backgroundColor: 'lightgoldenrodyellow',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderRadius: '0px 0px 15px 15px'
        
    },
    listBorder:{
        borderRadius: '0px 0px 15px 15px',
        borderWidth: '1px 1px 0px 1px',
        borderStyle: 'solid',
        padding: '0px',
    },
    inboxIcon:{
        color:'gold',
        '&:hover': { color: 'DarkGoldenRod'}},
    deleteIcon:{
        color: 'DarkRed',
        '&:hover': { color: 'red'}},
    myAddressBox: {
        backgroundColor: '#00800059',
  },
    donationBox: {
        marginTop: '20px',
        backgroundColor: 'pink',
        borderRadius: '10px 0px 0px 10px'
  },
      emailText:{
        textOverflow: 'clip',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    root:{
        paddingLeft: '10px' 
    }
});

//considering changing this into drop down menu
class InboxSidebar extends React.Component {
	
	render()
	{
	const { classes } = this.props;

    // for every email in prop create inbox icon, from field, and delete icon
    //TODO update the css for the from field
	return (
        <div className={classes.root}>
          
            <ChangeAddressBox
                myAddress={this.props.myAddress}
                updateMyAddress={this.props.updateMyAddress}
            />
		  
            <List className={classes.listBorder}>
                 <ListItem style={{ zIndex: '1',
                                    boxShadow: '0px 2px grey',
                                    backgroundColor: 'palegoldenrod',
                                    borderWidth: '0px 0px 1px 0px', 
                                    borderStyle: 'solid'}}>
                    <ListItemText primary='Inbox'/>
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
            <div className={classes.donationBox}> 
                <ListItem button style={{ textAlign: 'right'}}>
                    <ListItemText 
                        primary={'Donate to TempMail'}
                        secondary={<Link>[donate]</Link>} 
                    />
                </ListItem>  
            </div>
        </div>
      
     
        );
	}
}

function log(thing){console.log(thing)}

InboxSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InboxSidebar)