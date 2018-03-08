import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import API from '../admin/API';

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

class EachChannelExpand extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentWillMount() {
        this.getReqsForChannels()
    }

    componentWillReceiveProps() {
        this.getReqsForChannels()
    }

    getReqsForChannels() {
        if (this.props.standardChannels) {
            let allStandardChannels = this.props.standardChannels;
            let allCheckedChannels = this.props.addons;
            for (const i in allStandardChannels) {
                for (const j in allCheckedChannels) {
                    let eachCheckedChannel = allCheckedChannels[j]
                    //console.log("Checked Channel: " + eachCheckedChannel)
                    //console.log("Current Channel" + allStandardChannels[i])
                    if (eachCheckedChannel === allStandardChannels[i]) {
                        console.log(eachCheckedChannel + " found in the standard channel list for " + this.props.name)
                    }
                }
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
        <div className={classes.root}>
        {this.props.addons.map(panel => (
            <ExpansionPanel key={panel} disabled={true} >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{panel}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <span className={classes.desc}>
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