import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
    },
  });

class AddUpdateDelete extends React.Component {
    
    constructor(props) {
        this.state = {open: true, message: ''}
    }
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
    render() {
        const { isAdded, isUpdated, isDeleted } = this.props;

        if (isAdded) {
            this.setState({message: 'Successfully Added'})
        } else if (isUpdated) {
            this.setState({message: 'Successfully Updated'})
        } else if (isDeleted) {
            this.setState({message: 'Successfully Deleted'})
        }
    
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.message}</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                    UNDO
                    </Button>,
                    <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleClose}
                    >
                    <CloseIcon />
                    </IconButton>,
                ]}
            />
        );
    }
}

AddUpdateDelete.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AddUpdateDelete);