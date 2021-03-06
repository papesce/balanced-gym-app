
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SwipeableViews from 'react-swipeable-views';
import './ElemPage.css';

export interface IElemPage {
    name: string;
    page?: any;
}

interface ElemPageProps {
    pages: IElemPage[]
}

interface ElemPageState {
    selected: number
}

export default class ElemPage extends Component<ElemPageProps, ElemPageState> {
    state = {
        selected: 0
    }
    handleClick = (index: number) => {
        this.setState({selected: index});
    }
    render() {
        const { pages } = this.props; 
        const { selected } = this.state;
        return (
        <div className={'elem-page'}>
            <ButtonGroup fullWidth size="small" aria-label="small outlined button group">
                {pages.map((item, index)=> 
                  (index === selected) ?  
                     <Button key={index} style={{backgroundColor:'gray'}} onClick={()=>this.handleClick(index)}>{item.name}</Button>
                   : <Button key={index} onClick={()=>this.handleClick(index)}>{item.name}</Button>
                )}
          </ButtonGroup>
          <SwipeableViews
        axis={'x'}
        index={selected}
        
        // onChangeIndex={handleChangeIndex}
      >
          {pages.map(item => item.page)}
          </SwipeableViews>    
          </div>  
        )
    }
}
