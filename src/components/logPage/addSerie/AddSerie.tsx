import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import TimerOffIcon from "@material-ui/icons/TimerOff";
// import TimerIcon from "@material-ui/icons/Timer";
// import { Tooltip } from "@material-ui/core";
import { ISerie } from "../../../model/SerieModel";
import {
  millisToMinutesAndSeconds,
  secondsToNow
} from "../../../utils/dateUtils";
import Typography from "@material-ui/core/Typography";
import "./AddSerie.css";

const DEFAULT_TIMER_LIMIT: number = 5 * 60; //5 minutes

interface AddSerieProps {
  lastSerie?: ISerie;
  handleLogNewSerie?: (restTime?: number) => void;
  timerLimit?: number;
}

interface AddSerieState {
  timerTime: number;
  startTime: number;
  showTimer: boolean;
}

// const formatTime = (min: number, sec: number) => {
//   const minutes: string = `${min}`;
//   const seconds: string = `${sec < 10 ? "0" : ""}${sec}`;
//   return minutes + ":" + seconds;
// };

// const millisToMinutesAndSeconds = (millis: number) => {
//   const minutes: number = Math.floor(millis / 60000);
//   const seconds: number = Math.trunc((millis % 60000) / 1000);
//   return formatTime(minutes, seconds);
// };

const secondsToNowSerie = (serie?: ISerie) => {
  let result: number = -1;
  if (serie && serie.createdAt) {
    result = secondsToNow(serie.createdAt);
  }
  return result;
};

const isInRange = (secs: number, limit: number) => {
  return secs >= 0 && secs <= limit;
};

export default class AddSerie extends Component<AddSerieProps, AddSerieState> {
  timer: any;
  _isMounted = false;
  constructor(props: AddSerieProps) {
    super(props);
    const { lastSerie, timerLimit = DEFAULT_TIMER_LIMIT } = this.props;
    const seconds = secondsToNowSerie(lastSerie);
    const initialTimerTime: number = seconds * 1000;
    const showTimer: boolean =
      lastSerie !== undefined && isInRange(seconds, timerLimit);
    this.state = {
      timerTime: initialTimerTime,
      startTime: Date.now() - initialTimerTime,
      showTimer
    };
    this.timer = null;
  }
  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };
  createTimer = () => {
    if (!this.timer) this.timer = setInterval(this.increaseTimerTime, 1000);
  };
  increaseTimerTime = () => {
    const { timerLimit = DEFAULT_TIMER_LIMIT } = this.props;
    this._isMounted &&
      this.setState(prevState => {
        const { startTime } = prevState;
        const timerTime = Date.now() - startTime;
        if (timerTime >= timerLimit * 1000) {
          this.stopTimer();
          return { ...prevState, timerTime, showTimer: false };
        } else return { ...prevState, timerTime };
      });
  };
  componentDidMount = () => {
    this._isMounted = true;
    const { showTimer = false } = this.state;
    if (showTimer) this.createTimer();
  };
  componentWillUnmount = () => {
    this._isMounted = false;
  };
  handleAddSerie = () => {
    const { handleLogNewSerie } = this.props;
    const { timerTime } = this.state;
    this.stopTimer();
    if (timerTime === 0) handleLogNewSerie && handleLogNewSerie();
    else handleLogNewSerie && handleLogNewSerie(Math.round(timerTime / 1000));
  };
  getShowTimer = (serie?: ISerie) => {};
  render() {
    const { timerTime, showTimer } = this.state;
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
            onClick={this.handleAddSerie}
          >
            Log New Serie
          </Button>
        </div>
      </div>
    );
  }
}
