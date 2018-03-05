import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import Checkbox from 'material-ui/Checkbox'
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import API from './admin/API'
import ServiceCard from './serviceComponents/ServiceCard'
import GridList, { GridListTile } from 'material-ui/GridList';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 750,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    paddingTop: 0,
    paddingBottom: 0,
  },
  selectedStyle: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

const chooseCategories = [
  'Local Broadcast',
  'Entertainment & Lifestyle',
  'Family & Kids',
  'Movies',
  'News',
  'Sports',
  'Premium',
  'Spanish & International'
]

let counter = 0;
let serviceCounter = 0;
let addonCounter = 0;
function createData(name, category, uniqueID) {
  counter += 1;
  //console.log(counter)
  return { id: counter, name, category, uniqueID};
}

function createService(name, description, price, image, website, channels, packages, dvr, devices, uniqueID) {
  serviceCounter += 1;
  return { id: serviceCounter, name, description, price, image, website, channels, packages, dvr, devices, uniqueID };
}

function createAddon(name, description, service, price, channels, dvr, num, uniqueID) {
  addonCounter += 1;
  return { id: addonCounter, name, description, service, price, channels, dvr, num, uniqueID};
}

class MyChannels extends React.Component {
  state = {
    mobileOpen: false,
    open: [{ catId: 0, isOpen: false }],
    checked: [],
    data: [],
    originaldata: [],
    serviceData: [],
    addonData: [],
    filteredChannels: [],
    sortIntoCategories: [{count: 0, categoryName: '', channelsInCategory: [{channelCount: 0, channel: ''}] }],
  };

  handleClick = (event, id) => {
    const { open } = this.state;
    let array = open;
    let findValue = this.state.open[id];
    //console.log((findValue))
    for (const i in array) {
      if (array[i] === findValue) {
        array[i].isOpen = !(array[i].isOpen)
        this.setState({open: array})
      }
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  getChannels() {
    const onSuccess = (channels) => {
      let newChannel;
      let addThisChannel;
      let addChannelName;
      const channelArray = [];
      const channelNames = [];
      for (const i in channels) {
        newChannel = channels[i];
        addThisChannel = createData(newChannel.name, newChannel.category, newChannel['_id']);
        addChannelName = (newChannel.name).toLowerCase();
        channelArray.push(addThisChannel);
        channelNames.push(addChannelName);
      }
      this.setState({
        data: channelArray,
        originaldata: channelArray,
        filteredChannels: channelNames
      });

      let findChannels = this.state.originaldata;
      const finalArray = [];
      const openArray = [];
      let count = 0;
      let chanCount = 0;
      var channelsInCategory = [];
      for (const i in chooseCategories) {
        let categoryName = chooseCategories[i]
        openArray.push({catId: count, isOpen: false})
        this.setState({open: openArray})
        //console.log(openArray)
        for (const k in findChannels) {
          let eachChannelCategory = findChannels[k].category;
          if (eachChannelCategory === categoryName) {
            chanCount++;
            channelsInCategory.push({channelCount: chanCount, channel: findChannels[k].name})
          }
        }
        finalArray.push({count, categoryName, channelsInCategory})
        channelsInCategory = [];
        count++;
      }
      this.setState({sortIntoCategories: finalArray})
      //console.log(finalArray)
      };
    API.getChannels(onSuccess);
  }

  getServices() {
    const onSuccess = (services) => {
      let newService;
      let addThisService;
      const serviceArray = [];
      for (const i in services) {
        newService = services[i];
        addThisService = createService(newService.name, newService.description, newService.price, newService.image_url, newService.website, newService.base_channels, newService.channel_packages, newService.dvr, newService.numberOfDevices, newService['_id']);
        serviceArray.push(addThisService);
      }
      this.setState({
        serviceData: serviceArray,
      });
    };
    API.getServices(onSuccess);
  }

  getAddons() {
    const onSuccess = (channels) => {
      let newAddon;
      let addThisAddon;
      let addAddonName;
      const addonArray = [];
      const addonNames = [];
      for (const i in channels) {
        newAddon = channels[i];
        addThisAddon = createAddon(newAddon.addonName, newAddon.description, newAddon.forService, newAddon.price, newAddon.channels, newAddon.dvr, newAddon.devicesNum, newAddon['_id']);
        addAddonName = (newAddon.addonName).toLowerCase();
        addonArray.push(addThisAddon);
        addonNames.push(addAddonName);
      }
      this.setState({
        addonData: addonArray,
      });
    };
    API.getAddons(onSuccess);
  }

  componentWillMount() {
    this.getChannels();
    this.getServices();
    this.getAddons();
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {this.state.checked.length > 0 ? <Typography>Currently Selected Channels</Typography> : null}
        <List>
          {this.state.checked.map (eachChecked => ( 
            <ListItem key={eachChecked} dense={true} onClick={this.handleToggle(eachChecked)} button className={classes.selectedStyle} disableRipple>
              <Checkbox checked={this.state.checked.indexOf(eachChecked) !== -1} tabIndex={-1} disableRipple />
              <ListItemText inset primary={eachChecked} />
            </ListItem>
          ))}
        </List>
        <Divider />
          {this.state.sortIntoCategories.map(n => (
            <List key={n.count}>
                <ListItem button onClick={event => this.handleClick(event, n.count)}>
                <ListItemText primary={n.categoryName} />
                {this.state.open[n.count].isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              <Collapse in={this.state.open[n.count].isOpen} timeout="auto" unmountOnExit>
                {n.channelsInCategory.map(m => (
                  <List key={m.channelCount} dense={true} component="div" disablePadding>
                    <ListItem onClick={this.handleToggle(m.channel)} button className={classes.nested} disableRipple>
                      <Checkbox checked={this.state.checked.indexOf(m.channel) !== -1} tabIndex={-1} disableRipple />
                      <ListItemText inset primary={m.channel} />
                    </ListItem>
                  </List>
              ))}
              </Collapse>
            </List>
           ))}
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Select channels using the list. 
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography gutterBottom>{'Based on your channel selections, consider the following streaming services.'}</Typography>
          <GridList className={classes.gridList} cellHeight={'auto'} cols={3}>
          {this.state.serviceData.map(card => (
            <GridListTile key={card.id}>

            </GridListTile>
          ))}
        </GridList>
        </main>
      </div>
    );
  }
}

MyChannels.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MyChannels);