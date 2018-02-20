import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Build';
import AddCircleIcon from 'material-ui-icons/AddCircleOutline';
import { lighten } from 'material-ui/styles/colorManipulator';
import API from './API';
import TextField from 'material-ui/TextField';

let counter = 0;
function createData(name, category, uniqueID) {
  counter += 1;
  //console.log(counter)
  return { id: counter, name, category, uniqueID};
}

// function createData(array) {
//   let newChannel;
//   let addThisChannel;
//   const channelArray = [];
//   for (const i in array) {
//     counter += 1;
//     console.log(counter)
//     newChannel = array[i];
//     addThisChannel = { id: counter, name: newChannel.name, category: newChannel.category };
//     channelArray.push(addThisChannel)
//     }
//   return channelArray;
// }

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Channel Name' },
  { id: 'category', numeric: false, disablePadding: true, label: 'Category' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          <TableCell padding="checkbox">
          <IconButton disabled aria-label="Edit">
            <EditIcon />
          </IconButton>
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.dark,
          backgroundColor: lighten(theme.palette.secondary.light, 0.4),
        }
      : {
          color: lighten(theme.palette.secondary.light, 0.4),
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, deleteFunc, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography variant="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography variant="title">Channels</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={deleteFunc} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add Channel">
            <IconButton component={Link} to="/admin/addChannel" aria-label="add channel">
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  textField: {
    marginLeft: theme.spacing.unit + 20,
    marginRight: theme.spacing.unit + 20,
    minWidth: 800,
  },
});

class ChannelTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.pollInterval = null;

    this.state = {
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [
        
      ].sort((a, b) => (a.name < b.name ? -1 : 1)),
      filteredChannels: [],
      originaldata: [],
      page: 0,
      rowsPerPage: 25,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  getChannels() {
    const onSuccess = (channels) => {
      let newChannel;
      let addThisChannel;
      let addChannelName;
      const channelArray = [];
      const channelNames = [];
      for (const i in channels) {
        newChannel = channels[i];
        addThisChannel = createData(newChannel.name, newChannel.category, newChannel['_id']);
        addChannelName = (newChannel.name).toLowerCase();
        channelArray.push(addThisChannel);
        channelNames.push(addChannelName);
      }
      this.setState({
        data: channelArray,
        originaldata: channelArray,
        selected: [],
        filteredChannels: channelNames
      });
    };
    API.getChannels(onSuccess);
  }

  deleteSelected = () => {
    const { selected, data } = this.state;
    for (const i in selected) {
      let deleteChan = selected[i];
      for (const t in data) {
        let dataChan = data[t];
        if (dataChan.id === deleteChan) {
          //console.log(dataChan.uniqueID);
          API.deleteChannel(dataChan.uniqueID);
        }
      }
    }
  }
  
  filterChannels = event => {
    //event.preventDefault();
    let filteredRows = [];
    //console.log(event.target.value)
    var lowerInput = (event.target.value).toLowerCase();
    let searchCriteria = this.state.filteredChannels.filter(s => s.includes(lowerInput));
    //console.log("Names that should be here " + searchCriteria)
    let beforeFilter = this.state.originaldata;
    //console.log("Channels Beginning" + beforeFilter.length)
    //console.log("Filtered Rows Before Either Loop" + filteredRows.length)
    for (const i in beforeFilter) {
      let eachRow = beforeFilter[i];
      let rowName = eachRow.name;
      var lowerRowName = rowName.toLowerCase();
      //console.log(lowerRowName)
      for (const t in searchCriteria) {
        var lowerSearchCriteria = searchCriteria[t].toLowerCase();
        //console.log(lowerSearchCriteria)
        if (lowerRowName.includes(lowerSearchCriteria)) {
          filteredRows.push(eachRow);
        }
      }
    }
    let unique = [...new Set(filteredRows)]
    //console.log(unique)
    this.setState({data:unique}) 
  }

  componentDidMount() {
    this.getChannels();
    if (!this.pollInterval) {
      this.pollInterval = 2000
    } 
  }

  componentWillReceiveProps(nextProps) {
    //console.log("Receiving New Props");
    this.getChannels();
  }

  //this will prevent error messages every 2 seconds once the ChannelTable is unmounted
  componentWillUnmount() {
  this.pollInterval && clearInterval(this.pollInterval);
  this.pollInterval = null;
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.tableWrapper}>
          <TextField
                id="channel-search"
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="Filter Channels by name"
                className={classes.textField}
                onChange={this.filterChannels}
                margin="normal"
            />
        <EnhancedTableToolbar 
        numSelected={selected.length} 
        deleteFunc ={this.deleteSelected}
        />
        
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding="checkbox">
                      <IconButton component={Link} to={{pathname: '/admin/' + n.uniqueID + '/editChannel', state: {selectedName: n.name, selectedCat: n.category}}} aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell padding="none">{n.name}</TableCell>
                    <TableCell padding="none">{n.category}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  rowsPerPageOptions={[5,10,25,50]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
    );
  }
}

ChannelTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelTable);