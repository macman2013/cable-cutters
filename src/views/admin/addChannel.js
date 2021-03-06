import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
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

class AddChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', category: '', image_url: '', open: true, title: 'Add Channel'};
    this.handleChannelNameChange = this.handleChannelNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  handleChannelNameChange(e) {
    //console.log("IN NAME");
    this.setState({ name: e.target.value });
  }
  handleCategoryChange(e) {
    //console.log("IN CATEGORY");
    this.setState({ category: e.target.value });
  }
  handleImageChange(e) {
    //This is hard-coded to a empty string right now because I haven't decided to include images yet
    this.setState({ image_url: "" });
  }
  handleSubmit = () => {
    if (this.props.match.params.id == null) {
      let name = this.state.name.trim();
      let category = this.state.category.trim();
      let image = 'EmptyImage';
      if (!name || !category) {
        return;
      }
      API.submitNewChannel({ name: name, category: category, image_url: image });
      //console.log("IN SUBMIT");
      this.setState({  name: '', category: '', image_url: '', open: false});
    } else {
      //console.log("Editing!")
      const {selectedName, selectedCat} = this.props.location.state;
      let editingID = this.props.match.params.id;
      let name = (selectedName !== this.state.name) ? this.state.name : null;
      let category = (selectedCat !== this.state.category) ? this.state.category : null;
      //Image will never be changed from original value because images are not supported right now, so this is always null.
      let image = null;
      let updatedChannel = {name: name, category: category, image_url: image};
      API.updateChannel(editingID, updatedChannel);
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
      this.setState({name: selectedName, category: selectedCat, title: 'Edit Channel'});
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
              <IconButton color="inherit" component={Link} to={{pathname: '/admin', state: {tabValue: 1}}} onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {this.state.title}
              </Typography>
              <Button color="inherit" component={Link} to={{pathname: '/admin', state: {tabValue: 1}}} onClick={this.handleSubmit}  aria-label="Close">
                save
              </Button>
            </Toolbar>
          </AppBar>
        <TextField
            required
            label="Channel Name"
            id="channel-name"
            value={this.state.name}
            onChange={this.handleChannelNameChange}
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Channel Name"
            className={classes.textField}
            helperText="Name the channel"
            margin="normal"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="channel-category">Category</InputLabel>
          <Select
            required
            value={this.state.category}
            onChange={this.handleCategoryChange}
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

AddChannel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddChannel);