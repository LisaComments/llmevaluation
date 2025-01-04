/*for dynamic queries that can be reused throughout all of backend*/
const queries = {
    getAllExperiments: `SELECT * FROM experiments`,
    getExperimentById: `SELECT * FROM experiments WHERE id = ?`,
    createExperiment: `
        INSERT INTO experiments (name, system_prompt, llm_model, created_by) 
        VALUES (?, ?, ?, ?)
    `,
    getAllTestCases: `SELECT * FROM test_cases`,
    createTestCase: `
        INSERT INTO test_cases (message, expected_output, grader) 
        VALUES (?, ?, ?)
    `,
    linkExperimentAndTestCase: `
        INSERT INTO experiment_test_cases (experiment_id, test_case_id) 
        VALUES (?, ?)
    `,
    runExperiment: `
        SELECT tc.id AS test_case_id, tc.message, tc.expected_output, etc.grader 
        FROM experiment_test_cases etc
        JOIN test_cases tc ON etc.test_case_id = tc.id
        WHERE etc.experiment_id = ?
    `
};

module.exports = queries;
