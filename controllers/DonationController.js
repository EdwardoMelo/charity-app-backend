// controllers/DonationController.js
const DonationService = require('../services/DonationService');

class DonationController {
    async create(req, res) {
        try {
            const donation = await DonationService.create(req.body);
            res.status(201).json(donation);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const donations = await DonationService.findAll();
            res.status(200).json(donations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findByDonorId(req, res){ 
        console.log('findByDonorId')
        try{ 
            const donations = await DonationService.findByDonorId(req);
            res.status(201).send(donations);
        }catch(e){ 
            console.log('error: ', e)
            res.status(500).json({ message: 'Erro ao buscar doações' });
        }
    }

    async findByInstitutionId(req, res){ 
        try {
            const donations = await DonationService.findByInstitutionId(req);
            res.status(201).send(donations);
        } catch (e) {
            res.status(500).json({ message: 'Erro ao buscar doações' });
        }
    }

    async findById(req, res) {
        try {
            const donation = await DonationService.findById(req.params.id);
            res.status(200).json(donation);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const donation = await DonationService.update(req.params.id, req.body);
            res.status(200).json(donation);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await DonationService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new DonationController();