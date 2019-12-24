import React, { Component } from 'react'
import SwipeableItem from './SwipeableItem';
import SerieInput from './SerieInput';

interface SerieProps {
    handleDelete: () => void;
}

export default class Serie extends Component<SerieProps> {
    render() {
        const { handleDelete } = this.props;
        return (
            <SwipeableItem onSwipe={handleDelete}>
                <SerieInput></SerieInput>
            </SwipeableItem>
        )
    }
}
