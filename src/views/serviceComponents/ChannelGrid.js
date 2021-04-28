import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ChannelCard from './ChannelCard'
import Typography from '@material-ui/core/Typography';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: 200,
  },
  title: {
    color: theme.palette.primary.light,
  },
  subhead: {
    marginBottom: 10,
  }
}));

export default function ChannelGrid({channels}) {
  const classes = styles()
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    getBaseChannels()
  }, [])

  const getBaseChannels = () => {
    let singleChannel;
    var counter = 0;
    const channelArray = [];
    for (const i in channels) {
        counter++;
        singleChannel = {id: counter, name: channels[i]};
        channelArray.push(singleChannel);
    }
    setData(channelArray)
  }

    if (channels.length <= 0) {
      return (
        <span className={classes.root}></span>
      );
    }

    return (
      <span className={classes.root}>
      <Typography variant="subheading" className={classes.subhead} color="inherit">Standard Channels</Typography>
      <GridList className={classes.gridList} cellHeight={100} cols={2}>
        {data.map(card => (
          <GridListTile key={card.id}>
            <ChannelCard eachChannel={card.name} />
          </GridListTile>
        ))}
      </GridList>
    </span>
    );
}