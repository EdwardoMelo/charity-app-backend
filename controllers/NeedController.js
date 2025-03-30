// controllers/NeedController.js
const NeedService = require('../services/NeedService');

class NeedController {
    async create(req, res) {
        try {
            const need = await NeedService.create(req.body);
            res.status(201).json(need);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async findByInstitutionId(req, res) {
        console.log('findByInstitutionId')
        try{ 
            const {id_instituicao} = req.params
            const needs = await NeedService.findByInstitutionId(id_instituicao);
            return res.status(201).send(needs);
        }catch(e){ 
            console.log('error findByInstitutionId: ', e.message)
            res.status(500).json({ message: e.message });
        }
    }

    async findAll(req, res) {
        try {
            const needs = await NeedService.findAll();
            res.status(200).json(needs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        try {
            const need = await NeedService.findById(req.params.id);
            res.status(200).json(need);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async update(req, res) {
        console.log('update need')
        try {
            const need = await NeedService.update(req.params.id, req.body);
            res.status(200).json(need);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        console.log('delete need')
        try {
            const result = await NeedService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.log('error delete: ', error.message)
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new NeedController();