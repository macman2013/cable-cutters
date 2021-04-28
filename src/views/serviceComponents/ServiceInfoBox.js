import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = makeStyles(theme => ({
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
}));

export default function ServiceInfoBox({price, dvr, title, description, numberDev, website}) {
    const classes = styles()
    const [formattedDVR, setformattedDVR] = React.useState('')
    const [formattedPrice, setformattedPrice] = React.useState('')

      const formatDVR = () => {
        if (dvr === true) {
          setformattedDVR('Includes DVR')
        }
        else {
          setformattedDVR('Does not include DVR')
        }
      }

      const formatPrice = () => {
        if (!isNaN(price)) {
          setformattedPrice(`$ ${price}`)
        }
        else {
          setformattedPrice(price)
        }
      }

      React.useEffect(() => {
        formatDVR()
        formatPrice()
      }, [])

        return (
            <div>
            <Paper className={classes.card} elevation={0}>
                <Typography className={classes.title} variant="headline" component="h2">{title}</Typography>
                <Divider />
                <Typography className={classes.desc}>{description}</Typography>
                <Typography className={classes.pos}>Base Price: {formattedPrice}</Typography>
                <Typography component="p">Includes  {numberDev} Device(s)</Typography>
                <Typography component="p"><a href={website}>View Website</a></Typography>
                <Typography component="p">{formattedDVR}</Typography>
            </Paper>
            </div>
        );
    }