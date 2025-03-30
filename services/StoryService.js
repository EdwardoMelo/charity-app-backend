
// services/StoryService.js
const { prisma } = require('../database');

class StoryService {
    async create(data) {
        try {
            const story = await prisma.historias.create({
                data: {
                    id_usuario: data.id_usuario,
                    titulo: data.titulo,
                    relato: data.relato,
                    image: data.image,
                    created_at: data.created_at || new Date(),
                },
            });
            return story;
        } catch (error) {
            throw new Error(`Erro ao criar história: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const stories = await prisma.historias.findMany({
                include: {
                    usuarios: true,
                },
            });
            console.log('stories: ', stories)
            return stories;
        } catch (error) {
            throw new Error(`Erro ao buscar histórias: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const story = await prisma.historias.findUnique({
                where: { id: parseInt(id) },
                include: {
                    usuario: true,
                },
            });
            if (!story) {
                throw new Error('História não encontrada');
            }
            return story;
        } catch (error) {
            throw new Error(`Erro ao buscar história: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const story = await prisma.historias.update({
                where: { id: parseInt(id) },
                data: {
                    titulo: data.titulo,
                    relato: data.relato,
                    image: data.image,
                },
            });
            return story;
        } catch (error) {
            throw new Error(`Erro ao atualizar história: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await prisma.historias.delete({
                where: { id: parseInt(id) },
            });
            return { message: 'História deletada com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao deletar história: ${error.message}`);
        }
    }
}

module.exports = new StoryService();