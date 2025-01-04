import React, { useState } from 'react';
import axios from 'axios';

const AddTestCase = () => {
    const [message, setMessage] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [grader, setGrader] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/test-cases', {
            message,
            expected_output: expectedOutput,
            grader
        })
        .then((response) => {
            console.log('Test case added:', response.data);
            setMessage('');
            setExpectedOutput('');
            setGrader('');
        })
        .catch((error) => {
            console.error('Error adding test case:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Test Case</h2>
            <label>Message:</label>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
            <label>Expected Output:</label>
            <input type="text" value={expectedOutput} onChange={(e) => setExpectedOutput(e.target.value)} required />
            <label>Grader:</label>
            <select value={grader} onChange={(e) => setGrader(e.target.value)} required>
                <option value="">Select</option>
                <option value="exact">Exact Match</option>
                <option value="partial">Partial Match</option>
                <option value="llm">LLM Match</option>
            </select>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTestCase;
