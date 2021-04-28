import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginRight: 60,
    marginLeft: 60,
  }),
  heading: {marginTop:15}
}));

export default function About() {

    const classes = styles();
    return (
      <div>
      <Paper className={classes.root} elevation={2}>
        <Typography variant="headline" component="h1">
        About Cable Cutters
        </Typography>
        <Divider />
        <Typography className={classes.heading} component="p">
        This website was designed as a resource for users to compare different live TV streaming services based on their individual watching habits.
        This project is not affilated with any company, television network, product, or service. This project does not favor or endorse any product on this website.
        No commission or compensation is generated by the use of this website.
        This project is completely open-source and no data is collected from users.
        </Typography>
        </Paper>
      <Paper className={classes.root} elevation={2}>
        <Typography variant="headline" component="h2">
        Why does this website exist?
        </Typography>
        <Divider />
        <Typography className={classes.heading} component="p">
        This website was originally created by Dale Keith, who could not find a good way to compare different live TV streaming ("cord-cutting") services. 
        There were many articles and blog posta about each individual service, but they were not always up-to-date and none of them offered a way for a reader to find the best option based on their individual watching habits.<br /><br /> 
        So, this app was created.
        </Typography>
      </Paper>
      <Paper className={classes.root} elevation={2}>
        <Typography variant="headline" component="h2">
        How can someone contribute?
        </Typography>
        <Divider />
        <Typography className={classes.heading} component="p">
        View the project on GitHub <a href="https://github.com/macman2013/cable-cutters">here</a>, which includes instructions about how to access the admin panel.<br />
        <br />
        This project was built with the MERN stack (MongoDB, Express, React, NodeJS) using Material-UI for user interface components.<br />
        View the package.json file on GitHub for more information about the dependencies used in the project.
        </Typography>
      </Paper>
      </div>
    );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};