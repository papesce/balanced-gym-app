import React, { Component } from "react";
import { IExercise, ISerie } from "balanced-gym-model";
import ElemPage, { IElemPage } from "../../generic/pages/ElemPage";
import DetailsPage from "../detailsPage/DetailsPage";
import LogPage from "../logPage/LogPage";
import MusclesPage from "../musclesPage/MusclesPage";
import ExerciseHeader from "./ExerciseHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

interface ExercisePageProps {
  loading?: boolean;
  error?: string;
  exercise?: IExercise;
  handleAddSerie?: (restTime?: number) => void;
  handleEditSerie?: (exerciseId: string, serie: ISerie) => void;
  handleDeleteSerie?: (exerciseId: string, serieId: string) => void;
}

class ExercisePage extends Component<ExercisePageProps> {
  render() {
    const emptyExercise: IExercise = { _id: "", name: "" };
    const {
      exercise = emptyExercise,
      loading,
      error,
      handleAddSerie,
      handleEditSerie,
      handleDeleteSerie
    } = this.props;
    const defaultError = error;
    const detailsPage = <DetailsPage key="1" exercise={exercise} />;
    const musclesPage = <MusclesPage key="2" exercise={exercise} />;
    const logPage = (
      <LogPage
        key="3"
        exercise={exercise}
        secondsLimit={2}
        timerLimit={60*60}
        handleAddSerie={handleAddSerie}
        handleEditSerie={handleEditSerie}
        handleDeleteSerie={handleDeleteSerie}
      />
    );
    const pages: IElemPage[] = [
      { name: "Log", page: logPage },
      { name: "Details", page: detailsPage },
      { name: "Muscles", page: musclesPage }
    ];
    if (loading) {
      return <CircularProgress className="target-list" />;
    }
    if (defaultError) {
      return (
        <Typography
          className="elem-list"
          variant="caption"
          display="block"
          gutterBottom
        >
          {defaultError}
        </Typography>
      );
    }
    return (
      <>
        <ExerciseHeader exercise={exercise} />
        <ElemPage pages={pages} />
      </>
    );
  }
}

export default ExercisePage;
