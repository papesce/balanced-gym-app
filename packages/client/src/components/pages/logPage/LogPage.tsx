import React, { Component } from "react";
import { IExercise } from "../../../model/ExerciseModel";
import { ISerie } from "../../../model/SerieModel";
import Graph from "../../logPage/graph/Graph";
import { secondsToNow } from "../../../utils/dateUtils";
import Navigation from "../../logPage/navigation/Navigation";
import GraphBar from "../../logPage/graph/GraphBar";
import EditSerie from "../../logPage/editSerie/EditSerie";
import AddSerie from '../../logPage/addSerie/AddSerie';
import "./LogPage.css";

const LOG_PAGE_DEFAULT_NAVIGABLE_LIMIT = 5;  //5 seconds

interface LogProps {
  exercise: IExercise;
  handleAddSerie?: (restTime?: number) => void;
  handleEditSerie?: (exerciseId: string, serie: ISerie) => void;
  handleDeleteSerie?: (exerciseId: string, serieId: string) => void;
  secondsLimit?: number; // hack: seconds to show navigable
  timerLimit?: number;
}

interface LogState {
  serieIndex: number;
  subSeries: ISerie[];
  navigable: boolean;
  more: boolean;
  
}

export default class LogPage extends Component<LogProps, LogState> {
  constructor(props: LogProps) {
    super(props);
    const { exercise, secondsLimit = LOG_PAGE_DEFAULT_NAVIGABLE_LIMIT } = this.props;
    const { series = [] } = exercise;
    let isNavigable = false;
    if (series.length > 0) {
      const lastSerie: ISerie = series[0];
      if (lastSerie.createdAt) {
        isNavigable = secondsToNow(lastSerie.createdAt) <= secondsLimit;
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
    this.setState({ navigable: false });
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
  handleAddSerie = (restTime?: number) => {
    const { handleAddSerie } = this.props;
    handleAddSerie && handleAddSerie(restTime);
  }
  render() {
    const { exercise, timerLimit } = this.props;
    const { series = [], lastCreationDate } = exercise;
    const { serieIndex, navigable, more, subSeries } = this.state;
    const serie: ISerie = subSeries[serieIndex];
    const showNav: boolean = !more && series.length > 6;
    const isEditable: boolean = !navigable && series.length > 0;
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
          edit={isEditable}
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
        {navigable && <EditSerie
          key={serie._id}
          initialSerie={serie}
          handleDone={this.handleSerieDone}
          handleDelete={this.handleSerieDelete}
          handleCancel={this.handleEditSerieCancel} 
        />}
        {!navigable && <AddSerie 
          key={serie ? serie._id : 'new'}
          lastCreationDate={lastCreationDate}
          handleLogNewSerie={this.handleAddSerie}
          timerLimit={timerLimit} />
        }        
      </>
    );
  }
}
