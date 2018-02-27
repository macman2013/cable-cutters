import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
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

class ChannelCard extends React.Component {

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
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title}>Word of the Day</Typography>
                <Typography variant="headline" component="h2">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos}>adjective</Typography>
                <Typography component="p">
                    well meaning and kindly.<br />
                    {'"a benevolent smile"'}
                </Typography>
                </CardContent>
            </Card>
            </div>
        );
    }

}

ChannelCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ChannelCard);