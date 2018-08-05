import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel'; 
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'; 
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import API from '../admin/API';
import AddonGrid from './AddonGrid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
  heading: {
    width: '85%',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  priceAlign: {
    width: '15%',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  desc: {
      fontSize: 13,
      height:180,
  }
});

class AddOnExpand extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentWillMount() {
        this.getBaseAddons();
    }

    getBaseAddons() {
        const onSuccess = (addons) => {
            let singleAddon;
            let newAddon;
            let newAddonForService;
            var counter = 0;
            const addonArray = [];
            for (const i in addons) {
                counter++;
                newAddon = addons[i];
                newAddonForService = newAddon.forService;
                if (newAddonForService === this.props.name) {
                    singleAddon = {id: counter, name: newAddon.addonName, desc: newAddon.description, price: newAddon.price, dvr: newAddon.dvr, channels: newAddon.channels};
                    addonArray.push(singleAddon);
                }
            }
            this.setState({data: addonArray});
        };
        API.getAddons(onSuccess);
    }

    render() {
        const { classes } = this.props;
        return (
        <div className={classes.root}>
        {this.state.data.map(panel => (
            <ExpansionPanel key={panel.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{panel.name}</Typography>
                <Typography className={classes.priceAlign}>${panel.price}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <span className={classes.desc}>
                {panel.desc}
                <AddonGrid channels={panel.channels} />
                </span>
            </ExpansionPanelDetails>
            </ExpansionPanel>
        ))}
        </div>
        );
    }
}

AddOnExpand.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddOnExpand);