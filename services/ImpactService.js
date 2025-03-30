// services/ImpactService.js
const { prisma } = require('../database');

class ImpactService {
    async create(data) {
        try {
            const impact = await prisma.impacto.create({
                data: {
                    id_doador: data.id_doador,
                    id_instituicao: data.id_instituicao,
                    refeicoes_doadas: data.refeicoes_doadas,
                    pessoas_ajudadas: data.pessoas_ajudadas,
                    image: data.image,
                    updated_at: data.updated_at || new Date(),
                },
            });
            return impact;
        } catch (error) {
            throw new Error(`Erro ao criar impacto: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const impacts = await prisma.impacto.findMany({
                include: {
                    doador: true,
                    instituicao: true,
                },
            });
            return impacts;
        } catch (error) {
            throw new Error(`Erro ao buscar impactos: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const impact = await prisma.impacto.findUnique({
                where: { id: parseInt(id) },
                include: {
                    doador: true,
                    instituicao: true,
                },
            });
            if (!impact) {
                throw new Error('Impacto não encontrado');
            }
            return impact;
        } catch (error) {
            throw new Error(`Erro ao buscar impacto: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const impact = await prisma.impacto.update({
                where: { id: parseInt(id) },
                data: {
                    refeicoes_doadas: data.refeicoes_doadas,
                    pessoas_ajudadas: data.pessoas_ajudadas,
                    image: data.image,
                    updated_at: data.updated_at || new Date(),
                },
            });
            return impact;
        } catch (error) {
            throw new Error(`Erro ao atualizar impacto: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await prisma.impacto.delete({
                where: { id: parseInt(id) },
            });
            return { message: 'Impacto deletado com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao deletar impacto: ${error.message}`);
        }
    }
}

module.exports = new ImpactService();