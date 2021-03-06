import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineList from '../components/lists/routineList/RoutineList';
import { IRoutine } from 'balanced-gym-model';
import {  IRoutinesState } from '../redux/reducer.routines';
import { loadRoutines } from '../redux/actions.routines';
import { withRouter } from "react-router";
import InitialHeader from '../components/headerBar/InitialHeader';

interface RoutineProps {
    routinesState?: IRoutinesState;
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
        return (<>
           <InitialHeader handleLogout={() => {}} />
           <RoutineList loading={routinesState.loading}
             error={routinesState.error} 
             routines={routinesState.routines}
             onClick={this.onRoutineClick}
             />
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    // console.log('state changed:', state)
    return {
        routinesState: state.routinesState
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadRoutines: () => dispatch(loadRoutines())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routines))
