import React, { Component } from 'react';
import ReactFrappeChart from "react-frappe-charts";
import { IExercise}  from '../../../model/ExerciseModel';
import { getGraphData } from './GraphUtils';
import Typography from '@material-ui/core/Typography';
import './Graph.css';

interface GraphProps {
  exercise: IExercise;
  noDataMsg?: string;
  handleSelected?: (index: number) => void;
}

export default class Graph extends Component<GraphProps> {
  onDataSelect = (evt: any) => {
    // console.log(evt.index, evt.label);
    const { handleSelected, exercise } = this.props;
    const { series = [] } = exercise;
    let index: number = 0;
    if (series.length > 0) index = series.length - evt.index - 1; 
    handleSelected && handleSelected(index);
  }  
  render() {
      const { exercise, noDataMsg } = this.props;
      const { series = [] } = exercise;
      const { labels, reps, weights } = getGraphData(series);
      const title = "History";
      if (series.length === 0) {
        return (<Typography className='elem-list' variant="caption" display="block" gutterBottom>
        {noDataMsg || 'No history available'}
      </Typography>);
      }
        return (<div className='chart-container'>
            <ReactFrappeChart
            title={title}
      type="line"
      colors={["#21ba45"]}
      axisOptions={{ xAxisMode: "span", yAxisMode: "span", xIsSeries: 1 }}
      height={250}
      data={{
        labels,
        datasets: [
          { name: 'Reps', values: reps  }, 
          { name: 'Weight', values: weights}
        ]
        }
      }
      lineOptions={ {dotSize: 5,
         hideLine: 0, hideDots:0, 
         heatline : 0, 
         regionFill: 1, areaFill:0} }
      isNavigable={true}
      maxSlices={5}
      onDataSelect={this.onDataSelect}
    />
    </div>
        )
    }
}
