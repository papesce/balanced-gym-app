import React, { Component } from 'react';
import { connect } from 'react-redux';
import TargetList from '../components/TargetList';
import { IMuscleGroup } from '../model/MuscleGroupModel';
import { ITarget } from '../model/TargetModel';
import { loadMuscleGroup } from '../redux/actions.muscleGroup';
import { withRouter } from "react-router";
import ElemPaper from '../components/ElemPaper';

interface MuscleGroupProps {
    loading: boolean;
    error: string;
    muscleGroup: IMuscleGroup;
    loadMuscleGroup?: (routineId: string, muscleGroupId: string) => {};
    match?: any;
    history?: any;
}

export class MuscleGroup extends Component<MuscleGroupProps> {
    componentDidMount = () => {
       const { loadMuscleGroup, match : { params : { routineId, muscleGroupId }} } = this.props;
       loadMuscleGroup && loadMuscleGroup(routineId, muscleGroupId);
    }
    onTargetClick = (target: ITarget) => {
        const { history, match : { params : { routineId, muscleGroupId }} } = this.props;
        history.push(`/routine/${routineId}/muscleGroup/${muscleGroupId}/target/${target._id}`);
    }
    render() {
        const { loading, error, muscleGroup } = this.props;
        // console.log('muscleGroup', muscleGroup);
        return (<>
           <div>Routine: {muscleGroup.routineName}</div>
           <div>Muscle Group: {muscleGroup.name}</div>
           <TargetList loading={loading}
             error={error} 
             muscleGroup={muscleGroup}
             onClick={this.onTargetClick}
             />
             </>
        )
    }
}

const mapStateToProps = (state: any) => {
    // console.log('state changed:', state)
    const { loading, error, muscleGroup = {} } = state.muscleGroupState;
    return {
        loading, error, muscleGroup
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadMuscleGroup: (routineId: string, muscleGroupId: string) =>
         dispatch(loadMuscleGroup(routineId, muscleGroupId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MuscleGroup))
