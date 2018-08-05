import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
    paddingBottom: 5,
  },
  desc: {
    paddingTop: 10,
    marginBottom: 16,
    fontSize: 14,
    height: 100,
    color: theme.palette.text.secondary,
    textAlign: 'justify',
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

class MyChannelBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          formattedDVR: '',
          formattedPrice: '',
        };
      }

      formatDVR() {
        if (this.props.dvr === true) {
          this.setState({formattedDVR: 'Includes DVR'});
        }
        else {
          this.setState({formattedDVR: 'Does not include DVR'});
        }
      }

      formatPrice() {
        if (!isNaN(this.props.price)) {
          this.setState({formattedPrice: '$' + this.props.price});
        }
        else {
          this.setState({formattedPrice: this.props.price});
        }
      }

      componentDidMount() {
        this.formatDVR();
        this.formatPrice();
      }

      render() {
        const { classes } = this.props;
        return (
            <div>
            <Paper className={classes.card} elevation={0}>
                <Typography className={classes.title} variant="headline" component="h2">{this.props.title}</Typography>
                <Divider />
                <Typography className={classes.pos}>Price with selected channels: {this.state.formattedPrice}</Typography>
                <Typography component="p">Includes  {this.props.numberDev} Device(s)</Typography>
                <Typography component="p"><a href={this.props.website}>View Website</a></Typography>
                <Typography component="p">{this.state.formattedDVR}</Typography>
            </Paper>
            </div>
        );
    }

}

MyChannelBox.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(MyChannelBox);