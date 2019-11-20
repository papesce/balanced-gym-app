import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineList from '../components/RoutineList';
import { IRoutine } from '../model/RoutineModel';
import { fulldataList } from '../model/RoutineModel.test';

interface RoutineProps {
    data: IRoutine[];
}

export class Routines extends Component<RoutineProps> {
    render() {
        const { data } = this.props;
        return (
           <RoutineList data={data}/>
        )
    }
}

const mapStateToProps = (state: any) => {
    // debugger;
    return {
        data: fulldataList
    }
}

export default connect(mapStateToProps)(Routines)
