INSERT INTO experiments (name, system_prompt, llm_model, created_by) 
VALUES 
('Experiment 1', 'Provide a concise summary.', 'GPT-4', 'admin');

INSERT INTO test_cases (message, expected_output, grader) 
VALUES 
('What is AI?', 'AI stands for Artificial Intelligence.', 'exact'),
('Define ML.', 'Machine Learning (ML) is...', 'partial');
