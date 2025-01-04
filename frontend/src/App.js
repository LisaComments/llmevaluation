import React from 'react';
import ExperimentsList from './components/ExperimentsList';
import AddExperiment from './components/AddExperiment';
import AddTestCase from './components/AddTestCase';

const App = () => {
    return (
        <div>
            <h1>Evaluation Platform</h1>
            <AddExperiment />
            <AddTestCase />
            <ExperimentsList />
        </div>
    );
};

export default App;
