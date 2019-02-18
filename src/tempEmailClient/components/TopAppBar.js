import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import customSVG from './helpers/CustomSVG.js'

const MinusMailIcon = (props) => (
  <SvgIcon {...props}>
    <path d= {customSVG.MinusMailIcon} />
  </SvgIcon>
);


//zIndex put appbar priority above drawer 
const styles = theme => ({
    root: {
           flexGrow: '1',
        
    }
});


class TopAppBar extends React.Component {

	render()
	{
	const { classes } = this.props;

	return (
            <AppBar position='absolute' style={{ backgroundColor: '#5555'}}>
                <Toolbar> 
                    <MinusMailIcon />
                    
                    <Typography style={{ marginLeft: 16 }} variant="h6" color='textPrimary' noWrap>
                        MinusMail
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