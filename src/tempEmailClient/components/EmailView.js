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
import BottomAppBar from './BottomAppBar.js'
import ChangeAddressBox from './ChangeAddressBox.js'
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Notifier = new NotifierSystem() 
const styles = theme => ({
    root: {
        display: 'flex',
        backgroundColor: '#e9ebee',
        paddingRight: '30px',
        paddingLeft: '30px',
        
    },
    gridContainer: {
        flexGrow: 1 ,
        height: '100vh',
    },
    mainContent: {
        minHeight: '70vh'
    },
    fillAppBarSpace: {
        ...theme.mixins.toolbar,
        backgroundColor: 'transparent'
        },
    underAppBar: {
        height: '20vh',
    },
    sideBar: {
        minWidth: '200px'
      },
    footerSpace: {
        minHeight:'11vh',
        width:'100%',
        bottom: '0',
        left: '0',
        padding: 0,
	   top: 'auto',
     },
    adSpace: {
      },
     donationBox: {
        marginTop: '20px',
        backgroundColor: 'pink',
        borderRadius: '30px 30px 30px 30px',
        whiteSpace: 'nowrap',
        textAlign: 'right',
        boxShadow: '0 5px 10px -2px grey',
       
  },
});


class EmailViewer extends React.Component {
    
    state = {
        emailsReceived: [],  //array of mailobjects
        currentEmail: Notifier.getNotice('welcomeNotice'),//current mailObject
        myAddress: 'default@MinusMail.com'  //users current email address
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

  updateMyAddress(updateData){
      //emit new address over socket
      this.props.setMyAddress(updateData)
      //update state
      this.setState({   currentEmail: Notifier.updateAddressNotice(updateData.newAddress),
                        myAddress: updateData.newAddress})
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
        <TopAppBar myAddress={this.state.myAddress} 
                    updateMyAddress={this.updateMyAddress}
        />
        <CssBaseline />
      
        <Grid container className={classes.gridContainer} spacing={24}>
            <Grid item xs={12} className={classes.underAppBar}/>
            <Grid item xs={2} className={classes.sideBar}>
            <InboxSidebar
                container={this.containerRef}
                emailsReceived={this.state.emailsReceived} 
                setEmailToView={this.updateCurrentEmail} 
                deleteEmail={this.deleteEmail}
                myAddress={this.state.myAddress}
                updateMyAddress={this.updateMyAddress}
            /> 
            </Grid>
            <Grid item xs={8}>
            <EmailBody
                currentEmail={this.state.currentEmail}
            />
            </Grid>
            <Grid item xs={2} className={classes.adSpace}> 
            <div style={{height: '40vh'}}></div>
            
            <div className={classes.donationBox} > 
                <ListItem button style={{whiteSpace: 'nowrap',textAlign: 'right'}}>
                    <ListItemText 
                        primary={'Donate to MinusMail'}
                        secondary={<Link>[donate]</Link>} 
                    />
                </ListItem>  
            </div>
            </Grid>
            <Grid item xs={12} className={classes.footerSpace}>
              <BottomAppBar/>
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