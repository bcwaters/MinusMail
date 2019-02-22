import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import customSVG from './helpers/CustomSVG.js'

const GitIcon = (props) => (
  <SvgIcon {...props}>
    <path d= {customSVG.GithubIcon} />
  </SvgIcon>
);

//TODO find a real fix for this footer width....
const styles = {
  root: {
    marginLeft: '-5%',
    width:'107.1%',
    backgroundColor: '#aaaaaa'
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div style={{padding: 0}}>
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction 
			href="http://www.github.com/bcwaters/MinusMail" target="_blank"
			label="MinusMail Repo" 
			icon={<GitIcon />} />
      </BottomNavigation>
        </div>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);