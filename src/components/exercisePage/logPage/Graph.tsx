import React, { Component } from 'react';
import ReactFrappeChart from "react-frappe-charts";
import { IExercise}  from '../../../model/ExerciseModel';
import { getGraphData } from './GraphUtils';
import './Graph.css';

interface GraphProps {
  exercise: IExercise;
}

export default class Graph extends Component<GraphProps> {
  onDataSelect = (evt: any) => {
    console.log(evt.index, evt.label);
  }  
  render() {
      const { exercise } = this.props;
      const { series = [] } = exercise;
      const { labels, reps, weights } = getGraphData(series);
      const title = "History";
        return (<div className='chart-container'>
            <ReactFrappeChart
            title={title}
      type="line"
      colors={["#21ba45"]}
      axisOptions={{ xAxisMode: "span", yAxisMode: "span", xIsSeries: 1 }}
      height={250}
      data={{
        labels,
        datasets: [{ name: 'Reps', values: reps  }, 
        {name: 'Weights', values: weights}]
      }}
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
