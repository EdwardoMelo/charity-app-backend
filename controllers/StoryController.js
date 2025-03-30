// controllers/StoryController.js
const StoryService = require('../services/StoryService');

class StoryController {
    async create(req, res) {
        try {
            const story = await StoryService.create(req.body);
            res.status(201).json(story);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const stories = await StoryService.findAll();
            res.status(200).json(stories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        try {
            const story = await StoryService.findById(req.params.id);
            res.status(200).json(story);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const story = await StoryService.update(req.params.id, req.body);
            res.status(200).json(story);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await StoryService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new StoryController();