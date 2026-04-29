import React from 'react';
import MuscleGroupList from '../components/lists/muscleGroupList/MuscleGroupList';
import { IMuscleGroup } from 'balanced-gym-model';
import { useGetRoutineQuery } from '../redux/api';
import { useNavigate, useParams } from "react-router-dom";
import BackHeader from '../components/headerBar/BackHeader';

const Routine: React.FC = () => {
    const navigate = useNavigate();
    const { routineId } = useParams<{ routineId: string }>();
    const { data: routine, isLoading, error } = useGetRoutineQuery(routineId);

    const onRoutineClick = (muscleGroup: IMuscleGroup) => {
        navigate(`/routine/${routineId}/muscleGroup/${muscleGroup._id}`);
    };

    const handleBack = () => {
        navigate('/routines');
    };

    return (
        <>
            <BackHeader handleBack={handleBack} />
            <MuscleGroupList
                loading={isLoading}
                error={error ? "Error loading routine" : undefined}
                routine={routine as any}
                onClick={onRoutineClick}
            />
        </>
    );
};

export default Routine;
