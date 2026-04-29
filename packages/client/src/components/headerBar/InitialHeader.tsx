import React from 'react'
import Header from './Header';
import Button from '@mui/material/Button';

interface InitialHeaderProps {
  handleLogout: () => void;
}

const InitialHeader: React.FC<InitialHeaderProps> = ({ handleLogout }) => {
    const rightComponent = <Button onClick={handleLogout} color="inherit">Logout</Button>;
    return <Header rightComponent={rightComponent} />;
};

export default InitialHeader;
