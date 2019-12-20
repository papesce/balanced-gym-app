import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import './SerieInput.css';

export default class SeriesInput extends Component {
    render() {
        return (
            <div className="serie-input">
                <TextField
                    className="serie-input-text-field"
                    id="input-reps"
                    label="# Reps"
                    // type="number"
                    variant="outlined"
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
                />
                <IconButton>
                    <DoneIcon/>
                </IconButton>
                <IconButton>
                    <CancelIcon/>
                </IconButton>
            </div>
        )
    }
}
