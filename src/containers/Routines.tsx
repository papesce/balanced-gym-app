import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineList from '../components/RoutineList';
import { IRoutine } from '../model/RoutineModel';
import { fulldataList } from '../model/RoutineModel.test';
import { loadRoutines } from '../redux/actions';
interface RoutineProps {
    data: IRoutine[];
}

export class Routines extends Component<RoutineProps> {
    componentDidMount = () => {
       const { loadRoutines } = this.props;
       loadRoutines() 
    }
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadRoutines: () => dispatch(loadRoutines())
    }
}

export default connect(mapStateToProps)(Routines)
