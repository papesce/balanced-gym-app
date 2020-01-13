import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DeletableSerie from "../deletableSerie/DeletableSerie";
import { ISerie } from "../../../model/SerieModel";
import { emptySerie } from "../../../model/SerieModel.sample";
import ReactStopwatch from "react-stopwatch";
import "./ActionPanel.css";

export enum ActionPanelStage {
  showAdd,
  showEdit,
  showTimer,
  showNone
}

interface ActionPanelProps {
  stage: ActionPanelStage;
  handleAddSerie?: () => void;
  initialSerie?: ISerie;
  onTimerEnd?: () => void;
  timerLimit?: string;
}

const formatTime = (min: number, sec: number) => {
  const minutes: string = `${min < 10 ? "0" : ""}${min}`;
  const seconds: string = `${sec < 10 ? "0" : ""}${sec}`;
  return minutes + ":" + seconds;
};

export default class ActionPanel extends Component<ActionPanelProps> {
  onTimerEnd = () => {
    const { onTimerEnd } = this.props;
    onTimerEnd && onTimerEnd();
  };
  handleAddSerie = () => {
    const { handleAddSerie } = this.props;
    handleAddSerie && handleAddSerie();
  }
  render() {
    const {
      stage = ActionPanelStage.showNone,
      initialSerie = emptySerie,
      timerLimit = "10:00"
    } = this.props;
    switch (stage) {
      case ActionPanelStage.showAdd:
        return (
          <Button variant="contained" color="primary" onClick={this.handleAddSerie}>
            Add Serie
          </Button>
        );
      case ActionPanelStage.showEdit:
        return <DeletableSerie initialSerie={initialSerie}></DeletableSerie>;
      case ActionPanelStage.showTimer:
        return (
          <>
            <span className="action-panel-timer">
              <ReactStopwatch
                seconds={0}
                minutes={0}
                hours={0}
                limit={`00:${timerLimit}`}
                onCallback={this.onTimerEnd}
                render={(time: any) =>
                  `Rest Time: ( ${formatTime(time.minutes, time.seconds)} )`
                }
              />
            </span>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onTimerEnd}
            >
              Stop Timer
            </Button>
          </>
        );
      default:
        break;
    }
    return null;
  }
}
