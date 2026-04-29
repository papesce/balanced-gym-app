import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { ISerie, emptySerie } from 'balanced-gym-model';
import './SerieInput.css';

interface SerieInputProps {
    initialSerie?: ISerie;
    handleDoneClick?: (serie: ISerie) => void;
    handleCancelClick?: () => void;
    handleRepsChange?: () => void;
    handleWeightChange?: () => void;
}

export const isValidWeight = (value: string) => {
    const weight = parseFloat(value);
    return weight >= 0;
}

export const isValidReps = (value: string) => {
    const number = parseFloat(value);
    const reps = parseInt(value);
    return Number.isInteger(number) && reps >= 0;
}

export const isDirty = (reps: number, weight: number, initialSerie: ISerie) => {
    const dirty = weight >= 0 && reps >= 0 && (
        weight !== initialSerie.weight ||
        reps !== initialSerie.reps);
    return dirty;
}

const SeriesInput: React.FC<SerieInputProps> = ({
  initialSerie = emptySerie,
  handleDoneClick: onDoneClick,
  handleCancelClick,
  handleRepsChange: onRepsChange,
  handleWeightChange: onWeightChange
}) => {
    const [dirtyState, setDirtyState] = useState(false);
    const [weight, setWeight] = useState(initialSerie.weight.toString());
    const [reps, setReps] = useState(initialSerie.reps.toString());
    const [validWeight, setValidWeight] = useState(isValidWeight(initialSerie.weight.toString()));
    const [validReps, setValidReps] = useState(isValidReps(initialSerie.reps.toString()));

    const handleRepsChange = (evt: any) => {
        const { value } = evt.target;
        const isValid: boolean = isValidReps(value);
        const dirty: boolean = isValid && validWeight &&
             isDirty(parseInt(value), parseFloat(weight), initialSerie);
        setDirtyState(dirty);
        setValidReps(isValid);
        setReps(value);
    };

    const handleWeightChange = (evt: any) => {
        const { value } = evt.target;
        const isValid: boolean = isValidWeight(value);
        const dirty: boolean = isValid && validReps &&
             isDirty(parseInt(reps), parseFloat(value), initialSerie);
        setDirtyState(dirty);
        setValidWeight(isValid);
        setWeight(value);
    };

    const handleDoneClick = () => {
        const serie: ISerie = {...initialSerie, reps: parseInt(reps), weight: parseFloat(weight) };
        onDoneClick && onDoneClick(serie);
    };

    const handleDoneKeyPress = (event: any) => {
        console.log('keypress', event.keyCode);
        if (event.keyCode === 13){
            handleDoneClick();
        }
    };

    const handleFocus = (event: any) => {
        event.preventDefault();
        const { target } = event
        target.focus();
        target.select();
    };

    return (
        <div className="serie-input">
            <TextField
                className="serie-input-text-field"
                id="input-reps"
                label="# Reps"
                type="number"
                variant="outlined"
                onChange={handleRepsChange}
                value={reps}
                error={!validReps}
                onFocus={handleFocus}
            />
            <TextField
                className="serie-input-text-field"
                id="input-weight"
                label="Weight:"
                InputProps={{
                    endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                  }}
                type="number"
                variant="outlined"
                onChange={handleWeightChange}
                value={weight}
                error={!validWeight}
                onFocus={handleFocus}
            />
            {dirtyState && (
            <IconButton onClick={handleDoneClick} >
                <DoneIcon/>
            </IconButton> )}
        </div>
    )
};

export default SeriesInput;
