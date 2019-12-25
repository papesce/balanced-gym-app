import React, { Component } from 'react'
import SwipeableItem from './SwipeableItem';
import SerieInput from './SerieInput';
import { ISerie } from '../../../model/SerieModel';

interface SerieProps {
    handleDelete?: () => void;
    handleCancel?: () => void;
    handleDone?: (serie: ISerie) => void;
    initialSerie?: ISerie;
}

export default class Serie extends Component<SerieProps> {
    render() {
        const { handleDelete, handleCancel, handleDone, initialSerie } = this.props;
        return (
            <SwipeableItem onSwipe={handleDelete}>
                <SerieInput initialSerie={initialSerie}
                 handleCancelClick={handleCancel}
                 handleDoneClick={handleDone} ></SerieInput>
            </SwipeableItem>
        )
    }
}
