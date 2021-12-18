import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Aviasales from "./components/Aviasales/Aviasales";
import {ISearchID} from "./types/types";
import useApi from "./utils/useApi";

function App() {
    const [results, loading, isError, refresh] = useApi<ISearchID>(`https://front-test.beta.aviasales.ru/search`);

    return (
        <Layout>
            {results?.searchId && <Aviasales searchID={results?.searchId ? results?.searchId : ''}/>}
        </Layout>
    );
}

export default App;
