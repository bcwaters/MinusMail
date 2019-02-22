import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const drawerWidth = 270;
const drawerMaxWidth = '40%';
const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    whiteSpace:'pre',
    flexGrow: 1,
    marginLeft: 0,
  },
   
    emailPaper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
         boxShadow: '1px -4px 10px 0px #afaf94',
        minHeight: '50vh',
        maxWidth: '100%',
        overflow: 'auto',
        zIndex: '1',
    },
    htmlContent: {
        maxHeight: '100%',
        overflow: 'auto'
    },
    fromField: {
        zIndex: '1',
        backgroundColor: 'palegoldenrod',
        borderRadius: '15px 15px 0px 0px',
        marginBottom: '3px',
        boxShadow: 'inset -2px 0px 10px 3px #c5bd5d',
        ...theme.mixins.gutters(),
    },
});

class EmailBody extends React.Component {

	render()
	{
	const { classes } = this.props;

	return (
        <main className={classes.content}>
            <div className={classes.emailContainer}>
                <div className={classes.fromField} >
                    <Typography noWrap={true} variant='subtitle1'>
                        {this.props.currentEmail.from.text} 
                    </Typography>
                    <Typography noWrap={true} variant='subtitle2'>
                        {this.props.currentEmail.subject} 
                    </Typography>
                </div>
                <Paper className={classes.emailPaper}>
                    {this.props.currentEmail.html ?
                        <iframe 
                            srcdoc={this.props.currentEmail.html}
                            style= {{
                                    margin: '0px',
                                    flexGrow: '1',
                                    width:'100%',
                                    minHeight:'60vh'}}
                        />
                    :
                        <Typography paragraph>
                        {this.props.currentEmail.text} 
                        </Typography>
                         }
                         
                        
                   
                </Paper>
            </div>
        </main>

 );
	}
}

EmailBody.propTypes = { 
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmailBody)