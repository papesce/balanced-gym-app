import React, { Component } from 'react'
import SwipeableItem from './SwipeableItem';
import SerieInput from './SerieInput';
import { ISerie } from '../../../model/SerieModel';

interface SerieProps {
    handleDelete?: (serieId: string) => void;
    handleCancel?: () => void;
    handleDone?: (serie: ISerie) => void;
    initialSerie?: ISerie;
}

export default class Serie extends Component<SerieProps> {
    handleDelete = () => {
        const { initialSerie, handleDelete } = this.props;
        if (initialSerie && handleDelete) {
            handleDelete(initialSerie._id);
        }
    }
    render() {
        const { handleCancel, handleDone, initialSerie } = this.props;
        return (
            <SwipeableItem onSwipe={this.handleDelete}>
                <SerieInput initialSerie={initialSerie}
                 handleCancelClick={handleCancel}
                 handleDoneClick={handleDone} ></SerieInput>
            </SwipeableItem>
        )
    }
}
