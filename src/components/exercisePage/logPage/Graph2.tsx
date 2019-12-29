import React, { Component } from 'react'
import 'frappe-charts/dist/frappe-charts.min.css'
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
import { getGraphData } from './GraphUtils';
import { IExercise}  from '../../../model/ExerciseModel';
import Typography from '@material-ui/core/Typography';
import './Graph2.css';

interface Graph2Props {
    exercise: IExercise;
    noDataMsg?: string;
}

export default class Graph2 extends Component<Graph2Props> {
    chart: any = null;
    graph: any = null;
    componentDidMount() {
        // const { data, onSelect } = this.props;
        const { exercise } = this.props;
        const { series = [] } = exercise;
        if (series.length > 0) {
            const { labels, reps, weights } = getGraphData(series);
            const title = "History";
            this.graph = new Chart(this.chart, {
            title,
            colors: ['#7cd6fd', '#743ee2'],
            // axisOptions: {{ xAxisMode: "span", yAxisMode: "span", xIsSeries: 1 }}
            data: {
                labels,
                datasets: [
                    { name: 'Reps', type: "line",
                    values: reps  }, 
                {name: 'Weights', values: weights}]
            },
            type: 'line',
            height: 250,
            is_navigable:  true
        });
        }
    //   if (onSelect) {
    //     this.graph.parent.addEventListener("data-select", onSelect);
    //   }
    }
    render() {
        const { exercise, noDataMsg } = this.props;
        const { series = [] } = exercise;
        if (series.length === 0) {
            return (<Typography className='elem-list' variant="caption" display="block" gutterBottom>
            {noDataMsg || 'No history available'}
          </Typography>);
          }
        return ( <div ref={chart => (this.chart = chart)} />)
    }
}
