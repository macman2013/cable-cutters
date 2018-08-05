import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card, { CardContent } from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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

class AddonCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          channelCategory: '',
        };
      }

      componentWillMount() {
      }

      render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} component="h4">{this.props.eachAddon}</Typography>
                <Typography className={classes.pos}>${this.props.eachPrice}</Typography>
                </CardContent>
            </Card>
        );
    }

}

AddonCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AddonCard);