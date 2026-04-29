import React from 'react';
import TargetList from '../components/lists/targetList/TargetList';
import { IMuscle } from 'balanced-gym-model';
import { useGetMuscleGroupQuery } from '../redux/api';
import { useNavigate, useParams } from "react-router-dom";
import BackHeader from '../components/headerBar/BackHeader';
import { getRoutineURL } from '../utils/routes';

const MuscleGroup: React.FC = () => {
    const navigate = useNavigate();
    const { routineId, muscleGroupId } = useParams<{ routineId: string; muscleGroupId: string }>();
    const { data: muscleGroup, isLoading, error } = useGetMuscleGroupQuery({ routineId, muscleGroupId });

    const onTargetClick = (target: IMuscle) => {
        navigate(`/routine/${routineId}/muscleGroup/${muscleGroupId}/target/${target._id}`);
    };

    const handleBack = () => {
        navigate(getRoutineURL(routineId));
    };

    return (
        <>
            <BackHeader handleBack={handleBack} />
            <TargetList
                loading={isLoading}
                error={error ? "Error loading muscle group" : undefined}
                muscleGroup={muscleGroup as any}
                onClick={onTargetClick}
            />
        </>
    );
};

export default MuscleGroup;
