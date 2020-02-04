import React, { Component } from "react";
import { connect } from "react-redux";
import ExerciseList from "../components/lists/exerciseList/ExerciseList";
import { ITarget, IExercise } from "balanced-gym-model";
import { loadTarget } from "../redux/actions.target";
import { withRouter } from "react-router";
import BackHeader from "../components/headerBar/BackHeader";
import { getMuscleGroupURL } from "../utils/routes";

interface TargetProps {
  loading: boolean;
  error: string;
  target: ITarget;
  loadTarget?: (
    routineId: string,
    muscleGroupId: string,
    targetId: string
  ) => {};
  match?: any;
  history?: any;
}

export class Target extends Component<TargetProps> {
  componentDidMount = () => {
    const {
      loadTarget,
      match: {
        params: { routineId, muscleGroupId, targetId }
      }
    } = this.props;
    loadTarget && loadTarget(routineId, muscleGroupId, targetId);
  };
  onExerciseClick = (exercise: IExercise) => {
    const { history } = this.props;
    history.push(`/exercise/${exercise._id}`);
  };
  handleBack = () => {
    const {
      history,
      match: {
        params: { routineId, muscleGroupId }
      }
    } = this.props;
    history.push(getMuscleGroupURL(routineId, muscleGroupId));
  };
  render() {
    const { loading, error, target } = this.props;
    return (
      <>
        <BackHeader handleBack={this.handleBack} />
        <ExerciseList
          loading={loading}
          error={error}
          target={target}
          onClick={this.onExerciseClick}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  // console.log('state changed:', state)
  const { loading, error, target = {} } = state.targetState;
  return {
    loading,
    error,
    target
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadTarget: (routineId: string, muscleGroupId: string, targetId: string) =>
      dispatch(loadTarget(routineId, muscleGroupId, targetId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Target));
