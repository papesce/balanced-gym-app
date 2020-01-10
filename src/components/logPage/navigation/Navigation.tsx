import React, { Component } from "react";
import "./Navigation.css";
import TablePagination from "@material-ui/core/TablePagination";
import { ISerie } from "../../../model/SerieModel";
import { NavigationActions } from './NavigationActions';
import IconButton from "@material-ui/core/IconButton";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

interface NavigationProps {
  series: ISerie[];
  handleSeriesChange?: (series:ISerie[]) => void;
  handleCancel?: () => void;
}

interface NavigationState {
  pointsPerScreen: number;
  screen: number;
}

export default class Navigation extends Component<
  NavigationProps,
  NavigationState
> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = { pointsPerScreen: 6, screen: 0 };
  }
  handleSeriesChange = (page: number) => {
    const { pointsPerScreen } = this.state;
    const { handleSeriesChange, series } = this.props;
    // const count = series.length;
    const from = page * pointsPerScreen + 1;
    const to = (page + 1) * pointsPerScreen;
    console.log('hsc:', from, to)
    handleSeriesChange && 
      handleSeriesChange(series.slice(from-1, to));
  }
  handleChangePage = (evt: any, page: number) => {
    this.setState({ screen: page }, () =>
    this.handleSeriesChange(page));
  };
  handlePPPChange = (evt: any) => {
    const pps = parseInt(evt.target.value);
    // console.log('pppchange', page)
    this.setState({ pointsPerScreen: pps, screen: 0}, 
     () => {this.handleSeriesChange(0)}  
    );
    
  };
  getRowsPerPageOptions = () => {
    const { series = [] } = this.props;
    const size = series.length;
    if (size <= 8) {
      return [6, { label: "All", value: size }];
    }
    if (series.length <= 10) {
      return [6, 8, { label: "All", value: size }];
    }
    return [6, 8, 10, { label: "All", value: size }];
  };
  getDisplayedRows = (nav: any) => {
    const { from, to, count } = nav;
    const newFrom: number = count - to + 1;
    const newTo: number = count-from + 1;
    return `${newFrom}-${newTo} of ${count}`;
  };
  
  render() {
    const { series = [], handleCancel } = this.props;
    if (series.length <= 6) {
      return null;
    }
    const { pointsPerScreen, screen } = this.state;
    // const screens: number = Math.ceil(series.length / pointsPerScreen);
    // console.log('screens', screens);
    // console.log('screen', screen)
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <div className="navigation-container">
        <IconButton className={"navigation-icon-button"} size="small" onClick={handleCancel}>
          <CancelOutlinedIcon fontSize="inherit" />
        </IconButton>
        <TablePagination
          className="navigation-table-pagination"
          component="div"
          labelRowsPerPage={"Points:"}
          rowsPerPageOptions={this.getRowsPerPageOptions()}
          // backIconButtonProps={{disabled: screen === screens - 1}}
          // nextIconButtonProps={{disabled: screen === screens -1}}
          // colSpan={3}
          labelDisplayedRows={this.getDisplayedRows}
          count={series.length}
          rowsPerPage={pointsPerScreen}
          page={screen}
          SelectProps={{
            native: true
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handlePPPChange}
          ActionsComponent={NavigationActions}
        />
      </div>
    );
  }
}
