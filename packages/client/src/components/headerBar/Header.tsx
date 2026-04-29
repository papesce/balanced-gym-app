import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface HeaderProps {
  leftComponent?: any;
  rightComponent?: any;
}

const Header: React.FC<HeaderProps> = ({ leftComponent, rightComponent }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {leftComponent}
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: "none" }}>
              Balanced Gym App
            </Link>
          </Typography>
          <Typography variant="caption" sx={{ flexGrow: 1 }}>
            v{import.meta.env.VITE_APP_VERSION}
          </Typography>
          {rightComponent}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
