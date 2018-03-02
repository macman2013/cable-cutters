import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import ServiceInfoBox from './ServiceInfoBox'
import ChannelGrid from './ChannelGrid';
import AddOnExpand from './AddOnExpand';

const styles = theme => ({
  card: {
    minWidth: 275,
    marginLeft: 40,
    marginRight: 40,
    paddingBottom: 10,
  },
  subheading: {
    marginBottom: 15,
    marginTop: 15,
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
            <Paper className={classes.card} elevation={0}>
                <ServiceInfoBox title ={this.props.serviceTitle}
                description ={this.props.serviceDescription}
                price ={this.props.servicePrice}
                numberDev ={this.props.serviceDeviceNum}
                website ={this.props.serviceWebsite}
                dvr ={this.props.serviceDVR}
                />
                <ChannelGrid channels={this.props.serviceChannels} />
                <div className={classes.subheading}>Add-ons & Channel Packages</div>
                <AddOnExpand name={this.props.serviceTitle} addons={this.props.servicePackages} />
            </Paper>
        );
    }

}

ServiceCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ServiceCard);