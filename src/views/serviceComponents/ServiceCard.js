import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ServiceInfoBox from './ServiceInfoBox'
import ChannelGrid from './ChannelGrid';
import AddOnExpand from './AddOnExpand';

const styles = makeStyles(theme => ({
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
}));

export default function ServiceCard({serviceTitle, serviceDescription, servicePrice, serviceDeviceNum, 
  serviceWebsite, serviceDVR, serviceChannels, servicePackages
}) {
  const classes = styles();
  return (
      <Paper className={classes.card} elevation={0}>
          <ServiceInfoBox title={serviceTitle}
          description={serviceDescription}
          price={servicePrice}
          numberDev={serviceDeviceNum}
          website={serviceWebsite}
          dvr={serviceDVR}
          />
          <ChannelGrid channels={serviceChannels} />
          <div className={classes.subheading}>Add-ons & Channel Packages</div>
          <AddOnExpand name={serviceTitle} addons={servicePackages} />
      </Paper>
  )
};

ServiceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
  