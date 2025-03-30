// services/NeedService.js
const { prisma } = require('../database');

class NeedService {
    // Criar uma nova necessidade
    async create(data) {
        try {
            const need = await prisma.necessidades.create({
                data: {
                    id_usuario: data.id_usuario,
                    item: data.item,
                    quantidade: data.quantidade,
                    ativo: data.ativo,
                    image: data.image,
                    created_at: data.created_at || new Date(),
                },
            });
            return need;
        } catch (error) {
            throw new Error(`Erro ao criar necessidade: ${error.message}`);
        }
    }

    async findByInstitutionId(id_instituicao) {
        try{ 
            const needs = await prisma.necessidades.findMany({ 
                where: { 
                    id_usuario : Number(id_instituicao)
                },
                include :  {
                    usuarios : true
                }
            }).then(results => results.map(need => ({
                ...need,
                usuario: need.usuarios
            })));
            return needs;
        }catch(e){ 
            throw new Error(`Erro ao buscar necessidades: ${e.message}`);

        }
    }

    // Buscar todas as necessidades
    async findAll() {
        try {
            const needs = await prisma.necessidades.findMany({
                include: {
                    usuarios: true, 
                },
            }).then(results => results.map(need => ({ 
                ...need,
                usuario : need.usuarios
            })));
            return needs;
        } catch (error) {
            throw new Error(`Erro ao buscar necessidades: ${error.message}`);
        }
    }

    async findByInstitutionUserId(id_usuario){ 
        try{ 
            const needs = await prisma.necessidades.findMany({ 
                where : { 
                    id_usuario : id_usuario
                },
                include: { 
                    usuarios : true
                }
            })
        }catch(e){ 
            throw new Error(`Erro ao buscar necessidades: ${error.message}`);

        }
    }

    // Buscar uma necessidade por ID
    async findById(id) {
        try {
            const need = await prisma.necessidades.findUnique({
                where: { id: parseInt(id) },
                include: {
                    usuarios: true,
                },
            });
            if (!need) {
                throw new Error('Necessidade não encontrada');
            }
            return need;
        } catch (error) {
            throw new Error(`Erro ao buscar necessidade: ${error.message}`);
        }
    }

    // Atualizar uma necessidade
    async update(id, data) {
        try {
            const need = await prisma.necessidades.update({
                where: { id: parseInt(id) },
                data: {
                    item: data.item,
                    quantidade: data.quantidade,
                    ativo: data.ativo,
                    image: data.image,
                },
            });
            return need;
        } catch (error) {
            throw new Error(`Erro ao atualizar necessidade: ${error.message}`);
        }
    }

    // Deletar uma necessidade
    async delete(id) {
        try {
            await prisma.necessidades.delete({
                where: { id: parseInt(id) },
            });
            return { message: 'Necessidade deletada com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao deletar necessidade: ${error.message}`);
        }
    }
}

module.exports = new NeedService();