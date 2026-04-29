import React from 'react'
import Header from './Header';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface BackHeaderProps {
    handleBack: () => void;
}

const BackHeader: React.FC<BackHeaderProps> = ({ handleBack }) => {
    const leftComponent = (
        <IconButton onClick={handleBack} edge="start" color="inherit">
          <ArrowBackIosIcon/>
        </IconButton>
    );
    return <Header leftComponent={leftComponent} />;
};

export default BackHeader;
