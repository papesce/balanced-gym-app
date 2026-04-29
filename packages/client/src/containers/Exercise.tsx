import React from 'react';
import ExercisePage from '../components/pages/exercisePage/ExercisePage';
import { IRoutine, IMuscleGroup, IMuscle, ISerie } from 'balanced-gym-model';
import { useGetExerciseQuery, useNewSerieMutation, useEditSerieMutation, useDeleteSerieMutation } from '../redux/api';
import { useNavigate, useParams } from "react-router-dom";
import ExerciseHeader from '../components/headerBar/ExerciseHeader';
import { getTargetURL } from '../utils/routes';

const Exercise: React.FC = () => {
    const navigate = useNavigate();
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { data: exercise, isLoading, error } = useGetExerciseQuery(exerciseId);
    const [triggerNewSerie, { isLoading: isCreating, error: creatingError }] = useNewSerieMutation();
    const [triggerEditSerie, { isLoading: isEditing, error: editingError }] = useEditSerieMutation();
    const [triggerDeleteSerie, { isLoading: isDeleting, error: deletingError }] = useDeleteSerieMutation();

    const handleNewSerie = (restTime?: number) => {
        if (!exercise) return;
        const { suggestedSerie = { _id: '', reps: 0, weight: 0 } } = exercise;
        const body = { weight: suggestedSerie.weight, reps: suggestedSerie.reps };
        triggerNewSerie({ exerciseId: exercise._id, body });
    };

    const handleEditSerie = (exId: string, serie: ISerie) => {
        triggerEditSerie({ serieId: serie._id, exerciseId: exId, body: { weight: serie.weight, reps: serie.reps } });
    };

    const handleDeleteSerie = (exId: string, serieId: string) => {
        triggerDeleteSerie({ serieId, exerciseId: exId });
    };

    const handleBack = () => {
        if (!exercise) return;
        const emptyRoutine: IRoutine = { _id: '', name: '' };
        const emptyMuscleGroup: IMuscleGroup = { _id: '', name: '' };
        const emptyTarget: IMuscle = { _id: '', name: '' };
        const {
            routineId = emptyRoutine,
            muscleGroup = emptyMuscleGroup,
            target = emptyTarget
        } = exercise;
        navigate(getTargetURL(routineId._id, muscleGroup._id, target._id));
    };

    const getErrorMessage = () => {
        if (error) return "Error loading exercise";
        if (creatingError) return "Error creating serie";
        if (editingError) return "Error editing serie";
        if (deletingError) return "Error deleting serie";
        return undefined;
    };

    const loading = isLoading || isCreating || isEditing || isDeleting;

    return (
        <>
            <ExerciseHeader handleBack={handleBack} />
            <ExercisePage
                loading={loading}
                error={getErrorMessage()}
                exercise={exercise as any}
                handleAddSerie={handleNewSerie}
                handleEditSerie={handleEditSerie}
                handleDeleteSerie={handleDeleteSerie}
            />
        </>
    );
};

export default Exercise;
