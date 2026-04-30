import React from 'react';
import RoutineList from '../components/lists/routineList/RoutineList';
import { IRoutine } from 'balanced-gym-model';
import { useGetRoutinesQuery } from '../redux/api';
import { useNavigate } from "react-router-dom";
import InitialHeader from '../components/headerBar/InitialHeader';
import { useAuth } from '../context/AuthContext';

const Routines: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { data: routines, isLoading, error } = useGetRoutinesQuery();

    const onRoutineClick = (routine: IRoutine) => {
        navigate(`/routine/${routine._id}`);
    };

    return (
        <>
            <InitialHeader handleLogout={logout} />
            <RoutineList
                loading={isLoading}
                error={error ? "Error loading routines" : undefined}
                routines={routines as any}
                onClick={onRoutineClick}
            />
        </>
    );
};

export default Routines;
