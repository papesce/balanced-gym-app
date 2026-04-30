import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface NavigationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, page: number) => void;
}

export const NavigationActions: React.FC<NavigationActionsProps> = props => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  return (
    <Box sx={{ flexShrink: 0, marginLeft: 2.5 }}>
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
    </Box>
  );
};
