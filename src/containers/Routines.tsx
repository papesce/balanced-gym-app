import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineList from '../components/RoutineList';
import { IRoutineState, IRoutine } from '../model/RoutineModel';
import { loadRoutines } from '../redux/actions';
import { withRouter } from "react-router";

interface RoutineProps {
    routinesState?: IRoutineState;
    loadRoutines?: () => {};
    history?: any;
}

export class Routines extends Component<RoutineProps> {
    componentDidMount = () => {
       const { loadRoutines } = this.props;
       loadRoutines && loadRoutines();
    }
    onRoutineClick = (routine: IRoutine) => {
        const { history } = this.props;
        history.push(`/routine/${routine._id}`);
    }
    render() {
        const { routinesState = {} } = this.props;
        return (
           <RoutineList loading={routinesState.loading}
             error={routinesState.error} 
             data={routinesState.data}
             onClick={this.onRoutineClick}
             />
        )
    }
}

const mapStateToProps = (state: any) => {
    console.log('state changed:', state)
    return {
        routinesState: state.routines
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadRoutines: () => dispatch(loadRoutines())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routines))
