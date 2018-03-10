import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import API from '../admin/API';
import MyChannelGrid from './MyChannelGrid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
  heading: {
    width: '50%',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  priceAlign: {
    width: '50%',
    fontSize: theme.typography.pxToRem(13),
  },
  desc: {
      fontSize: 13,
      height:180,
  }
});

let counter = 0;
function createData(name, description, price, image, website, channels, packages, dvr, devices, uniqueID) {
  counter += 1;
  return { id: counter, name, description, price, image, website, channels, packages, dvr, devices, uniqueID };
}

let addCounter = 0;
function createAddon(name, description, service, price, channels, dvr, num, uniqueID) {
  counter += 1;
  //console.log(counter)
  return { id: counter, name, description, service, price, channels, dvr, num, uniqueID};
}


class EachChannelExpand extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            serviceData: [],
            addondata: [],
        };
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
            serviceData: serviceArray,
          });
        };
        API.getServices(onSuccess);
      }

    getAddons() {
    const onSuccess = (channels) => {
        let newAddon;
        let addThisAddon;
        let addAddonName;
        const addonArray = [];
        const addonNames = [];
        for (const i in channels) {
        newAddon = channels[i];
        addThisAddon = createAddon(newAddon.addonName, newAddon.description, newAddon.forService, newAddon.price, newAddon.channels, newAddon.dvr, newAddon.devicesNum, newAddon['_id']);
        addAddonName = (newAddon.addonName).toLowerCase();
        addonArray.push(addThisAddon);
        addonNames.push(addAddonName);
        }
        this.setState({
        addondata: addonArray,
        });
    };
    API.getAddons(onSuccess);
    }

    getInfoChannels() {
        var infoArray = [];
        const formattedArray = [];
        var desc = null;
        for (const i in this.props.selections) {
            let currentServiceName = this.props.name;
            let currentChannel = this.props.selections[i]
            for (const j in this.state.serviceData) {
                let serviceName = this.state.serviceData[j].name
                let serviceChannels = this.state.serviceData[j].channels
                if (serviceName === currentServiceName) {
                    for (const k in serviceChannels) {
                        let currentChannelofAll = serviceChannels[k];
                        if ((currentChannelofAll === currentChannel) && (currentServiceName === serviceName) ) {
                            //console.log("Found " + currentChannel + " in " + currentServiceName)
                            infoArray.push({service: currentServiceName, addon: '', price: ''})
                            desc = currentChannel + ' is found in the standard channels of ' + currentServiceName;
                        }
                    }
                    let allAddons = this.state.addondata;
                    for (const l in allAddons) {
                        let addonName = this.state.addondata[l].name 
                        let addonChannels = this.state.addondata[l].channels
                        let addonService = this.state.addondata[l].service
                        let addonPrice = this.state.addondata[l].price
                        for (const m in addonChannels) {
                            let currentAddonChannel = addonChannels[m];
                            if ((currentAddonChannel === currentChannel) && (addonService === serviceName) ) {
                                //console.log("Found " + currentChannel + " in the addon " + addonName + " for " + currentServiceName)
                                infoArray.push({service: currentServiceName, addon: addonName, price: addonPrice})
                                desc = currentChannel + ' is found in the following add-ons for ' + currentServiceName
                            }
                        }
                    }
                }
            }
            formattedArray.push({chan: currentChannel, desc: desc, infoArray})
            //console.log(formattedArray)
            this.setState({data: formattedArray})
            infoArray = [];
            desc = null;
        }
    }

    componentWillReceiveProps() {
        this.getInfoChannels();
        //console.log(this.state.data)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("Need update")
    //     return nextState.data !== this.state.data;
    // }
    
    componentWillMount() {
        this.getServices();
        this.getAddons();
    }

    render() {
        const { classes } = this.props;
        return (
        <div className={classes.root}>
        {this.state.data.map(panel => (
            <ExpansionPanel key={panel.chan} disabled={!panel.desc ? true : false } >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{panel.chan}</Typography>
                <Typography className={classes.priceAlign}>{!panel.desc ? "Channel not available" : null}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <span className={classes.desc}>
                    {panel.desc}
                    <MyChannelGrid addons={panel.infoArray} />
                </span>
            </ExpansionPanelDetails>
            </ExpansionPanel>
        ))}
        </div>
        );
    }
}

EachChannelExpand.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EachChannelExpand);