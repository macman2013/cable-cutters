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
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddChannel extends React.Component {
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
              <Button color="inherit" component={Link} to="/admin" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
        <TextField className={classes.field}
            id="channel-name"
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Channel Name"
            className={classes.textField}
            helperText="Name the channel"
            margin="normal"
        />
        <TextField className={classes.field}
            id="channel-category"
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Category"
            className={classes.textField}
            helperText="eg News"
            margin="normal"
            multiline
            rowsMax="4"
        />
        </Dialog>
      </div>
    );
  }
}

AddChannel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddChannel);