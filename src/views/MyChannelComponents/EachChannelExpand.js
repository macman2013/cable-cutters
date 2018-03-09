import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
//import API from '../admin/API';

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

    }

    render() {
        const { classes } = this.props;
        return (
        <div className={classes.root}>
        {this.props.selections.map(panel => (
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

AddOnExpand.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddOnExpand);