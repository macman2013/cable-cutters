import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import API from '../admin/API';

const styles = theme => ({
  card: {
    minWidth: 40,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.primary,
    marginBottom: 5,
  },
  pos: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
});

class ChannelCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          channelCategory: '',
        };
      }

      findChannelCategory() {
        const onSuccess = (channels) => {
          let newChannel;
          let addChannelCategory;
          let addChannelName;
          for (const i in channels) {
            newChannel = channels[i];
            addChannelName = newChannel.name;
            addChannelCategory = newChannel.category;
            if (addChannelName === this.props.eachChannel) {
              this.setState({channelCategory: addChannelCategory})
            }
          }
        };
        API.getChannels(onSuccess);
      }

      componentDidMount() {
        this.findChannelCategory();
      }

      render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} component="h4">{this.props.eachChannel}</Typography>
                <Typography className={classes.pos}>{this.state.channelCategory}</Typography>
                </CardContent>
            </Card>
        );
    }

}

ChannelCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ChannelCard);