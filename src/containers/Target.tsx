import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExerciseList from '../components/exerciseList/ExerciseList';
import { ITarget } from '../model/TargetModel';
import { IExercise } from '../model/ExerciseModel';
import { loadTarget } from '../redux/actions.target';
import { withRouter } from "react-router";

interface TargetProps {
    loading: boolean;
    error: string;
    target: ITarget;
    loadTarget?: (routineId: string, muscleGroupId: string, targetId: string) => {};
    match?: any;
    history?: any;
}

export class Target extends Component<TargetProps> {
    componentDidMount = () => {
       const { loadTarget, 
        match : { params : { routineId, muscleGroupId, targetId }} } = this.props;
          loadTarget && loadTarget(routineId, muscleGroupId, targetId);
    }
    onExerciseClick = (exercise: IExercise) => {
      const { history } = this.props;
      history.push(`/exercise/${exercise._id}`);
    }
    render() {
        const { loading, error, target } = this.props;
        return (<>
           <ExerciseList loading={loading}
             error={error} 
             target={target}
             onClick={this.onExerciseClick}
             />
             </>
        )
    }
}

const mapStateToProps = (state: any) => {
    // console.log('state changed:', state)
    const { loading, error, target = {} } = state.targetState;
    return {
        loading, error, target
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadTarget: (routineId: string, muscleGroupId: string, targetId: string) =>
            dispatch(loadTarget(routineId, muscleGroupId, targetId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Target))
