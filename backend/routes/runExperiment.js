const runExperiment = (experimentId) => {
    axios.post('http://localhost:3000/run-experiment', {
        experiment_id: experimentId,
        test_case_ids: [1, 2, 3] // Example test cases
    })
    .then((response) => {
        console.log('Experiment Results:', response.data);
    })
    .catch((error) => {
        console.error('Error running experiment:', error);
    });
};
