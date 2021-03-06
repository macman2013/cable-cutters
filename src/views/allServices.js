import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import API from '../views/admin/API'
import ServiceCard from './serviceComponents/ServiceCard'

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
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    },
  title: {
    color: theme.palette.primary.light,
  },
}));

let counter = 0;
function createData(name, description, price, image, website, channels, packages, dvr, devices, uniqueID) {
  counter += 1;
  return { id: counter, name, description, price, image, website, channels, packages, dvr, devices, uniqueID };
}

export default function AllServices() {
  const classes = styles()
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    getServices()
  }, [])

  const getServices = () => {
    const onSuccess = (services) => {
      let newService;
      let addThisService;
      const serviceArray = [];
      for (const i in services) {
        newService = services[i];
        addThisService = createData(newService.name, newService.description, newService.price, newService.image_url, newService.website, newService.base_channels, newService.channel_packages, newService.dvr, newService.numberOfDevices, newService['_id']);
        serviceArray.push(addThisService);
      }
      setData(serviceArray)
    };
    API.getServices(onSuccess);
  }

    return (
      <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={'auto'} cols={3}>
        {data.map(card => (
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