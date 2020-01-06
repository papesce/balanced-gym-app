import React, { Component } from 'react'
import Header from './Header';
import IconButton from "@material-ui/core/IconButton";
// import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface BackHeaderProps {
    handleBack : () => void;
}

export default class BackHeader extends Component<BackHeaderProps> {

    render() {
        const { handleBack } = this.props;
        const leftComponent = (
            <IconButton onClick={handleBack} edge="start" color="inherit">
              <ArrowBackIosIcon/>
            </IconButton>
          );
        return (
            <Header leftComponent={leftComponent}></Header>
        )
    }
}
