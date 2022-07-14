import TableRow from './TableRow.jsx';
import PropTypes from 'prop-types';

function TableBody(props) {
    const {colKeys, rows} = props;
    const tblBody = rows.map((row)=> {
        return <tr key={row.url}><TableRow colKeys={colKeys} row={row} /></tr>
        }
    );
    return (<tbody>{tblBody}</tbody>);
}

TableBody.propTypes = {
    rows: PropTypes.array,
    colKeys: PropTypes.any
};

export default TableBody;