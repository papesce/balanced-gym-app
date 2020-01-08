import React, { Component } from 'react'
import './Navigation.css';
import TablePagination from '@material-ui/core/TablePagination';

export default class Navigation extends Component {
    handleNext = () => {

    }
    handleBack = () => {

    }
    handleChangePage = () => {

    }
    getDisplayedRows = (nav: any) => {
        const {from, to , count} = nav; 
        return `${count - to}-${to === -1 ? count : count - from + 1} of ${count}`
    }
    render() {
          const rows = [1,2,3,4,5,6,7,8];
        const rowsPerPage = 6;
        // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
         const page = 1;
          const tablePagination =  <TablePagination  
          className='navigation-table-pagination'
          labelRowsPerPage={'Points:'}
          rowsPerPageOptions={[6, 8, 10, { label: 'All', value: -1 }]}
          // backIconButtonProps={{disabled: page === 0}}
          // nextIconButtonProps={{disabled: page === 1}}
          // colSpan={3}
          labelDisplayedRows={this.getDisplayedRows}
          count={8}
      rowsPerPage={6}
      page={1-page}
      SelectProps={{
        native: true,
      }}
      onChangePage={this.handleChangePage}
      
      // onChangeRowsPerPage={handleChangeRowsPerPage}
      // ActionsComponent={TablePaginationActions}
    />
        return (<div className="navigation-container">
            {// mobileStepper
             tablePagination
            }
   
            
        </div>)
    }
}
