import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddAddOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addonName: '', forService: '', price: 0, channels: [], dvr: false, devicesNum: '', open: true, title: 'Create Add-on', selectedChannels: [] };
    this.handleAddOnNameChange = this.handleAddOnNameChange.bind(this);
    this.handleForServiceChange = this.handleForServiceChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleChannelsChange = this.handleChannelsChange.bind(this);
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

  handleChannelsChange(e) {
    this.setState({ channels: e.target.value });
  }

  handleDVRChange(e) {
    this.setState({ dvr: e.target.value });
  }

  handleNumDeviceChange(e) {
    this.setState({ devicesNum: e.target.value });
  }

  handleSubmit = () => {
    if (this.props.match.params.id == null) {
      let name = this.state.addonName.trim();
      let service = this.state.forService.trim();
      let price = this.state.price;
      let channels = this.state.channels;
      let dvr = this.state.dvr;
      let num = this.state.devicesNum;
      if (!name) {
        return;
      }
      API.submitNewAddOn({ addonName: name, forService: service, price: price, channels: channels, dvr: dvr, devicesNum: num });
      //console.log("IN SUBMIT");
      this.setState({  addonName: '', forService: '', price: '', channels: [], dvr: false, devicesNum: '', open: false});
    } else {
      //console.log("Editing!")
      const {selectedName, selectedCat} = this.props.location.state;
      let editingID = this.props.match.params.id;
      let name = (selectedName !== this.state.addonName) ? this.state.addonName : null;
      let service = (selectedCat !== this.state.forService) ? this.state.forService : null;
      let image = null;
      //let updatedAddon = {addonName: name, forService: service, price: price, channels: channels, dvr: dvr, devicesNum: num};
      //API.updateAddOn(editingID, updatedChannel);
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    if (this.props.match.params.id != null) {
      const {selectedName, selectedCat} = this.props.location.state;
      //console.log("Selected Name for Editing " + selectedName);
      //console.log("Selected Category for Editing " + selectedCat);
      this.setState({name: selectedName, category: selectedCat, title: 'Edit Add-on'});
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
              <IconButton color="inherit" component={Link} to="/admin" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {this.state.title}
              </Typography>
              <Button color="inherit" component={Link} to="/admin" onClick={this.handleSubmit}  aria-label="Close">
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
            label="For Service"
            id="for-servicename"
            value={this.state.forService}
            onChange={this.handleForServiceChange}
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Service Name"
            className={classes.textField}
            helperText="What service does this add-on belong to?"
            margin="normal"
        />
        <TextField className={classes.field}
            label="Price"
            id="addon-price"
            value={this.state.price}
            onChange={this.handlePriceChange}
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Add-on price"
            className={classes.textField}
            helperText="e.g $35/month"
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
            required
            value={this.state.channels}
            onChange={this.handleChannelsChange}
            inputProps={{
              name: 'category',
              id: 'channel-category',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {chooseCategories.map(chooseCategory => (
              <MenuItem key={chooseCategory} value={chooseCategory}>{chooseCategory}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Dialog>
      </div>
    );
  }
}

AddAddOn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAddOn);