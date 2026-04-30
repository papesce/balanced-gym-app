import React from "react";
import ExerciseList from "../components/lists/exerciseList/ExerciseList";
import { IExercise } from "balanced-gym-model";
import { useGetTargetQuery } from "../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import BackHeader from "../components/headerBar/BackHeader";
import { getMuscleGroupURL } from "../utils/routes";

const Target: React.FC = () => {
    const navigate = useNavigate();
    const { routineId, muscleGroupId, targetId } = useParams<{
        routineId: string;
        muscleGroupId: string;
        targetId: string;
    }>();
    const { data: target, isLoading, error } = useGetTargetQuery({ routineId: routineId!, muscleGroupId: muscleGroupId!, targetId: targetId! });

    const onExerciseClick = (exercise: IExercise) => {
        navigate(`/exercise/${exercise._id}`);
    };

    const handleBack = () => {
        navigate(getMuscleGroupURL(routineId!, muscleGroupId!));
    };

    return (
        <>
            <BackHeader handleBack={handleBack} />
            <ExerciseList
                loading={isLoading}
                error={error ? "Error loading target" : undefined}
                target={target as any}
                onClick={onExerciseClick}
            />
        </>
    );
};

export default Target;
