import React, { useState } from "react";
import "./Navigation.css";
import TablePagination from "@material-ui/core/TablePagination";
import { ISerie } from "balanced-gym-model";
import { NavigationActions } from './NavigationActions';
import IconButton from "@material-ui/core/IconButton";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

interface NavigationProps {
  series: ISerie[];
  handleSeriesChange?: (series:ISerie[]) => void;
  handleCancel?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  series = [],
  handleSeriesChange,
  handleCancel
}) => {
  const [pointsPerScreen, setPointsPerScreen] = useState(6);
  const [screen, setScreen] = useState(0);

  const computeSeriesChange = (page: number, pps: number) => {
    const from = page * pps + 1;
    const to = (page + 1) * pps;
    console.log('hsc:', from, to)
    handleSeriesChange &&
      handleSeriesChange(series.slice(from-1, to));
  };

  const handleChangePage = (evt: any, page: number) => {
    setScreen(page);
    computeSeriesChange(page, pointsPerScreen);
  };

  const handlePPPChange = (evt: any) => {
    const pps = parseInt(evt.target.value);
    setPointsPerScreen(pps);
    setScreen(0);
    computeSeriesChange(0, pps);
  };

  const getRowsPerPageOptions = () => {
    const size = series.length;
    if (size <= 8) {
      return [6, { label: "All", value: size }];
    }
    if (series.length <= 10) {
      return [6, 8, { label: "All", value: size }];
    }
    return [6, 8, 10, { label: "All", value: size }];
  };

  const getDisplayedRows = (nav: any) => {
    const { from, to, count } = nav;
    const newFrom: number = count - to + 1;
    const newTo: number = count-from + 1;
    return `${newFrom}-${newTo} of ${count}`;
  };

  if (series.length <= 6) {
    return null;
  }

  return (
    <div className="navigation-container">
      <IconButton className={"navigation-icon-button"} size="small" onClick={handleCancel}>
        <CancelOutlinedIcon fontSize="inherit" />
      </IconButton>
      <TablePagination
        className="navigation-table-pagination"
        component="div"
        labelRowsPerPage={"Points:"}
        rowsPerPageOptions={getRowsPerPageOptions()}
        labelDisplayedRows={getDisplayedRows}
        count={series.length}
        rowsPerPage={pointsPerScreen}
        page={screen}
        SelectProps={{
          native: true
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handlePPPChange}
        ActionsComponent={NavigationActions}
      />
    </div>
  );
};

export default Navigation;
