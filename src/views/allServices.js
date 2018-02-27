import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import API from '../views/admin/API'
import ServiceCard from './serviceComponents/ServiceCard'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 40,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
});

let counter = 0;
function createData(name, description, price, image, website, channels, packages, dvr, devices, uniqueID) {
  counter += 1;
  return { id: counter, name, description, price, image, website, channels, packages, dvr, devices, uniqueID };
}

class AllServices extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getServices();
  }

  getServices() {
    const onSuccess = (services) => {
      let newService;
      let addThisService;
      const serviceArray = [];
      for (const i in services) {
        newService = services[i];
        addThisService = createData(newService.name, newService.description, newService.price, newService.image_url, newService.website, newService.base_channels, newService.channel_packages, newService.dvr, newService.numberOfDevices, newService['_id']);
        serviceArray.push(addThisService);
      }
      this.setState({
        data: serviceArray,
      });
    };
    API.getServices(onSuccess);
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {this.state.data.map(card => (
          <GridListTile key={card.id}>
            <ServiceCard serviceTitle={card.name}
            serviceDescription={card.description}
            servicePrice={card.price}
            serviceWebsite={card.website}
            serviceChannels={card.channels}
            servicePackages={card.packages}
            serviceDVR={card.dvr}
            serviceDeviceNum={card.devices}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    );
  }
}

AllServices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllServices);