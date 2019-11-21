import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutineList from '../components/RoutineList';
import { IRoutineState } from '../model/RoutineModel';
import { loadRoutines } from '../redux/actions';

interface RoutineProps {
    routinesState?: IRoutineState;
    loadRoutines?: () => {};
}

export class Routines extends Component<RoutineProps> {
    componentDidMount = () => {
       const { loadRoutines } = this.props;
       loadRoutines && loadRoutines();
    }
    render() {
        const { routinesState = {} } = this.props;
        return (
           <RoutineList loading={routinesState.loading}
             error={routinesState.error} 
             data={routinesState.data}/>
        )
    }
}

const mapStateToProps = (state: any) => {
    console.log('state changed:', state)
    return {
        routinesState: state.routines
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadRoutines: () => dispatch(loadRoutines())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routines)
