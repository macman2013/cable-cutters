import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TVIcon from 'material-ui-icons/Tv';
import Home from './views/Home';
import AllServices from './views/allServices';
import About from './views/About';
import MyChannels from './views/myChannels';
import MyShows from './views/myShows';
import AdminScreen from './views/admin/adminScreen'
import AddStreamingService from './views/admin/addStreamingService';
import AddChannel from './views/admin/addChannel';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  appTitle: {
    marginLeft: 6,
    marginRight: 28,
  },
};

class SiteNavMenu extends Component {
  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <TVIcon />
            <Typography variant="title" color="inherit" className={classes.appTitle}>
              Cable Cutters
            </Typography>
            <Button color="inherit" component={Link} to="/compare" className={classes.flex}>Compare All Services</Button>
            <Button color="inherit" component={Link} to="/channels" className={classes.flex}>Help Me Choose By Channel</Button>
            <Button color="inherit" component={Link} to="/shows" className={classes.flex}>Help Me Choose By Show</Button>
            <Button color="inherit" component={Link} to="/about" className={classes.flex}>About this App</Button>
          </Toolbar>
      </AppBar>

          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/compare" component={AllServices}/>
          <Route exact={true} path="/channels" component={MyChannels}/>
          <Route exact={true} path="/shows" component={MyShows}/>
          <Route exact={true} path="/about" component={About}/>
          <Route exact={true} path="/admin" component={AdminScreen}/>
          <Route exact={true} path="/admin/add" component={AddStreamingService}/>
          <Route path="/admin/addChannel" component={AddChannel}/>
          <Route path="/admin/:id/edit" component={AddChannel}/>
        </div>
      );
    }
  }

  SiteNavMenu.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SiteNavMenu);