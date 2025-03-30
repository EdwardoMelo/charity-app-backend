const { prisma } = require('../database');

class ScheduleService {
    async create(data) {
        console.log('data agendamento: ', data);
        try {
            const schedule = await prisma.agendamentos_voluntariado.create({
                data: {
                    id_doador: data.id_doador,
                    id_instituicao: data.id_instituicao,
                    atividade: data.atividade,
                    data_hora: data.data_hora || new Date(),
                    confirmado: data.confirmado || false,
                    image: data.image,
                },
            });
            return schedule;
        } catch (error) {
            throw new Error(`Erro ao criar agendamento: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const schedules = await prisma.agendamentos_voluntariado.findMany({
                include: {
                    usuarios_agendamentos_voluntariado_id_doadorTousuarios: true,
                    usuarios_agendamentos_voluntariado_id_instituicaoTousuarios: true
                },
            });
            return schedules;
        } catch (error) {
            throw new Error(`Erro ao buscar agendamentos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const schedule = await prisma.agendamentos_voluntariado.findUnique({
                where: { id: parseInt(id) },
                include: {
                    usuarios_agendamentos_voluntariado_id_doadorTousuarios: true,
                    usuarios_agendamentos_voluntariado_id_instituicaoTousuarios: true
                },
            });
            if (!schedule) {
                throw new Error('Agendamento não encontrado');
            }
            return schedule;
        } catch (error) {
            throw new Error(`Erro ao buscar agendamento: ${error.message}`);
        }
    }

    async findByDonorId(req) {
        const { id_doador } = req.params;
        try {
            const schedules = await prisma.agendamentos_voluntariado.findMany({
                where: {
                    id_doador: Number(id_doador)
                },
                include: {
                    usuarios_agendamentos_voluntariado_id_instituicaoTousuarios: true
                }
            }).then(results => results.map((schedule) => ({
                ...schedule,
                instituicao: schedule.usuarios_agendamentos_voluntariado_id_instituicaoTousuarios
            })));
            console.log('schedules: ', schedules)
            return schedules;
        } catch (e) {
            throw new Error(`Erro ao buscar agendamentos: ${e.message}`);
        }
    }

    async findByInstitutionId(req) {
        const { id_instituicao } = req.params;
        try {
            const schedules = await prisma.agendamentos_voluntariado.findMany({
                where: {
                    id_instituicao: Number(id_instituicao)
                },
                include: {
                    usuarios_agendamentos_voluntariado_id_doadorTousuarios: true
                }
            }).then(results => results.map((schedule) => ({
                ...schedule,
                doador: schedule.usuarios_agendamentos_voluntariado_id_doadorTousuarios
            })));
            return schedules;
        } catch (e) {
            throw new Error(`Erro ao buscar agendamentos: ${e.message}`);
        }
    }

    async update(id, data) {
        try {
            const schedule = await prisma.agendamentos_voluntariado.update({
                where: { id: parseInt(id) },
                data: {
                    atividade: data.atividade,
                    data_hora: data.data_hora,
                    confirmado: data.confirmado,
                    image: data.image,
                },
            });
            return schedule;
        } catch (error) {
            throw new Error(`Erro ao atualizar agendamento: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await prisma.agendamentos_voluntariado.delete({
                where: { id: parseInt(id) },
            });
            return { message: 'Agendamento cancelado com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao deletar agendamento: ${error.message}`);
        }
    }
}

module.exports = new ScheduleService();