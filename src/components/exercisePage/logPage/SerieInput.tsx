import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
// import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ISerie, emptySerie } from '../../../model/SerieModel';
import './SerieInput.css';

interface SerieInputProps {
    initialSerie?: ISerie;
    handleDoneClick?: (serie: ISerie) => void;
    handleCancelClick?: () => void;
    handleRepsChange?: () => void;
    handleWeightChange?: () => void;
}

interface SerieInputState {
    isDirty: boolean;
    isValidWeight: boolean;
    weight: string;
    isValidReps: boolean;
    reps: string;
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
    const isDirty = weight >= 0 && reps >= 0 && (
        weight !== initialSerie.weight ||
        reps !== initialSerie.reps);
    return isDirty;
}

export default class SeriesInput extends Component<SerieInputProps, SerieInputState> {
    constructor(props: SerieInputProps) {
        super(props);
        const { initialSerie = emptySerie } = props;
        console.log('initialSerie:', initialSerie);
        this.state = {
            isDirty: false,
            weight: initialSerie.weight.toString(),
            reps: initialSerie.reps.toString(),
            isValidWeight: true,
            isValidReps: true,
        };
    }
    reps: any = null;
    handleRepsChange = (evt: any) => {
        const { value } = evt.target;
        const { weight, isValidWeight } = this.state;
        const { initialSerie = emptySerie } = this.props;
        const isValid: boolean = isValidReps(value);
        const dirty: boolean = isValid && isValidWeight &&
             isDirty(parseInt(value), parseFloat(weight), initialSerie);
        this.setState({isDirty: dirty, isValidReps: isValid, reps: value })
    };
    handleWeightChange = (evt: any) => {
        const { value } = evt.target;
        const { reps, isValidReps } = this.state;
        const { initialSerie = emptySerie } = this.props;
        const isValid: boolean = isValidWeight(value);
        const dirty: boolean = isValid && isValidReps &&
             isDirty(parseInt(reps), parseFloat(value), initialSerie);
        this.setState({isDirty: dirty, isValidWeight: isValid, weight: value })
    };
    handleDoneClick = () => {
        const { handleDoneClick, initialSerie = emptySerie } = this.props;
        const { reps, weight } = this.state; 
        console.log('initialSerie:', initialSerie);
        const serie: ISerie = {...initialSerie, reps: parseInt(reps), weight: parseFloat(weight) };
        handleDoneClick && handleDoneClick(serie);
    }
    render() {
        const { weight, reps, isValidWeight, isValidReps } = this.state;     
        return (
            <div className="serie-input">
                <TextField
                    ref={div => (this.reps = div)} 
                    className="serie-input-text-field"
                    id="input-reps"
                    label="# Reps"
                    type="number"
                    variant="outlined"
                    onChange={this.handleRepsChange}
                    value={reps}
                    error={!isValidReps}
                    // onBlur
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
                    onChange={this.handleWeightChange}
                    value={weight}
                    error={!isValidWeight}
                />
                {this.state.isDirty && (
                <IconButton onClick={this.handleDoneClick}>
                    <DoneIcon/>
                </IconButton> )}
                {/* <IconButton onClick={handleCancelClick}>
                    <CancelIcon/>
                </IconButton> */}
            </div>
        )
    }
}
