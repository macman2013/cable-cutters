import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

class ServiceInfoBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }

      render() {
        const { classes } = this.props;
        return (
            <div>
            <Paper className={classes.card} elevation={0}>
                <Typography variant="headline" component="h2">
                    {this.props.title}
                </Typography>
                <Typography className={classes.title}>{this.props.description}</Typography>
                <Typography className={classes.pos}>Base Price: {this.props.price}</Typography>
                <Typography component="p">Base Number of Devices: {this.props.numberDev}</Typography>
                <Typography component="p"><a href={this.props.website}>View Website</a></Typography>
                <Typography component="p">DVR Included?: {this.props.dvr}</Typography>
            </Paper>
            </div>
        );
    }

}

ServiceInfoBox.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ServiceInfoBox);