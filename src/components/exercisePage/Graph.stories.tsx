import React from 'react';
import Graph from './Graph';
import { IExercise } from '../../model/ExerciseModel';
import { series1, series2, series8 } from '../../model/SerieModel.sample';

export default {
    title: 'exercisePage/Graph',
  };

const sampleExercise: IExercise = {
  _id: '',
  name: 'Chest',
  series: []
}

const sampleExercise1: IExercise = {
  _id: '',
  name: 'Chest',
  series: series1
}

const sampleExercise2: IExercise = {
  _id: '',
  name: 'Chest',
  series: series2
}   
  
const sampleExercise8: IExercise = {
  _id: '',
  name: 'Chest',
  series: series8
} 

export const graphSeries0 = () => 
      <Graph exercise={sampleExercise} />;    
export const graphSeries1 = () => 
      <Graph exercise={sampleExercise1} />; 
export const graphSeries2 = () => 
      <Graph exercise={sampleExercise2} />; 
export const graphSeries8 = () => 
      <Graph exercise={sampleExercise8} />; 