const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const queries = require('../db/queries');

// Get all experiments
router.get('/', (req, res) => {
    db.all(queries.getAllExperiments, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create a new experiment
router.post('/', (req, res) => {
    const { name, system_prompt, llm_model, created_by } = req.body;
    db.run(queries.createExperiment, [name, system_prompt, llm_model, created_by], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

module.exports = router;
