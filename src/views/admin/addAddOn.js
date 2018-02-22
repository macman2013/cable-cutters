import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormControlLabel, FormGroup } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Switch from 'material-ui/Switch';
import green from 'material-ui/colors/green';
import API from './API.js';


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
    width: 500,
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

class AddAddOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addonName: '', description: '', forService: '', price: 0, channels: [], dvr: false, devicesNum: '', open: true, title: 'Create Add-on', allChannels: [], allServices: [] };
    this.handleAddOnNameChange = this.handleAddOnNameChange.bind(this);
    this.handleForServiceChange = this.handleForServiceChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDVRChange = this.handleDVRChange.bind(this);
    this.handleNumDeviceChange = this.handleNumDeviceChange.bind(this);
  }
  
  handleAddOnNameChange(e) {
    //console.log("IN NAME");
    this.setState({ addonName: e.target.value });
  }
  handleForServiceChange(e) {
    //console.log("IN CATEGORY");
    this.setState({ forService: e.target.value });
  }
  handlePriceChange(e) {
    this.setState({ price: e.target.value });
  }

  handleDVRChange(e) {
    this.setState({ dvr: e.target.checked });
  }

  handleNumDeviceChange(e) {
    this.setState({ devicesNum: e.target.value });
  }

  handleSubmit = () => {
    if (this.props.match.params.id == null) {
      let name = this.state.addonName.trim();
      let description = this.state.description.trim();
      let service = this.state.forService.trim();
      let price = this.state.price;
      let channels = this.state.channels;
      let dvr = this.state.dvr;
      let num = this.state.devicesNum;
      if (!name) {
        return;
      }
      API.submitNewAddOn({ addonName: name, description: description, forService: service, price: price, channels: channels, dvr: dvr, devicesNum: num });
      console.log("IN SUBMIT");
      this.setState({  addonName: '', description: '', forService: '', price: '', channels: [], dvr: false, devicesNum: '', open: false});
    } else {
      //console.log("Editing!")
      const {selectedName, selectedDesc, selectedService, selectedPrice, selectedNum, selectedChan, selectedDvr} = this.props.location.state;
      let editingID = this.props.match.params.id;
      let name = (selectedName !== this.state.addonName) ? this.state.addonName : null;
      let description = (selectedDesc !== this.state.description) ? this.state.description : null;
      let service = (selectedService !== this.state.forService) ? this.state.forService : null;
      let price = (selectedPrice !== this.state.price) ? this.state.price : null;
      let channels = (selectedChan !== this.state.channels) ? this.state.channels : null;
      let dvr = (selectedDvr !== this.state.dvr) ? this.state.dvr : null;
      let num = (selectedNum !== this.state.devicesNum) ? this.state.devicesNum : null;
      let image = null;
      let updatedAddon = {addonName: name, description: description, forService: service, price: price, channels: channels, dvr: dvr, devicesNum: num};
      API.updateAddOn(editingID, updatedAddon);
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ channels: event.target.value });
  };
  
  handleServiceChange = event => {
    this.setState({ forService: event.target.value });
  };

  handleDesc = event => {
    this.setState({ description: event.target.value });
  };

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

  getServices() {
    const onSuccess = (services) => {
      let newService;
      let addThisService;
      const serviceArray = [];
      for (const i in services) {
        newService = services[i];
        addThisService = newService.name;
        serviceArray.push(addThisService);
      }
      this.setState({
        allServices: serviceArray,
      })
    };
    API.getServices(onSuccess);
  }

  componentWillMount() {
    this.getChannels();
    this.getServices();
    if (this.props.match.params.id != null) {
      const {selectedName, selectedDesc, selectedService, selectedPrice, selectedNum, selectedChan, selectedDvr} = this.props.location.state;
      this.setState({addonName: selectedName, description: selectedDesc, forService: selectedService, price: selectedPrice, channels: selectedChan, dvr: selectedDvr, devicesNum: selectedNum, title: 'Edit Add-on'});
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
              <IconButton color="inherit" component={Link} to={{pathname: '/admin', state: {tabValue: 2}}} onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {this.state.title}
              </Typography>
              <Button color="inherit" component={Link} to={{pathname: '/admin', state: {tabValue: 2}}} onClick={this.handleSubmit}  aria-label="Save">
                save
              </Button>
            </Toolbar>
          </AppBar>
        <TextField className={classes.field}
            required
            label="Add-on Name"
            id="addon-name"
            value={this.state.addonName}
            onChange={this.handleAddOnNameChange}
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Add-on Name"
            className={classes.textField}
            helperText="Name the channel"
            margin="normal"
        />
        <TextField className={classes.field}
            required
            id="addon-desc"
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleDesc}
            className={classes.textField}
            helperText="Describe the add-on (unique features etc)"
            margin="normal"
            multiline
            rowsMax="4"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="for-servicename">For Service</InputLabel>
          <Select
            value={this.state.forService}
            onChange={this.handleServiceChange}
            input={<Input id="for-servicename" />}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.allServices.map(eachService => (
              <MenuItem key={eachService} value={eachService}>
                <ListItemText primary={eachService} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField className={classes.field}
            type="number"
            label="Price"
            id="addon-price"
            value={this.state.price}
            onChange={this.handlePriceChange}
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Add-on price"
            className={classes.textField}
            helperText="e.g 35"
            margin="normal"
        />
        <TextField className={classes.field}
            label="Number of Devices"
            id="addon-devices"
            value={this.state.devicesNum}
            onChange={this.handleNumDeviceChange}
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Number of devices"
            className={classes.textField}
            helperText="e.g 2 or Unlimited"
            margin="normal"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="addon-channels">Channels</InputLabel>
          <Select
            multiple
            value={this.state.channels}
            onChange={this.handleChange}
            input={<Input id="addon-channels" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.allChannels.map(eachChannel => (
              <MenuItem key={eachChannel} value={eachChannel}>
                <Checkbox checked={this.state.channels.indexOf(eachChannel) > -1} />
                <ListItemText primary={eachChannel} />
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
              onChange={this.handleDVRChange}
            />
          }
          label="DVR Feature Included?"
        />
        </Dialog>
      </div>
    );
  }
}

AddAddOn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAddOn);