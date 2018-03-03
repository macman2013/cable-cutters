import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
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
    open: false,
    data: [],
    originaldata: [],
    selected: [],
    filteredChannels: [],
    sortIntoCategories: [{count: 0, categoryName: '', channelsInCategory: [] }],
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  componentDidMount() {
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
      var channelNameArray = [];
      for (const i in chooseCategories) {
        count++;
        let eachCategory = chooseCategories[i]
        for (const k in findChannels) {
          let eachChannelCategory = findChannels[k].category;
          if (eachChannelCategory === eachCategory) {
            channelNameArray.push(findChannels[k].name)
          }
        }
        finalArray.push({count, eachCategory, channelNameArray})
        channelNameArray = [];
      }
      this.setState({sortIntoCategories: finalArray})
      console.log(finalArray)
      };
    API.getChannels(onSuccess);
  }

  // sortChannelsIntoCategories() {
  //   let channels = this.state.originaldata;
  //   console.log(channels)
  //   const finalArray = [];
  //   const channelNameArray = [];
  //   for (const i in chooseCategories) {
  //     let eachCategory = chooseCategories[i]
  //     for (const k in channels) {
  //       let eachChannelCategory = channels[k].category;
  //       console.log("Test " +eachChannelCategory)
  //       if (eachChannelCategory === eachCategory) {
  //         channelNameArray.push(channels[k].name)
  //       }
  //     }
  //     finalArray.push({eachCategory, channelNameArray})
  //     console.log(finalArray)
  //   }
  //   this.setState({sortIntoCategories: finalArray})
  // }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        Selected Channels
        <List>{this.state.selected}</List>
        <Divider />
          {this.state.sortIntoCategories.map(n => (
            <List key={n.count}>
                <ListItem button onClick={this.handleClick}>
                <ListItemText primary={n.eachCategory} />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary={n.channelNameArray} />
                  </ListItem>
                </List>
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
              Select channels using the list on the left. 
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