// controllers/ImpactController.js
const ImpactService = require('../services/ImpactService');

class ImpactController {
    async create(req, res) {
        try {
            const impact = await ImpactService.create(req.body);
            res.status(201).json(impact);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const impacts = await ImpactService.findAll();
            res.status(200).json(impacts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        try {
            const impact = await ImpactService.findById(req.params.id);
            res.status(200).json(impact);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const impact = await ImpactService.update(req.params.id, req.body);
            res.status(200).json(impact);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await ImpactService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ImpactController();