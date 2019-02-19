import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import customSVG from './helpers/CustomSVG.js'
import MailIcon from '@material-ui/icons/Mail';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ChangeAddressBox from './ChangeAddressBox.js'

const MinusMailIcon = (props) => (
  <SvgIcon {...props}>
    <path d= {customSVG.MinusMailIcon} />
  </SvgIcon>
);
/*
 Rendering this icon to tool bar, removed for current production release

 <div className={classes.search}>
                        <InputBase
                            ref='addressBox'
                            onClick={()=>{this.setState({emailIsSet: !this.state.emailIsSet})}}
                            defaultValue="test"
                            disabled={this.state.emailIsSet}
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                         /> 
                    </div>




*/

//zIndex put appbar priority above drawer 
const styles = theme => ({
    root: {
           flexGrow: '1',
        
    },
    search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: '0px',
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
    inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    textAlign: 'right',
    paddingTop: theme.spacing.unit,
    paddingRight: '1px',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit ,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});


class TopAppBar extends React.Component {

    state = {emailIsSet: true}
	render()
	{
	const { classes } = this.props;

	return (
            <AppBar position='absolute' style={{ backgroundColor: '#aaaaaa'}}>
                <Toolbar> 
                    <MinusMailIcon />
                    
                    <Typography style={{ marginLeft: 16}} variant="h6" color='textPrimary' noWrap>
                        MinusMail
                    </Typography>
                    <Typography style={{ width: '15%' }} variant="h6" color='textPrimary' noWrap>
                    </Typography>
                   
                </Toolbar>
            </AppBar>
        );
	}
}

TopAppBar.propTypes = { 
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopAppBar)