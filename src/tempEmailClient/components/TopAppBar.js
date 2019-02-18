import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
                    <Typography variant="h6" color='textPrimary' noWrap>
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