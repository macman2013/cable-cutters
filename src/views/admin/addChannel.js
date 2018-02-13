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
import { FormControl } from 'material-ui/Form';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
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
  'Premium'
]

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', category: '', image_url: '', open: true };
    this.handleChannelNameChange = this.handleChannelNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  handleChannelNameChange(e) {
    console.log("IN NAME");
    this.setState({ name: e.target.value });
  }
  handleCategoryChange(e) {
    console.log("IN CATEGORY");
    this.setState({ category: e.target.value });
  }
  handleImageChange(e) {
    //This is hard-coded to a empty string right now because I haven't decided to include images yet
    this.setState({ image_url: "" });
  }
  handleSubmit = () => {
    let name = this.state.name.trim();
    let category = this.state.category.trim();
    let image = 'EmptyImage';
    if (!name || !category) {
      return;
    }
    API.submitNewChannel({ name: name, category: category, image_url: image });
    console.log("IN SUBMIT");
    this.setState({  name: '', category: '', image_url: '', open: false});
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
                Add Channel
              </Typography>
              <Button color="inherit" component={Link} to="/admin" onClick={this.handleSubmit}>
                save
              </Button>
            </Toolbar>
          </AppBar>
        <TextField className={classes.field}
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