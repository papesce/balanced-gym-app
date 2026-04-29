import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './ElemPage.css';

export interface IElemPage {
    name: string;
    page?: any;
}

interface ElemPageProps {
    pages: IElemPage[]
}

const ElemPage: React.FC<ElemPageProps> = ({ pages }) => {
    const [selected, setSelected] = useState(0);

    const handleClick = (index: number) => {
        setSelected(index);
    };

    return (
    <div className={'elem-page'}>
        <ButtonGroup fullWidth size="small" aria-label="small outlined button group">
            {pages.map((item, index)=>
              (index === selected) ?
                 <Button key={index} style={{backgroundColor:'gray'}} onClick={()=>handleClick(index)}>{item.name}</Button>
               : <Button key={index} onClick={()=>handleClick(index)}>{item.name}</Button>
            )}
      </ButtonGroup>
      {pages[selected] && pages[selected].page}
      </div>
    )
};

export default ElemPage;
