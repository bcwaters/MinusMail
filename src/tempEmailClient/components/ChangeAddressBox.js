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
        backgroundColor: '#00800059',
        borderRadius: '15px 15px 0px 0px',
        backgroundColor: '#00800059',
        marginBottom: '10px',
        boxShadow: '0 5px 10px -2px grey'
  },    
});


class ChangeAddressBox extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    //write this method to update modal on invalid
    handleInvalidEmail = () => {
        this.setState({ open: true });
    };

    //This state needs to be pull all the way up to Email view
    //This is so that a Notification of update email can be made
    updateMyEmail = (textFieldId) => {
        let newAddress = document.getElementById(textFieldId).value
        if(this.isValidNewEmail(newAddress)){
            this.props.updateMyAddress(newAddress)
            this.handleClose();
        }else{
           this.handInvalidEmail()     
        }
    };

    isValidNewEmail = (newAddress) => {
        //write a method to validate
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
                    primary={'My Email Address:'}
                    secondary={
                    <div>
                        <span>{this.props.myAddress.replace(/@/, " @") + '\n'}</span>
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
              What is the new email you would like?
            </DialogContentText>
            <TextField
              ref='newEmailAddress'
              autoFocus
              margin="dense"
              id="newEmailField"
              label="Email Address"
              type="email"
              fullWidth
              defaultValue='new@MinusMail.com'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => (this.updateMyEmail(this.refs.newEmailAddress.props.id))} color="primary">
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