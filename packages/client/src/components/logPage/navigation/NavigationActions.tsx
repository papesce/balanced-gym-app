import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

interface NavigationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: any, page: number) => void;
}

export const NavigationActions: React.FC<NavigationActionsProps> = props => {
  const theme = useTheme();
  const classes = useStyles1(theme);
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleBackButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page === 0}
      >
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
};
