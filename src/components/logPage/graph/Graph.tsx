import React, { Component } from "react";
import ReactFrappeChart from "../../generic/chart/FappeChart";
import { ISerie } from "../../../model/SerieModel";
import { getGraphData } from "./GraphUtils";
import Typography from "@material-ui/core/Typography";
import "./Graph.css";

interface SeriesGraphProps {
  series: ISerie[];
  noDataMsg?: string;
  isNavigable?: boolean;
  handleSelected?: (serie: ISerie, serieIndex?: number) => void;
  handleGraphClick?: () => void;
}

export default class SeriesGraph extends Component<SeriesGraphProps> {
  onDataSelect = (evt: any) => {
    // console.log(evt.index, evt.label);
    const { handleSelected, series = [] } = this.props;
    let index: number = 0;
    if (series.length > 0) index = series.length - evt.index - 1;
    handleSelected && handleSelected(series[index], index);
  };
  render() {
    const { series = [], noDataMsg, isNavigable = false, handleGraphClick } = this.props;
    if (series.length === 0) {
      return (
        <Typography
          className="elem-list"
          variant="caption"
          display="block"
          gutterBottom
        >
          {noDataMsg || "No history available"}
        </Typography>
      );
    }
    const { labels, reps, weights } = getGraphData(series);
    return (
        <div className="graph-chart-container" onClick={handleGraphClick}>
        <ReactFrappeChart
          title={"History"}
          type="line"
          colors={["#7cd6fd", "#743ee2"]}
          axisOptions={{ xAxisMode: "span", yAxisMode: "tick", xIsSeries: 1 }}
          height={250}
          data={{
            labels,
            datasets: [
              { name: "Reps", values: reps },
              { name: "Weight", values: weights }
            ],
            yRegions: [
              {
                label: "",
                start: 5,
                end: 12,
                options: { labelPos: "left" }
              }
            ]
          }}
          lineOptions={{
            dotSize: 5,
            hideLine: 0,
            hideDots: 0,
            heatline: 0,
            regionFill: 0,
            areaFill: 0
          }}
          isNavigable={isNavigable}
          valuesOverPoints={1}
          onDataSelect={this.onDataSelect}
        />
        </div>
    );
  }
}
