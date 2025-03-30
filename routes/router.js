// routes/router.js
const express = require('express');
const router = express.Router();

// Importar os controllers
const NeedController = require('../controllers/NeedController');
const DonationController = require('../controllers/DonationController');
const UserController = require('../controllers/UserController');
const StoryController = require('../controllers/StoryController');
const ImpactController = require('../controllers/ImpactController');
const ScheduleController = require('../controllers/ScheduleController');
const { findByInstitutionUserId } = require('../services/NeedService');

// Rotas para Necessidades (needs)
router.post('/needs', NeedController.create);
router.get('/needs', NeedController.findAll);
router.get('/needs/:id', NeedController.findById);
router.get('/needs/by_institution/:id_instituicao', NeedController.findByInstitutionId)
router.put('/needs/:id', NeedController.update);
router.delete('/needs/:id', NeedController.delete);

// Rotas para Doações (donations)
router.post('/donations', DonationController.create);
router.get('/donations', DonationController.findAll);
router.get('/donations/:id', DonationController.findById);
router.get('/donations/by_institution/:id_instituicao', DonationController.findByInstitutionId);
router.get('/donations/by_donor/:id_doador', DonationController.findByDonorId)
router.put('/donations/:id', DonationController.update);
router.delete('/donations/:id', DonationController.delete);

// Rotas para Usuários (users)
router.post('/users/login', UserController.login)
router.post('/users', UserController.create);
router.get('/users', UserController.findAll);
router.get('/users/institution', UserController.findInstitutions)
router.get('/users/:id', UserController.findById);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// Rotas para Histórias (stories)
router.post('/stories', StoryController.create);
router.get('/stories', StoryController.findAll);
router.get('/stories/:id', StoryController.findById);
router.put('/stories/:id', StoryController.update);
router.delete('/stories/:id', StoryController.delete);

router.post('/schedules', ScheduleController.create)
router.put('/schedules/:id', ScheduleController.update)
router.get('/schedules', ScheduleController.findAll);
router.delete('/schedules/:id', ScheduleController.delete)
router.get('/schedules/by_institution/:id_instituicao', ScheduleController.findByInstitutionId);
router.get('/schedules/by_donor/:id_doador', ScheduleController.findByDonorId);

// Rotas para Impactos (impacts)
router.post('/impacts', ImpactController.create);
router.get('/impacts', ImpactController.findAll);
router.get('/impacts/:id', ImpactController.findById);
router.put('/impacts/:id', ImpactController.update);
router.delete('/impacts/:id', ImpactController.delete);



module.exports = router;