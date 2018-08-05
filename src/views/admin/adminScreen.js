import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs, { Tab } from '@material-ui/core/Tabs';
import ServiceTable from './ServiceTable';
import ChannelTable from './ChannelTable';
import AddonTable from './AddonTable';
import ShowTable from './ShowTable';

function TabContainer({ children }) {
  return (
    <div style={{ padding: 8 * 3 }}>
    {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    marginLeft:theme.spacing.unit * 12,
    marginRight:theme.spacing.unit * 12,
  },
});

class AdminScreen extends React.Component {
  
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentWillMount() {
    if (this.props.location.state != null) {
      const {tabValue} = this.props.location.state;
      this.setState({value: tabValue});
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Streaming Services" />
          <Tab label="Channels" />
          <Tab label="Add Ons" />
          <Tab label="Shows" />
        </Tabs>
        {value === 0 && <TabContainer><ServiceTable /></TabContainer>}
        {value === 1 && <TabContainer><ChannelTable /></TabContainer>}
        {value === 2 && <TabContainer><AddonTable /></TabContainer>}
        {value === 3 && <TabContainer><ShowTable /></TabContainer>}
      </Paper>
    );
  }
}

AdminScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminScreen);