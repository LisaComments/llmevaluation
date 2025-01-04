/*fetch and display experiments from the database*/
useEffect(() => {
    axios.get('http://localhost:3000/experiments')
        .then((response) => {
            setExperiments(response.data);
        })
        .catch((error) => {
            console.error('Error fetching experiments:', error);
        });
}, []);

/*updating to include a button to run experiments*/
<ul>
    {experiments.map((experiment) => (
        <li key={experiment.id}>
            <strong>{experiment.name}</strong> - {experiment.llm_model}
            <p>Prompt: {experiment.system_prompt}</p>
            <button onClick={() => runExperiment(experiment.id)}>Run Experiment</button>
        </li>
    ))}
</ul>
