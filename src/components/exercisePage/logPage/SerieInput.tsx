import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import './SerieInput.css';

interface SerieInputProps {
    handleDoneClick?: () => void;
    handleCancelClick?: () => void;
    handleRepsChange?: () => void;
    handleWeightChange?: () => void;
}

export default class SeriesInput extends Component<SerieInputProps> {
    render() {
        const { handleDoneClick, handleCancelClick,
             handleRepsChange, handleWeightChange } = this.props;
        return (
            <div className="serie-input">
                <TextField
                    className="serie-input-text-field"
                    id="input-reps"
                    label="# Reps"
                    type="number"
                    variant="outlined"
                    onChange={handleRepsChange}
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
                    onChange={handleWeightChange}
                />
                <IconButton onClick={handleDoneClick}>
                    <DoneIcon/>
                </IconButton>
                <IconButton onClick={handleCancelClick}>
                    <CancelIcon/>
                </IconButton>
            </div>
        )
    }
}
