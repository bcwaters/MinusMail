import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InboxSidebar from './InboxSidebar.js'
import TopAppBar from './TopAppBar.js'
import EmailBody from './EmailBody.js'
import NotifierSystem from './helpers/notices.js'

const Notifier = new NotifierSystem() 
const styles = theme => ({
    root: {
        display: 'flex',
        backgroundColor: '#e9ebee',
    },
    gridContainer: {
        flexGrow: 1 ,
        height: '95vh',
    },
    fillAppBarSpace: {
        ...theme.mixins.toolbar,
        backgroundColor: 'transparent'
        },
    underAppBar: {
        height: '3vh',
    },
    footerSpace: {
        minHeight:'11vh',
        borderWidth: '1px',
        borderStyle: 'solid'},
    adSpace: {
        borderWidth: '1px',
        borderStyle: 'solid'},
});


class EmailViewer extends React.Component {
    
    state = {
        emailsReceived: [],  //array of mailobjects
        currentEmail: Notifier.getNotice('welcomeNotice'),//current mailObject
        myAddress: 'test@MinusMail.com'  //users current email address
  };

  constructor(props, context) {
        super(props, context)
        
        this.ContainerRef = React.createRef();
        this.onEmailReceived = this.onEmailReceived.bind(this)
        this.updateCurrentEmail = this.updateCurrentEmail.bind(this)
        this.updateMyAddress = this.updateMyAddress.bind(this)
        this.deleteEmail = this.deleteEmail.bind(this)
    
  }

  componentDidMount() {
      //this directs the socket data to a component function
      this.props.registerHandler(this.onEmailReceived)
      //add timer that sends a notice email to user after 3 seconds
      setTimeout(() => {
            this.addEmailToView(Notifier.getNotice('defaultNotice'))
            },
                4 * 1000
        );
       setTimeout(() => {
            this.addEmailToView(Notifier.getNotice('supportNotice'))
            },
                15 * 1000
        );
    }

  //triggered when socket notifies of a new email
  onEmailReceived(socketData){    
      this.addEmailToView( socketData.email)
    }

  updateCurrentEmail(currentEmail){
      this.setState({currentEmail: currentEmail})
  }

  updateMyAddress(newAddress){
      //emit new address over socket
      this.props.setMyAddress(newAddress)
      //update state
      this.setState({   currentEmail: Notifier.updateAddressNotice(newAddress),
                        myAddress: newAddress})
  }

  deleteEmail(index){
      this.setState({currentEmail: Notifier.getNotice('deleteNotice'),
                     emailsRecieved: this.state.emailsReceived.splice(index,1)})
  }

  addEmailToView(mailObject){
      this.setState({
            emailsReceived: [...this.state.emailsReceived, mailObject]
        })
  }

  render() {
    const { classes, theme } = this.props;
  
    return (
      <div className={classes.root}>
        <TopAppBar />
        <CssBaseline />
        <Grid container className={classes.gridContainer} spacing={16}>
        <Grid item xs={12} className={classes.fillAppBarSpace}/>
        <Grid item xs={12} className={classes.underAppBar}/>
            <Grid item xs={2}>
            <InboxSidebar
                container={this.containerRef}
                emailsReceived={this.state.emailsReceived} 
                setEmailToView={this.updateCurrentEmail} 
                deleteEmail={this.deleteEmail}
                myAddress={this.state.myAddress}
                updateMyAddress={this.updateMyAddress}
            /> 
            </Grid>
            <Grid item xs={7}>
            <EmailBody
                currentEmail={this.state.currentEmail}
            />
            </Grid>
            <Grid item xs={3} className={classes.adSpace}>
                ads go in this area
            </Grid>
            <Grid item xs={12} className={classes.footerSpace}>
            footer stuff goes here
            </Grid>    
        </Grid>
      </div>
    );
  }
}

EmailViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EmailViewer);