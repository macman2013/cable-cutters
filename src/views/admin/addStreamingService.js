import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import green from 'material-ui/colors/green';
import API from './API';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  formControl: {
    marginLeft: theme.spacing.unit + 20,
    marginRight: theme.spacing.unit + 20,
    marginBottom: theme.spacing.unit + 20,
    minWidth: 120,
    maxWidth: 300,
  },
  textField: {
    marginLeft: theme.spacing.unit + 20,
    marginRight: theme.spacing.unit + 20,
    minWidth: 500,
  },
  switch: {
    marginLeft: theme.spacing.unit + 20,
    marginRight: theme.spacing.unit + 20,
  },
  bar: {},
  checked: {
    color: green[500],
    '& + $bar': {
      backgroundColor: green[500],
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddStreamingService extends React.Component {
  state = {
    open: true,
    name: '',
    description: '',
    price: '',
    image_url: '',
    website: '',
    base_channels: [],
    channel_packages: [],
    dvr: false,
    numberOfDevices: '',
    allChannels: [],
    allPackages: [],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ base_channels: event.target.value });
  };

  handleServiceName = event => {
    this.setState({ name: event.target.value });
  };

  handleServiceDesc = event => {
    this.setState({ description: event.target.value });
  };

  handleServicePrice = event => {
    this.setState({ price: event.target.value });
  };

  handleServiceImage = event => {
    this.setState({ image_url: "" });
  };

  handleServiceWebsite = event => {
    this.setState({ website: event.target.value });
  };

  handleServicePackages = event => {
    this.setState({ channel_packages: event.target.value });
  };

  handleServiceDvr = event => {
    console.log(event.target.checked)
    this.setState({ dvr: event.target.checked });
  };

  handleServiceNumDevices = event => {
    this.setState({ numberOfDevices: event.target.value });
  };

  handleSubmit = event => {
    if (this.props.match.params.id == null) {
      let name = this.state.name.trim();
      let description = this.state.description.trim();
      let price = this.state.price.trim();
      let image = 'EmptyImage';
      let website = this.state.website.trim();
      let standardChannels = this.state.base_channels;
      let standardPackages = this.state.channel_packages;
      let dvr = this.state.dvr;
      let numberOfDevices = this.state.numberOfDevices.trim();
      if (!name || !description || !website) {
        return;
      }
      API.submitNewService({ name: name, description: description, price: price, image_url: image, website: website, base_channels: standardChannels, channel_packages: standardPackages, dvr: dvr, numberOfDevices: numberOfDevices });
      //console.log("IN SUBMIT");
      this.setState({  name: '', description: '', price: '', image_url: '', website: '', base_channels: [], channel_packages: [], dvr: false, numberOfDevices: '', open: false});
    } else {
      //console.log("Editing!")
      const {selectedName, selectedDesc, selectedPrice, selectedWeb, selectedStandard, selectedPackages, selectedDvr, selectedNumDev} = this.props.location.state;
      let editingID = this.props.match.params.id;
      let name = (selectedName !== this.state.name) ? this.state.name : null;
      let description = (selectedDesc !== this.state.description) ? this.state.description : null;
      let price = (selectedPrice !== this.state.price) ? this.state.price : null;
      //Image will never be changed from original value because images are not supported right now, so this is always null.
      let image = null;
      let website = (selectedWeb !== this.state.website) ? this.state.website : null;
      let standardChannels = (selectedStandard !== this.state.base_channels) ? this.state.base_channels : null;
      let standardPackages = (selectedPackages !== this.state.channel_packages) ? this.state.channel_packages : null;
      let dvr = (selectedDvr != this.state.dvr) ? this.state.dvr : null;
      let numberOfDevices = (selectedNumDev !== this.state.numberOfDevices) ? this.state.numberOfDevices : null;
      let updatedService = {name: name, description: description, price: price, image_url: image, website: website, base_channels: standardChannels, channel_packages: standardPackages, dvr: dvr, numberOfDevices: numberOfDevices};
      API.updateService(editingID, updatedService);
    }
  }

  getChannels() {
    const onSuccess = (channels) => {
      let newChannel;
      let addThisChannel;
      const channelArray = [];
      for (const i in channels) {
        newChannel = channels[i];
        addThisChannel = newChannel.name;
        channelArray.push(addThisChannel);
      }
      this.setState({
        allChannels: channelArray,
      })
    };
    API.getChannels(onSuccess);
  }

  getPackages() {
    const onSuccess = (packages) => {
      let newPackage;
      let addThisPackage;
      const packageArray = [];
      for (const i in packages) {
        newPackage = packages[i];
        addThisPackage = newPackage.addonName;
        packageArray.push(addThisPackage);
      }
      this.setState({
        allPackages: packageArray,
      })
    };
    API.getAddons(onSuccess);
  }

  componentDidMount() {
    //console.log("Mounted")
    this.getChannels();
    this.getPackages();
    if (this.props.match.params.id != null) {
      const {selectedName, selectedDesc, selectedPrice, selectedWeb, selectedStandard, selectedPackages, selectedDvr, selectedNumDev} = this.props.location.state;
      this.setState({name: selectedName, description: selectedDesc, price: selectedPrice, website: selectedWeb, base_channels: selectedStandard, channel_packages: selectedPackages, dvr: selectedDvr, numberOfDevices: selectedNumDev, title: 'Edit Streaming Service'});
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" component={Link} to={{pathname: '/admin', state: {tabValue: 0}}} onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Add Streaming Service
              </Typography>
              <Button color="inherit" component={Link} to={{pathname: '/admin', state: {tabValue: 0}}} onClick={this.handleSubmit}>
                save
              </Button>
            </Toolbar>
          </AppBar>
        <TextField className={classes.field}
            required
            id="service-name"
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleServiceName}
            className={classes.textField}
            helperText="Name the streaming service"
            margin="normal"
        />
        <TextField className={classes.field}
            required
            id="service-desc"
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleServiceDesc}
            className={classes.textField}
            helperText="Describe the streaming service (unique features etc)"
            margin="normal"
            multiline
            rowsMax="4"
        />
        <TextField
          required
          id="service-website"
          placeholder="Website"
          value={this.state.website}
          onChange={this.handleServiceWebsite}
          helperText="eg. http://dalekeithapps.com"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="base-price"
          placeholder="Base service price (may be lowest package price)"
          value={this.state.price}
          onChange={this.handleServicePrice}
          label="Starting Price"
          helperText="eg. 39.99 or Starting at $20/month"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="num-devices"
          placeholder="Number of Devices"
          value={this.state.numberOfDevices}
          onChange={this.handleServiceNumDevices}
          helperText="eg. 2, Unlimited"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-standard-channels">Standard Channels</InputLabel>
          <Select
            multiple
            value={this.state.base_channels}
            onChange={this.handleChange}
            input={<Input id="select-standard-channels" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.state.allChannels.map(eachChannel => (
              <MenuItem key={eachChannel} value={eachChannel}>
                <Checkbox checked={this.state.base_channels.indexOf(eachChannel) > -1} />
                <ListItemText primary={eachChannel} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-packages">Packages</InputLabel>
          <Select
            multiple
            value={this.state.channel_packages}
            onChange={this.handleServicePackages}
            input={<Input id="select-packages" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.state.allPackages.map(eachPackage => (
              <MenuItem key={eachPackage} value={eachPackage}>
                <Checkbox checked={this.state.channel_packages.indexOf(eachPackage) > -1} />
                <ListItemText primary={eachPackage} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <FormControlLabel
          control={
            <Switch className={classes.switch}
                classes={{
                checked: classes.checked,
                bar: classes.bar,
                }}
              checked={this.state.dvr}
              value="dvr"
              onChange={this.handleServiceDvr}
            />
          }
          label="DVR Feature Included?"
        />
        </Dialog>
      </div>
    );
  }
}

AddStreamingService.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddStreamingService);