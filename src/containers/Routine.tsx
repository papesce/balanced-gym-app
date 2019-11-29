import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuscleGroupList from '../components/MuscleGroupList';
import { IRoutineState } from '../model/RoutineModel';
import { IMuscleGroup } from '../model/MuscleGroupModel';
import { loadRoutine } from '../redux/actions';
import { withRouter } from "react-router";

interface RoutineProps {
    routineState?: IRoutineState;
    loadRoutine?: (routineId: string) => {};
    match?: any;
    history?: any;
}

export class Routine extends Component<RoutineProps> {
    componentDidMount = () => {
       const { loadRoutine, match : { params : { routineId }} } = this.props;
       loadRoutine && loadRoutine(routineId);
    }
    onRoutineClick = (muscleGroup: IMuscleGroup) => {
        const { history,  match : { params : { routineId }} } = this.props;
        history.push(`/routine/${routineId}/muscleGroup/${muscleGroup._id}`);
    }
    render() {
        const { routineState = {} } = this.props;
        return (
           <MuscleGroupList loading={routineState.loading}
             error={routineState.error} 
             routine={routineState.routine}
             onClick={this.onRoutineClick}
             />
        )
    }
}

const mapStateToProps = (state: any) => {
    // console.log('state changed:', state)
    return {
        routineState: state.routineState
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadRoutine: (routineId: string) => dispatch(loadRoutine(routineId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routine))
