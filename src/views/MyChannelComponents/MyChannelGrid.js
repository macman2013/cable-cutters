import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile } from 'material-ui/GridList';
import AddonCard from './AddonCard'
import Typography from 'material-ui/Typography';

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
    width: 260,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

class MyChannelGrid extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.getAddons();
  }

  getAddons() {
    let singleAddon;
    var counter = 0;
    const addArray = [];
    for (const i in this.props.addons) {
        counter++;
        singleAddon = {id: counter, name: this.props.addons[i].addon, addonPrice: this.props.addons[i].price};
        addArray.push(singleAddon);
    }
    this.setState({data: addArray});
  }
  
  render() {
    const { classes } = this.props;
    for (const i in this.props.addons) {
        let lookFor = this.props.addons[i].addon
        if (lookFor === "") {
            return (
              <span className={classes.root}></span>
            );
        }
    }

    return (
      <span className={classes.root}>
      <GridList className={classes.gridList} cellHeight={100} cols={2}>
        {this.state.data.map(card => (
          <GridListTile key={card.id}>
            <AddonCard eachAddon={card.name} eachPrice={card.addonPrice} />
          </GridListTile>
        ))}
      </GridList>
    </span>
    );
  }
}

MyChannelGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyChannelGrid);