import React from 'react';
import PropTypes from 'prop-types';
import {ctxTable} from './context';

function TableRow(props) {
    const {colKeys,row} = props;
    const [staTable] = React.useContext(ctxTable);
    const headings = staTable.headings;
    
    if (!staTable['handleCell']) {
        staTable['handleCell'] = "";
    }

    let tblRow=[];
  
    if (!(typeof row === 'object' && row !== null)) {
        return <></>;
    }
  
    const keys = Array.isArray(colKeys) ? colKeys : Object.keys(row);

    tblRow = keys.map((colKey, index) => {
        return <td data-url={row.url}  onClick={staTable['handleCell']} data-label={headings[colKey] ? headings[colKey] : colKey} key={colKey+index}><a href="#javascript"><span data-url={row.url} >{row[colKey]}</span></a></td>
    });

    return <>{tblRow}</>
}

TableRow.propTypes = {
    row: PropTypes.object,
    colKeys: PropTypes.array,
    key: PropTypes.any
};

export default TableRow;