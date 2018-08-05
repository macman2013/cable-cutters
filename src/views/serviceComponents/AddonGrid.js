import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ChannelCard from './ChannelCard'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 40,
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: 110,
    width: 340,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

class AddonGrid extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.getBaseChannels();
  }

  getBaseChannels() {
    let singleChannel;
    var counter = 0;
    const channelArray = [];
    for (const i in this.props.channels) {
        counter++;
        singleChannel = {id: counter, name: this.props.channels[i]};
        channelArray.push(singleChannel);
    }
    this.setState({data: channelArray});
  }
  
  render() {
    const { classes } = this.props;
    return (
      <span className={classes.root}>
      <GridList className={classes.gridList} cellHeight={100} cols={2}>
        {this.state.data.map(card => (
          <GridListTile key={card.id}>
            <ChannelCard eachChannel={card.name} />
          </GridListTile>
        ))}
      </GridList>
    </span>
    );
  }
}

AddonGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddonGrid);