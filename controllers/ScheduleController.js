const ScheduleService = require('../services/ScheduleService');

class ScheduleController {
    async create(req, res) {
        try {
            const schedule = await ScheduleService.create(req.body);
            res.status(201).json(schedule);
        } catch (error) {
            console.log('error: ', error.message)
            res.status(400).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const schedules = await ScheduleService.findAll();
            res.status(200).json(schedules);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findByDonorId(req, res) {
        try {
            const schedules = await ScheduleService.findByDonorId(req);
            res.status(200).json(schedules);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findByInstitutionId(req, res) {
        try {
            const schedules = await ScheduleService.findByInstitutionId(req);
            res.status(200).json(schedules);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        try {
            const schedule = await ScheduleService.findById(req.params.id);
            res.status(200).json(schedule);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const schedule = await ScheduleService.update(req.params.id, req.body);
            console.log('udpated schedule: ', schedule)
            res.status(200).json(schedule);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await ScheduleService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ScheduleController();