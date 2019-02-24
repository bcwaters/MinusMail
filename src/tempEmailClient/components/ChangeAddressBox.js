import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';


const styles = theme => ({
    myAddressBox: {
        backgroundColor: 'transparent',
        boxShadow: '1px 1px 30px -4px grey',
  },    
});


class ChangeAddressBox extends React.Component {
    state = {
        askUserForEmail: "What is the new email you would like?",
        suggestedEmail: 'new@minusmail.com',
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false,
                       askUserForEmail: "What is the new email you would like?"});
    };

    //write this method to update modal on invalid
    //should write a random name generator for suggested emails
    handleInvalidEmail = () => {
        this.setState({ open: true, 
                      askUserForEmail: "Invalid email. A valid email looks like this: youraddress@minusmail.com",
                      suggestedEmail: 'changethispart@minusmail.com'});
    };

    //This state needs to be pull all the way up to Email view
    //This is so that a Notification of update email can be made
    updateMyEmail = (textFieldId, oldAddress) => {
        let newAddress = document.getElementById(textFieldId).value
        if(this.isValidNewEmail(newAddress)){
            this.props.updateMyAddress({newAddress: newAddress, oldAddress:oldAddress})
            this.handleClose();
        }else{
           this.handleInvalidEmail()     
        }
    };

    isValidNewEmail = (newAddress) => {
        let name_and_domain = newAddress.split("@");
        if(name_and_domain.length != 2){
            return false;
        }else if(name_and_domain[1].toLowerCase() != 'minusmail.com'){
            return false;
        }
        //TODO I probably want to check for illegal characters in name
        return true
    }
    
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.myAddressBox}> 
            <ListItem button 
                    onClick={this.handleClickOpen}
                    style={{ textAlign: 'right', wordWrap: 'break-word', fontWeight: 'bold'}}
            >      
                 <ListItemText
                    secondary={
                    <div>
                        <span>{this.props.myAddress +' '}</span>
                        <Link>[change]</Link>
                    </div>
                    }
                />
                
            </ListItem>
                
        </div>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change Email</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.askUserForEmail}
            </DialogContentText>
            <TextField
              ref='newEmailAddress'
              autoFocus
              margin="dense"
              id="newEmailField"
              label="Email Address"
              type="email"
              fullWidth
              placeholder={this.state.suggestedEmail}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => (this.updateMyEmail(this.refs.newEmailAddress.props.id, this.props.myAddress))} color="primary">
              Change
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ChangeAddressBox.propTypes = { 
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangeAddressBox)