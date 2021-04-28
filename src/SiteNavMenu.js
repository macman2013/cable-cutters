import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TVIcon from '@material-ui/icons/Tv';
import Home from './views/Home';
import AllServices from './views/allServices';
import About from './views/About';
import MyChannels from './views/myChannels';
import MyShows from './views/myShows';
import AdminScreen from './views/admin/adminScreen'
import AddStreamingService from './views/admin/addStreamingService';
import AddChannel from './views/admin/addChannel';
import AddAddOn from './views/admin/addAddOn';

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  appTitle: {
    marginLeft: 6,
    marginRight: 28,
    textDecoration: 'none'
  },
}));

export default function SiteNavMenu() {
  const classes = styles();
    return (
        <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <TVIcon />
            <Typography variant="title" color="inherit" component={Link} to="/" className={classes.appTitle}>
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
          <Route exact={true} path='/admin' component={AdminScreen}/>
          <Route exact={true} path="/admin/add" component={AddStreamingService}/>
          <Route path="/admin/addChannel" component={AddChannel}/>
          <Route path="/admin/createAddon" component={AddAddOn}/>
          <Route path="/admin/:id/editService" component={AddStreamingService}/>
          <Route path="/admin/:id/editChannel" component={AddChannel}/>
          <Route path="/admin/:id/editAddon" component={AddAddOn}/>
        </div>
      );
  }

  SiteNavMenu.propTypes = {
    classes: PropTypes.object.isRequired,
  };