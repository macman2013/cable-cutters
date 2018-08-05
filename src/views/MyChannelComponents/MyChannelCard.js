import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MyChannelBox from './MyChannelBox'
import EachChannelExpand from './EachChannelExpand';

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

class MyChannelCard extends React.Component {

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
                <MyChannelBox title ={this.props.serviceTitle}
                price ={this.props.servicePrice}
                numberDev ={this.props.serviceDeviceNum}
                website ={this.props.serviceWebsite}
                dvr ={this.props.serviceDVR}
                />
                <div className={classes.subheading}>Selected Channels</div>
                <EachChannelExpand name={this.props.serviceTitle} selections={this.props.serviceSelections} standardChannels={this.props.serviceChannels} />
            </Paper>
        );
    }

}

MyChannelCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(MyChannelCard);