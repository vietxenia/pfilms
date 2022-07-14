import React, {useState} from 'react';
import TableBody from './TableBody.jsx';
import TableHead from './TableHead.jsx';
import PropTypes from 'prop-types';
import {ctxTable} from './context';
import Popup from '../Popup.jsx';
import {getData} from '../fetchData';
import {Wloading} from "../Loading.jsx";

function WTable(props){
	const {headings,rows ,colKeys} = props;
	const [isLoading, setIsLoading] = useState(false);
	const [staTable,setStaTable] = useState({headings: headings});
	const [showPopup,setShowPopup] = useState(false);
	const [popupContent,setPopupContent] = useState(1);

	const toggleClose = () => {
		setShowPopup(!showPopup);
		return showPopup;
	}

	const openPopup = (e) => {
		showInfomations(e.target.dataset.url);
		setIsLoading(true);
	}

	function renderInfomations(obj) {
		const output = [];
		for (const [key, value] of Object.entries(obj)) {
			if (typeof value === 'object' && value !== null) {
				output.push(<div className="u-mb--15" key={key}><strong className="u-txt--capitalize">{key}</strong><br/>{renderInfomations(value)}</div>);
			}
			else {
				output.push(<div className="u-mb--15" key={key}><strong className="u-txt--capitalize">{key}</strong><br/>{value}</div>);
			}
		}

	
		return (<>{output}</>);
	}
	

	const showInfomations =  (url) => {
		const output = [];
		const userData = getData(url);
		userData.then( data => {
			setIsLoading(false);
			setShowPopup({showPopup: true});

			setPopupContent(
				renderInfomations(data)
				);
		});
		
		return output;
	}

	staTable['handleCell'] = openPopup;

	return (
		<>
		<ctxTable.Provider value={[staTable,setStaTable]}>
			<table className="c-table c-table--responsive">
				<TableHead 
					headings={headings}
					/>
				<TableBody
					rows={rows}
					colKeys={colKeys}
					/>
			</table>
		</ctxTable.Provider>

		{showPopup && <Popup 
			content= {popupContent}
			handleClose={toggleClose}
		/>}

		<Wloading isLoading={isLoading} />
		</>
	)  ;
}
  
WTable.propTypes = {
	headings: PropTypes.array,
	rows: PropTypes.array,
	colKeys: PropTypes.any
};


export default WTable;