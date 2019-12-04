import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuscleGroupList from '../components/MuscleGroupList';
import { IRoutine } from '../model/RoutineModel';
import { IMuscleGroup } from '../model/MuscleGroupModel';
import { loadRoutine } from '../redux/actions.routine';
import { withRouter } from "react-router";

interface RoutineProps {
    loading: boolean;
    error: string;
    routine: IRoutine;
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
        const { loading, error, routine } = this.props;
        return (<>
           <div>Routines / Routine</div>
           <MuscleGroupList loading={loading}
             error={error} 
             routine={routine}
             onClick={this.onRoutineClick}
             />
             </>
        )
    }
}

const mapStateToProps = (state: any) => {
    // console.log('state changed:', state)
    const { loading, error, routine = {} } = state.routineState;
    return {
        loading, error, routine
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadRoutine: (routineId: string) => dispatch(loadRoutine(routineId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routine))
