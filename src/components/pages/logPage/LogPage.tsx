import React, { Component } from "react";
import { IExercise } from "../../../model/ExerciseModel";
import { ISerie } from "../../../model/SerieModel";
import Graph from "../../logPage/graph/Graph";
import DeletableSerie from "../../logPage/deletableSerie/DeletableSerie";
import { isToday } from "../../../utils/dateUtils";
import Navigation from "../../logPage/navigation/Navigation";
import { millisToMinutesAndSeconds } from "../../../utils/dateUtils";
import GraphBar from "../../logPage/graph/GraphBar";
import "./LogPage.css";

interface LogProps {
  exercise: IExercise;
  handleEditSerie?: (exerciseId: string, serie: ISerie) => void;
  handleDeleteSerie?: (exerciseId: string, serieId: string) => void;
}

interface LogState {
  serieIndex: number;
  subSeries: ISerie[];
  navigable: boolean;
  more: boolean;
}

const computeRestTime = (series: ISerie[], serie: ISerie) => {
  const index: number = series.findIndex(s => s._id === serie._id);
  console.log("rest index", index);
  if (index < series.length - 1) {
    const prevSerie: ISerie = series[index + 1];
    if (prevSerie.createdAt && serie.createdAt) {
      const ms1: number = new Date(prevSerie.createdAt).getTime();
      const ms2: number = new Date(serie.createdAt).getTime();
      const diff: number = ms2 - ms1;
      console.log("ms1, ms2, diff:", ms1, ms2, diff);
      if (diff > 0 && diff < 1000 * 60 * 5) {
        return millisToMinutesAndSeconds(diff);
      }
    }
  }
  return "";
};

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
    this.state = {
      serieIndex: 0,
      navigable: isNavigable,
      more: series.length > 6,
      subSeries: series.slice(0, 5)
    };
  }

  handleGraphSelected = (serieIndex: number) => {
    this.setState({ serieIndex: serieIndex });
  };
  handleSerieDelete = (serieId: string) => {
    const { handleDeleteSerie, exercise } = this.props;
    handleDeleteSerie && handleDeleteSerie(exercise._id, serieId);
  };
  handleSerieDone = (editedSerie: ISerie) => {
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
  handleEditClick = () => {
    this.setState({ navigable: true, serieIndex: 0 });
  };
  handleMoreClick = () => {
    this.setState({ more: false, serieIndex: 0 });
  };
  handleSeriesChange = (subSeries: ISerie[]) => {
    // console.log('handleSeriesChange');
    this.setState({ subSeries, navigable: false });
  };
  handleEditSerieCancel = () => {
    this.setState({ navigable: false });
  };
  handleMoreCancel = () => {
    this.setState({ more: true });
  }
  render() {
    const { exercise } = this.props;
    const { series = [] } = exercise;
    const { serieIndex, navigable, more, subSeries } = this.state;
    const serie = subSeries[serieIndex];
    const restTime = computeRestTime(series, serie);
    const showNav = !more && series.length > 6;
    return (
      <>
        {(showNav &&
          <Navigation
            series={series}
            handleSeriesChange={this.handleSeriesChange}
            handleCancel={this.handleMoreCancel}
          ></Navigation>
        )}
         {!showNav && <div className='log-page-spacer'></div>}
        <GraphBar
          edit={!navigable}
          more={more}
          handleEditClick={this.handleEditClick}
          handleMoreClick={this.handleMoreClick}
        ></GraphBar>
        <Graph
          key={navigable ? "1" : "0"}
          series={subSeries}
          handleSelected={this.handleGraphSelected}
          isNavigable={navigable}
        ></Graph>

        {navigable && serie && (
          <DeletableSerie
            key={serie._id}
            initialSerie={serie}
            handleDone={this.handleSerieDone}
            handleDelete={this.handleSerieDelete}
            restTime={restTime}
            handleCancel={this.handleEditSerieCancel}
          ></DeletableSerie>
        )}
      </>
    );
  }
}
