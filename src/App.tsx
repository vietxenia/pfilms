import  { useState, useEffect } from 'react';
import logo from './Star_World_Asia_2013_Logo.png';
import './sass/main.scss';
import WTable from "./components/table/Table.jsx";
import {Wloading} from "./components/Loading.jsx";

function App() {
    type dataType = {
        results?: any[]
    };

    const defaultData: dataType = {};
    const [data, setData] = useState(defaultData);
    const [loadedData, setLoadedData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {   
        if (!loadedData) {
            let ajaxUrl = new URL("https://swapi.dev/api/films");
            ajaxUrl.searchParams.set("format","json");

            fetch( ajaxUrl.toString(), {
                method: 'GET',
                })
                .then(res => res.json())
                .then(
                (result) => {
                    setData(result);
                    setLoadedData(true);
                    setIsLoading(false);
                }).catch( err => console.log( err ) );
            }
        }
    );

  const userHeading = [
    {headingKey: 'title', text: 'Title'},
    {headingKey: 'director', text: 'Director'},
    {headingKey: 'producer', text: 'Producer'},
    {headingKey: 'release_date', text: 'Release Date'}
    ];

    return (
    <div className="App">
        <header className="App-header u-txt--center">
            <img src={logo} className="App-logo" alt="logo" />
        </header>

        <div className="c-table__container">
            <WTable 
                colKeys={["title","director","producer","release_date"]}
                headings={userHeading} 
                rows={data.results ? data.results : []}
                />
        </div>
        
        <Wloading isLoading={isLoading} />
      
    </div>
  );
}

export default App;
