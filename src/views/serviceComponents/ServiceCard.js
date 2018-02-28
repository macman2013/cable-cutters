import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import API from '../admin/API'
import ServiceInfoBox from './ServiceInfoBox'
import ChannelGrid from './ChannelGrid';
import AddOnExpand from './AddOnExpand';

const styles = theme => ({
  card: {
    minWidth: 275,
    marginLeft: 40,
    marginRight: 40,
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

let counter = 0;
function createData(name, description, price, image, website, channels, packages, dvr, devices, uniqueID) {
  counter += 1;
  return { id: counter, name, description, price, image, website, channels, packages, dvr, devices, uniqueID };
}

class ServiceCard extends React.Component {

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
                <ServiceInfoBox title = {this.props.serviceTitle}
                description = {this.props.serviceDescription}
                price = {this.props.servicePrice}
                numberDev = {this.props.serviceDeviceNum}
                website = {this.props.serviceWebsite}
                dvr = {this.props.serviceDVR}
                />
                <ChannelGrid channels={this.props.serviceChannels} />
                <AddOnExpand name={this.props.serviceTitle} addons={this.props.servicePackages} />
            </Paper>
            </div>
        );
    }

}

ServiceCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ServiceCard);