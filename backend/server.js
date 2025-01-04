app.get('/experiments', (req, res) => {
    db.all('SELECT * FROM experiments', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch experiments' });
        }
        res.status(200).json(rows);
    });
});
/*above is getting all experiments from the database*/

/*below is creating a new experiment*/
app.post('/experiments', (req, res) => {
    const { name, system_prompt, llm_model, created_by } = req.body;

    if (!name || !system_prompt || !llm_model || !created_by) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const query = `
        INSERT INTO experiments (name, system_prompt, llm_model, created_by)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [name, system_prompt, llm_model, created_by], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to add experiment' });
        }
        res.status(201).json({ id: this.lastID, message: 'Experiment created successfully!' });
    });
});

/*below is getting all test cases*/
app.get('/test-cases', (req, res) => {
    db.all('SELECT * FROM test_cases', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch test cases' });
        }
        res.status(200).json(rows);
    });
});

/*creating a new test case*/
app.post('/test-cases', (req, res) => {
    const { message, expected_output, grader } = req.body;

    if (!message || !expected_output || !grader) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const query = `
        INSERT INTO test_cases (message, expected_output, grader)
        VALUES (?, ?, ?)
    `;
    db.run(query, [message, expected_output, grader], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to add test case' });
        }
        res.status(201).json({ id: this.lastID, message: 'Test case created successfully!' });
    });
});

/*code below is for running an experiment*/
app.post('/run-experiment', (req, res) => {
    const { experiment_id, test_case_ids } = req.body;

    if (!experiment_id || !Array.isArray(test_case_ids) || test_case_ids.length === 0) {
        return res.status(400).json({ error: 'Invalid input!' });
    }

    // Simulate experiment results
    const results = test_case_ids.map((test_case_id) => {
        return {
            test_case_id,
            score: Math.floor(Math.random() * 101), // Simulated score
        };
    });

    const aggregateScore =
        results.reduce((sum, result) => sum + result.score, 0) / results.length;

    res.status(200).json({
        experiment_id,
        results,
        aggregate_score: aggregateScore,
    });
});
