import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { ISerie } from "balanced-gym-model";
import {
  millisToMinutesAndSeconds,
  secondsToNow
} from "../../../utils/dateUtils";
import Typography from "@material-ui/core/Typography";
import "./AddSerie.css";

const DEFAULT_TIMER_LIMIT: number = 5 * 60; //5 minutes

interface AddSerieProps {
  lastCreationDate?: string;
  handleLogNewSerie?: (restTime?: number) => void;
  timerLimit?: number;
}

const secondsToNowSerie = (createdAt?: string) => {
  let result: number = -1;
  if (createdAt) {
    result = secondsToNow(createdAt);
  }
  return result;
};

const isInRange = (secs: number, limit: number) => {
  return secs >= 0 && secs <= limit;
};

const AddSerie: React.FC<AddSerieProps> = ({
  lastCreationDate,
  handleLogNewSerie,
  timerLimit = DEFAULT_TIMER_LIMIT
}) => {
  const seconds = secondsToNowSerie(lastCreationDate);
  const initialTimerTime: number = seconds * 1000;
  const initialShowTimer: boolean =
    lastCreationDate !== undefined && isInRange(seconds, timerLimit);

  const [timerTime, setTimerTime] = useState(initialTimerTime);
  const [startTime] = useState(Date.now() - initialTimerTime);
  const [showTimer, setShowTimer] = useState(initialShowTimer);
  const timerRef = useRef<any>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (showTimer) {
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= timerLimit * 1000) {
          stopTimer();
          setTimerTime(elapsed);
          setShowTimer(false);
        } else {
          setTimerTime(elapsed);
        }
      }, 1000);
    }
    return () => {
      stopTimer();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddSerie = () => {
    stopTimer();
    if (timerTime === 0) handleLogNewSerie && handleLogNewSerie();
    else handleLogNewSerie && handleLogNewSerie(Math.round(timerTime / 1000));
  };

  return (
    <div className="add-serie-container">
      {showTimer && (
        <div className="add-serie-rest-time">
          <Typography variant="overline">Rest Time: </Typography>
          <Typography className="add-serie-rest-timer" variant="overline">
            {millisToMinutesAndSeconds(timerTime)}
          </Typography>
        </div>
      )}
      <div
        className={
          showTimer ? "add-serie-log-button" : "add-serie-log-button-center"
        }
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSerie}
        >
          Log New Serie
        </Button>
      </div>
    </div>
  );
};

export default AddSerie;
