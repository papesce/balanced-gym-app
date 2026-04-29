import React, { useState } from "react";
import { IExercise, ISerie } from "balanced-gym-model";
import Graph from "../../logPage/graph/Graph";
import { secondsToNow } from "../../../utils/dateUtils";
import Navigation from "../../logPage/navigation/Navigation";
import GraphBar from "../../logPage/graph/GraphBar";
import EditSerie from "../../logPage/editSerie/EditSerie";
import AddSerie from '../../logPage/addSerie/AddSerie';
import "./LogPage.css";

const LOG_PAGE_DEFAULT_NAVIGABLE_LIMIT = 5;

interface LogProps {
  exercise: IExercise;
  handleAddSerie?: (restTime?: number) => void;
  handleEditSerie?: (exerciseId: string, serie: ISerie) => void;
  handleDeleteSerie?: (exerciseId: string, serieId: string) => void;
  secondsLimit?: number;
  timerLimit?: number;
}

const LogPage: React.FC<LogProps> = ({
  exercise,
  handleAddSerie: onAddSerie,
  handleEditSerie,
  handleDeleteSerie,
  secondsLimit = LOG_PAGE_DEFAULT_NAVIGABLE_LIMIT,
  timerLimit,
}) => {
  const { series = [], lastCreationDate } = exercise;

  const computeInitialNavigable = () => {
    if (series.length > 0) {
      const lastSerie: ISerie = series[0];
      if (lastSerie.createdAt) {
        return secondsToNow(lastSerie.createdAt) <= secondsLimit;
      }
    }
    return false;
  };

  const [serieIndex, setSerieIndex] = useState(0);
  const [navigable, setNavigable] = useState(computeInitialNavigable);
  const [more, setMore] = useState(series.length > 6);
  const [subSeries, setSubSeries] = useState<ISerie[]>(series.slice(0, 5));

  const handleGraphSelected = (index: number) => {
    setSerieIndex(index);
  };

  const handleSerieDelete = (serieId: string) => {
    handleDeleteSerie && handleDeleteSerie(exercise._id, serieId);
  };

  const handleSerieDone = (editedSerie: ISerie) => {
    const { weight, reps, _id } = editedSerie;
    if (handleEditSerie) {
      handleEditSerie(exercise._id, { _id, weight, reps });
    }
    setNavigable(false);
  };

  const handleEditClick = () => {
    setNavigable(true);
    setSerieIndex(0);
  };

  const handleMoreClick = () => {
    setMore(false);
    setSerieIndex(0);
  };

  const handleSeriesChange = (newSubSeries: ISerie[]) => {
    setSubSeries(newSubSeries);
    setNavigable(false);
  };

  const handleEditSerieCancel = () => {
    setNavigable(false);
  };

  const handleMoreCancel = () => {
    setMore(true);
  };

  const handleAddSerie = (restTime?: number) => {
    onAddSerie && onAddSerie(restTime);
  };

  const serie: ISerie = subSeries[serieIndex];
  const showNav: boolean = !more && series.length > 6;
  const isEditable: boolean = !navigable && series.length > 0;

  return (
    <>
      {showNav && (
        <Navigation
          series={series}
          handleSeriesChange={handleSeriesChange}
          handleCancel={handleMoreCancel}
        />
      )}
      {!showNav && <div className='log-page-spacer'></div>}
      <GraphBar
        edit={isEditable}
        more={more}
        handleEditClick={handleEditClick}
        handleMoreClick={handleMoreClick}
      />
      <Graph
        key={navigable ? "1" : "0"}
        series={subSeries}
        handleSelected={handleGraphSelected}
        isNavigable={navigable}
      />
      {navigable && (
        <EditSerie
          key={serie._id}
          initialSerie={serie}
          handleDone={handleSerieDone}
          handleDelete={handleSerieDelete}
          handleCancel={handleEditSerieCancel}
        />
      )}
      {!navigable && (
        <AddSerie
          key={serie ? serie._id : 'new'}
          lastCreationDate={lastCreationDate}
          handleLogNewSerie={handleAddSerie}
          timerLimit={timerLimit}
        />
      )}
    </>
  );
};

export default LogPage;
