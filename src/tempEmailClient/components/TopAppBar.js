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
  <SvgIcon {...props} titleAccess='minus mail'>
    <path d= {customSVG.MinusMailIcon} />
  </SvgIcon>
);

//zIndex put appbar priority above drawer 
const styles = theme => ({
    root: {
           flexGrow: '1',
    },
    minusmail: {
        overflow: 'visible'
    }


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
                    
                    <Typography style={{ marginLeft: 10, overflow:'visible'}} 
                                variant="h6" color='textPrimary'>
                        MinusMail
                    </Typography>
                    <Typography style={{ width: '28%' }} variant="h6" color='textPrimary' noWrap>
                    </Typography>
          <ChangeAddressBox
                myAddress={this.props.myAddress}
                updateMyAddress={this.props.updateMyAddress}
            />
                   
                </Toolbar>
            </AppBar>
        );
	}
}

TopAppBar.propTypes = { 
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopAppBar)