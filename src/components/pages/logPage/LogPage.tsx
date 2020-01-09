import React, { Component } from "react";
import { IExercise } from "../../../model/ExerciseModel";
import { ISerie } from "../../../model/SerieModel";
import Graph from "../../logPage/graph/Graph";
import Serie from "../../logPage/deletableSerie/DeletableSerie";
import { isToday } from "../../../utils/dateUtils";
import Typography from "@material-ui/core/Typography";
import { formatDateString } from "../../../utils/dateUtils";
import "./LogPage.css";
import Navigation from "../../logPage/navigation/Navigation";

interface LogProps {
  exercise: IExercise;
  handleEditSerie?: (exerciseId: string, serie: ISerie) => void;
  handleDeleteSerie?: (exerciseId: string, serieId: string) => void;
}

interface LogState {
  serie?: ISerie;
  serieIndex: number;
  subSeries: ISerie[];
  navigable: boolean;
}

const computeRestTime = (series: ISerie[], serieIndex: number) => {
    return '1:05m'
}

export default class LogPage extends Component<LogProps, LogState> {
  constructor(props: LogProps) {
    super(props);
    const { exercise } = this.props;
    const { series = [] } = exercise;
    let isNavigable = false;
    if (series.length > 0) {
      const lastSerie: ISerie = series[0];
      if (lastSerie.createdAt) {
        isNavigable = isToday(new Date(lastSerie.createdAt));
      }
    }
    this.state = { serie: undefined, serieIndex: -1, navigable: isNavigable, subSeries: series.slice(0,5) };
  }

  handleSelected = (serie: ISerie, serieIndex: number = -1) => {
    this.setState({ serie, serieIndex: serieIndex });
  };
  handleDelete = (serieId: string) => {
    const { handleDeleteSerie, exercise } = this.props;
    handleDeleteSerie && handleDeleteSerie(exercise._id, serieId);
  };
  handleDone = (editedSerie: ISerie) => {
    const { exercise, handleEditSerie } = this.props;
    const { weight, reps, _id } = editedSerie;
    if (handleEditSerie) {
      const editedSerie: ISerie = {
        _id,
        weight,
        reps
      };
      handleEditSerie(exercise._id, editedSerie);
    }
  };
  handleGraphClick = () => {
    const { serie } = this.state;
    //todo compute serie using navigation if necesary
    this.setState({ navigable: true });
  };
  handleSeriesChange = (subSeries: ISerie[]) => {
    console.log('handleSeriesChange');
    this.setState({subSeries, navigable: false})
  }
  render() {
    const { exercise } = this.props;
    const { series = [] } = exercise;
    const { serie, serieIndex,  navigable, subSeries } = this.state;
    const restTime = computeRestTime(series, serieIndex);
    return (
      <>
        {series.length > 6 && <Navigation series={series} 
          handleSeriesChange={this.handleSeriesChange}></Navigation>

        }
        <Graph
          key={navigable ? "1" : "0"}
          series={subSeries}
          handleSelected={this.handleSelected}
          handleGraphClick={this.handleGraphClick}
          isNavigable={navigable}
        ></Graph>
        {navigable && serie && (
          <>
            <Typography
              className="log-page-created"
              variant="caption"
              display="block"
              gutterBottom
            >
              Created: {formatDateString(serie.createdAt || "")} 
              {restTime && (<span> ( rest: {restTime} )</span>)}
            </Typography>

            <Serie
              key={serie._id}
              initialSerie={serie}
              handleDone={this.handleDone}
              handleDelete={this.handleDelete}
            ></Serie>
          </>
        )}
      </>
    );
  }
}
