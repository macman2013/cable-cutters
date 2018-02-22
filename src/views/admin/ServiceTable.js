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
import AddStreamingService from './addStreamingService';
import { lighten } from 'material-ui/styles/colorManipulator';
import API from './API'

let counter = 0;
function createData(name, description, price, image, website, channels, packages, dvr, devices, uniqueID) {
  counter += 1;
  return { id: counter, name, description, price, image, website, channels, packages, dvr, devices, uniqueID };
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'price', numeric: false, disablePadding: false, label: 'Base Price' },
  { id: 'base_channels', numeric: false, disablePadding: false, label: 'Base Channels' },
  { id: 'channel_packages', numeric: false, disablePadding: false, label: 'Availiable Packages' },
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
  const { numSelected, classes, deleteFunc } = props;

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
          <Typography variant="title">Streaming Services</Typography>
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
          <Tooltip title="Add Streaming Service">
            <IconButton component={Link} to="/admin/add" aria-label="add service">
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
});

class ServiceTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [

      ].sort((a, b) => (a.name < b.name ? -1 : 1)),
      filteredServices: [],
      packageArray: [{ addOnName: '', service: []}],
      originaldata: [],
      page: 0,
      rowsPerPage: 5,
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

  getServices() {
    const onSuccess = (services) => {
      let newService;
      let addThisService;
      let addServiceName;
      const serviceArray = [];
      const serviceNames = [];
      for (const i in services) {
        newService = services[i];
        addThisService = createData(newService.name, newService.description, newService.price, newService.image_url, newService.website, newService.base_channels, newService.channel_packages, newService.dvr, newService.numberOfDevices, newService['_id']);
        addServiceName = (newService.name).toLowerCase();
        serviceArray.push(addThisService);
        serviceNames.push(addServiceName);
      }
      this.setState({
        data: serviceArray,
        originaldata: serviceArray,
        selected: [],
        filteredServices: serviceNames
      });
    };
    API.getServices(onSuccess);
  }

  getPackages() {
    const onSuccess = (packages) => {
      let newPackage;
      let addPackageService;
      let addPackageName;
      const packageNames = [];
      const packageServices = [];
      for (const i in packages) {
        newPackage = packages[i];
        addPackageName = (newPackage.addonName);
        addPackageService = (newPackage.forService);
        packageNames.push(addPackageName);
        packageServices.push(addPackageService);
        this.setState({
          packageArray: [{addOnName: packageNames, service: packageServices}]
        });
        //console.log(this.state.packageArray)
      }
    };
    API.getAddons(onSuccess);
  }

  syncPackagesAndServices() {
    let beforeSync = this.state.originaldata;
    let packagesBeforeSync = this.state.packageArray;
    const namesToAdd = [];
    for (const i in beforeSync) {
      var eachRow = beforeSync[i];
      console.log(eachRow)
      var rowName = eachRow.name;
      var rowServices = eachRow.forService;
      for (const t in packagesBeforeSync) {
        var eachPackage = packagesBeforeSync[t];
        console.log(eachPackage)
        var packageName = eachPackage.addOnName;
        var packageService = eachPackage.service;
        if (rowName == packageService) {
          namesToAdd.push(packageService);
          console.log(namesToAdd)
        }
      }
    }
  }

  deleteSelected = () => {
    const { selected, data } = this.state;
    for (const i in selected) {
      let deleteServ = selected[i];
      for (const t in data) {
        let dataServ = data[t];
        if (dataServ.id === deleteServ) {
          //console.log(dataServ.uniqueID);
          API.deleteService(dataServ.uniqueID);
        }
      }
    }
  }
  
  filterServices = event => {
    //event.preventDefault();
    let filteredRows = [];
    //console.log(event.target.value)
    var lowerInput = (event.target.value).toLowerCase();
    let searchCriteria = this.state.filteredServices.filter(s => s.includes(lowerInput));
    //console.log("Names that should be here " + searchCriteria)
    let beforeFilter = this.state.originaldata;
    //console.log("Services Beginning" + beforeFilter.length)
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
    this.getServices();
    this.getPackages();
    //this.syncPackagesAndServices();
    if (!this.pollInterval) {
      this.pollInterval = 2000
    } 
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.tableWrapper}>
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
                      <IconButton component={Link} to={{pathname: '/admin/' + n.uniqueID + '/editService', state: {selectedName: n.name, selectedDesc: n.description, selectedPrice: n.price, selectedWeb: n.website, selectedStandard: n.channels, selectedPackages: n.packages, selectedDvr: n.dvr, selectedNumDev: n.devices}}} aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.description}</TableCell>
                    <TableCell>{n.price}</TableCell>
                    <TableCell>{n.channels + ""}</TableCell>
                    <TableCell>{n.packages + ""}</TableCell>
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
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
    );
  }
}

ServiceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceTable);