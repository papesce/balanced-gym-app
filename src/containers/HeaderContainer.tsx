import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';

interface HeaderContainerProps {
    history?: any
}

 class HeaderContainer extends Component<HeaderContainerProps> {
    handleClick = () => {
        const { history } = this.props;
        history.push('/');
    }
    render() {
        return (
            <Header handleClick={this.handleClick} />
        )
    }
}

export default withRouter(connect(null)(HeaderContainer));
