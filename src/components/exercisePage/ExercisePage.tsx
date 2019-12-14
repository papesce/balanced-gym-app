import React, { Component } from 'react'
import { IExercise } from '../../model/ExerciseModel';
import ElemPage, { IElemPage } from './ElemPage';
import DetailsPage from './DetailsPage';
import ExerciseHeader from './ExerciseHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

interface ExercisePageProps {
   loading?: boolean;
   error?: string;
   exercise?: IExercise;
}

class ExercisePage extends Component<ExercisePageProps> {
    render() {
        const emptyExercise: IExercise = {_id:'', name:''}
        const { exercise = emptyExercise, loading, error } = this.props;
         const defaultError = error ? "Error loading exericse" : undefined;
         const detailsPage = <DetailsPage/>;
         const emptyPage = <div></div>
         const pages: IElemPage[] = [
            {name: 'Log', page: emptyPage},
            {name: 'Details', page: detailsPage},
            {name: 'Muscles', page: emptyPage}
          ] 
          if (loading) {
            return  (<CircularProgress  className='target-list'/>);
          }
          if (defaultError) {
            return (<Typography className='elem-list' variant="caption" display="block" gutterBottom>
            {defaultError}
          </Typography>);
          } 
        return (<>
             <ExerciseHeader exercise={exercise} />
             <ElemPage pages={pages}/>
            {/* <div>
                Name: {name}
            </div>
            <div>
                Muscle Group: {muscleGroup.name} 
            </div>
            <div>
                Target: {target.name}
            </div>
            <div>
                Equipment:
            </div>
            <div>
                Last 2/3 Series:
                (r:2, w:10)
                (r:2, w:9)
            </div>
            <div>
                Suggested Serie: (r: 2, w: 15)
            </div>
            <div>
                Routine: {routineId.name}
            </div>     
            <div>
                Add New Serie:
            </div>
            <div>
                Series Count: 12
            </div>
            <div>
                Last Updated:  200 days ago
            </div>
            <div>
                syn:
            </div>
            <div>
                stab:
            </div> */}
            </>
        )
    }
}

export default ExercisePage
