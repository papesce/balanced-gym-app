import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
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
    serie: ISerie;
}

export default class SeriesInput extends Component<SerieInputProps, SerieInputState> {
    constructor(props: SerieInputProps) {
        super(props);
        const { initialSerie = emptySerie } = props;
        this.state = { 
            isDirty: false,
            serie: initialSerie
        };
    }
    reps: any = null;
    computeIsDirty = (newSerie: ISerie) => {
        const { initialSerie = emptySerie } = this.props;
        const isDirty = newSerie.weight !== initialSerie.weight ||
        newSerie.reps !== initialSerie.reps;
        return isDirty;
    }
    handleRepsChange = (evt: any) => {
        const { serie } = this.state;
        const { value: reps } = evt.target;
        const num = parseInt(reps);
        const newSerie: ISerie = {...serie, reps: num };
        const isDirty: boolean = this.computeIsDirty(newSerie);
        this.setState({isDirty, serie: newSerie })
    };
    handleWeightChange = (evt: any) => {
        const { serie } = this.state;
        const { value: weight } = evt.target;
        const num = parseInt(weight);
        const newSerie = {...serie, weight: num };
        const isDirty = this.computeIsDirty(newSerie);        
        this.setState({isDirty, serie: newSerie });
    };
    handleDoneClick = (evt:any) => {
        const { handleDoneClick } = this.props;
        const { serie } = this.state;
        handleDoneClick && handleDoneClick(serie)
    }
    render() {
        const { 
             initialSerie = emptySerie } = this.props;
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
                    defaultValue={initialSerie.reps}
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
                    defaultValue={initialSerie.weight}
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
