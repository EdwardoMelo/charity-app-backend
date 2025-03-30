// controllers/UserController.js
const UserService = require('../services/UserService');

class UserController {

    async login (req, res ) { 
        console.log('login')
        try{ 
            const data = await UserService.login(req.body);
            return res.status(200).send(data);
        } catch (error){ 
            res.status(400).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const user = await UserService.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async findInstitutions(req, res){ 
        try{ 
            const institutions = await UserService.findInstitutionUsers();
            return res.status(201).send(institutions);
        }catch(e){ 
            res.status(500).json({ message: error.message });

        }
    }

    async findAll(req, res) {
        try {
            const users = await UserService.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        try {
            const user = await UserService.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const user = await UserService.update(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await UserService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();