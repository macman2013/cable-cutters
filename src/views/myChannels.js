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
function createData(name, category, uniqueID) {
  counter += 1;
  //console.log(counter)
  return { id: counter, name, category, uniqueID};
}

class MyChannels extends React.Component {
  state = {
    mobileOpen: false,
    open: [],
    checked: [0],
    data: [],
    originaldata: [],
    selected: [],
    filteredChannels: [],
    sortIntoCategories: [{count: 0, categoryName: '', channelsInCategory: [{channelCount: 0, channel: ''}] }],
  };

  handleClick = (event, id) => {
    this.setState({ open: !this.state.open });
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

  isOpen = id => this.state.open.indexOf(id) !== -1;

  componentWillMount() {
    this.getChannels();
  }

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
        selected: [],
        filteredChannels: channelNames
      });

      let findChannels = this.state.originaldata;
      const finalArray = [];
      let count = 0;
      let chanCount = 0;
      var channelsInCategory = [];
      for (const i in chooseCategories) {
        count++;
        let categoryName = chooseCategories[i]
        for (const k in findChannels) {
          let eachChannelCategory = findChannels[k].category;
          if (eachChannelCategory === categoryName) {
            chanCount++;
            channelsInCategory.push({channelCount: chanCount, channel: findChannels[k].name})
          }
        }
        finalArray.push({count, categoryName, channelsInCategory})
        channelsInCategory = [];
      }
      this.setState({sortIntoCategories: finalArray})
      //console.log(finalArray)
      };
    API.getChannels(onSuccess);
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        Currently Selected Channels
        <List>{this.state.selected}</List>
        <Divider />
          {this.state.sortIntoCategories.map(n => (
            <List key={n.count}>
                <ListItem button onClick={event => this.handleClick(event, n.count)}>
                <ListItemText primary={n.categoryName} />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                {n.channelsInCategory.map(m => (
                  <List key={m.channelCount} dense={true} component="div" disablePadding>
                    <ListItem onClick={this.handleToggle(m.channelCount)} button className={classes.nested} disableRipple>
                      <Checkbox checked={this.state.checked.indexOf(m.channelCount) !== -1} tabIndex={-1} disableRipple />
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
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
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