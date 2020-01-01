import React, { Component } from 'react'
import { IExercise } from '../../model/ExerciseModel';
import { ISerie } from '../../model/SerieModel';
import ElemPage, { IElemPage } from './ElemPage';
import DetailsPage from './DetailsPage';
import LogPage from './logPage/LogPage';
import MusclesPage from './MusclesPage';
import ExerciseHeader from './ExerciseHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

interface ExercisePageProps {
   loading?: boolean;
   error?: string;
   exercise?: IExercise;
   handleEditSerie?: (exerciseId: string, serie: ISerie) => void;
   handleDeleteSerie?: (exerciseId: string, serieId: string) => void;
}

class ExercisePage extends Component<ExercisePageProps> {
    render() {
        const emptyExercise: IExercise = {_id:'', name:''}
        const { exercise = emptyExercise, loading, error, 
          handleEditSerie, handleDeleteSerie } = this.props;
         const defaultError = error ? "Error loading exericse" : undefined;
         const detailsPage = <DetailsPage key="1"/>;
         const musclesPage = <MusclesPage key="2"/>;
         const logPage = <LogPage key="3" exercise={ exercise } 
          handleEditSerie={handleEditSerie}
          handleDeleteSerie={handleDeleteSerie} />;
         const pages: IElemPage[] = [
            {name: 'Log', page: logPage},
            {name: 'Details', page: detailsPage},
            {name: 'Muscles', page: musclesPage}
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
           
            </>
        )
    }
}

export default ExercisePage
