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
    width: 600,
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddStreamingService extends React.Component {
  state = {
    open: true,
    name: [],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
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
                Add Streaming Service
              </Typography>
              <Button color="inherit" component={Link} to="/admin" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
        <TextField className={classes.field}
            id="service-name"
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Name"
            className={classes.textField}
            helperText="Name the streaming service"
            margin="normal"
        />
        <TextField className={classes.field}
            id="service-desc"
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Description"
            className={classes.textField}
            helperText="Describe the streaming service (unique features etc)"
            margin="normal"
            multiline
            rowsMax="4"
        />
        <TextField
          id="base-price"
          label="Starting Price"
          type="number"
          helperText="eg. 39.99"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="num-devices"
          placeholder="Number of Devices"
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
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-standard-channels" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-packages">Packages</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-packages" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
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
              checked={this.state.checkedB}
              onChange={(event, checked) => this.setState({ checkedB: checked })}
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