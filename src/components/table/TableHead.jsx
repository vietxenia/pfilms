import PropTypes from 'prop-types';

function TableHead(props) {
    const {headings} = props;

    const tblHead = headings.map((heading)=>{
        return (<th 
            key={heading.headingKey}>
            {heading.text}
        </th>);
        }
    );

    return (<thead><tr>{tblHead}</tr></thead>);
}

TableHead.propTypes = {
    headings: PropTypes.array,
};

export default TableHead;  