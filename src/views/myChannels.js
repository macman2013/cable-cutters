import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import API from './admin/API'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import MyChannelCard from './MyChannelComponents/MyChannelCard';

const drawerWidth = 240;

const styles = makeStyles(theme => ({
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
}));

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

export default function MyChannels() {
  const classes = styles()
  const [open, setOpen] = React.useState([{ catId: 0, isOpen: false }])
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [checked, setChecked] = React.useState([])
  const [data, setData] = React.useState([])
  const [originaldata, setOriginaldata] = React.useState([])
  const [serviceData, setServiceData] = React.useState([])
  const [addOnData, setAddOnData] = React.useState([])
  const [filteredChannels, setFilteredChannels] = React.useState([])
  const [sortIntoCategories, setCategories] = React.useState([{count: 0, categoryName: '', channelsInCategory: [{channelCount: 0, channel: ''}] }])
  const [selectedData, setSelectedData] = React.useState([])

  const handleClick = (event, id) => {
    let array = [...open];
    let findValue = array[id];
    //console.log((findValue))
    for (const i in array) {
      if (array[i] === findValue) {
        array[i].isOpen = !(array[i].isOpen)
        setOpen(array)
      }
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked)
  };

  const getChannels = () => {
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
      setData(channelArray)
      setOriginaldata(channelArray)
      setFilteredChannels(channelNames)

      let findChannels = [...channelArray];
      const finalArray = [];
      const openArray = [];
      let count = 0;
      let chanCount = 0;
      var channelsInCategory = [];
      for (const i in chooseCategories) {
        let categoryName = chooseCategories[i]
        openArray.push({catId: count, isOpen: false})
        setOpen(openArray)
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
      setCategories(finalArray)
      //console.log(finalArray)
      };
    API.getChannels(onSuccess);
  }

  const getServices = () => {
    const onSuccess = (services) => {
      let newService;
      let addThisService;
      const serviceArray = [];
      for (const i in services) {
        newService = services[i];
        addThisService = createService(newService.name, newService.description, newService.price, newService.image_url, newService.website, newService.base_channels, newService.channel_packages, newService.dvr, newService.numberOfDevices, newService['_id']);
        serviceArray.push(addThisService);
      }
      setServiceData(serviceArray)
    };
    API.getServices(onSuccess);
  }

  const getAddons = () => {
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
      setAddOnData(addonArray)
    };
    API.getAddons(onSuccess);
  }

  React.useEffect(() => {
    getChannels()
    getAddons()
    getServices()
  }, [])

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {checked.length > 0 ? <Typography>Currently Selected Channels</Typography> : null}
        <List>
          {checked.map (eachChecked => ( 
            <ListItem key={eachChecked} dense={true} onClick={handleToggle(eachChecked)} button className={classes.selectedStyle} disableRipple>
              <Checkbox checked={checked.indexOf(eachChecked) !== -1} tabIndex={-1} disableRipple />
              <ListItemText inset primary={eachChecked} />
            </ListItem>
          ))}
        </List>
        <Divider />
          {sortIntoCategories.map(n => (
            <List key={n.count}>
                <ListItem button onClick={event => handleClick(event, n.count)}>
                <ListItemText primary={n.categoryName} />
                {open[n.count].isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              <Collapse in={open[n.count].isOpen} timeout="auto" unmountOnExit>
                {n.channelsInCategory.map(m => (
                  <List key={m.channelCount} dense={true} component="div" disablePadding>
                    <ListItem onClick={handleToggle(m.channel)} button className={classes.nested} disableRipple>
                      <Checkbox checked={checked.indexOf(m.channel) !== -1} tabIndex={-1} disableRipple />
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
              onClick={handleDrawerToggle}
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
            anchor={'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
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
          {serviceData.map(card => (
            <GridListTile key={card.id}>
              <MyChannelCard serviceTitle={card.name}
              servicePrice={card.price}
              serviceWebsite={card.website}
              serviceChannels={card.channels}
              serviceSelections={checked}
              serviceDVR={card.dvr}
              serviceDeviceNum={card.devices}
              /* serviceSelectData={selectedData} */
              />
            </GridListTile>
          ))}
        </GridList>
        </main>
      </div>
    );
  }
