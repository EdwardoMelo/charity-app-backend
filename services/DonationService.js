// services/DonationService.js
const { prisma } = require('../database');

class DonationService {
    async create(data) {
        console.log('data: ', data)
        try {
            const donation = await prisma.doacoes.create({
                data: {
                    id_doador: data.id_doador,
                    id_instituicao: data.id_instituicao,
                    valor: data.valor,
                    data_doacao: data.data_doacao || new Date(),
                    comprovante_url: data.comprovante_url,
                    image: data.image,
                },
            });
            return donation;
        } catch (error) {
            throw new Error(`Erro ao criar doação: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const donations = await prisma.doacoes.findMany({
                include: {
                    usuarios_doacoes_id_doadorTousuarios: true,
                    usuarios_doacoes_id_instituicaoTousuarios: true
                },
            });
            return donations;
        } catch (error) {
            throw new Error(`Erro ao buscar doações: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const donation = await prisma.doacoes.findUnique({
                where: { id: parseInt(id) },
                include: {
                    doador: true,
                    instituicao: true,
                },
            });
            if (!donation) {
                throw new Error('Doação não encontrada');
            }
            return donation;
        } catch (error) {
            throw new Error(`Erro ao buscar doação: ${error.message}`);
        }
    }

    async findByDonorId(req) {
        //saber para quais instituições
        const {id_doador} = req.params;
        try {
            const donations = await prisma.doacoes.findMany({
                where: {
                    id_doador: Number(id_doador)
                },
                include : { 
                    usuarios_doacoes_id_instituicaoTousuarios : true
                }
            }).then(results => results.map((donation) => ({ 
                ...donation,
                instituicao: donation.usuarios_doacoes_id_instituicaoTousuarios
            })));
            console.log('donations: ', donations.length)
            return donations;
        } catch (e) {
            throw e;
        }
    }

    async findByInstitutionId(req) {
        const {id_instituicao} = req.params;
        try {
            const donations = await prisma.doacoes.findMany({ 
                where: { 
                    id_instituicao: Number(id_instituicao)
                },
                include: { 
                    usuarios_doacoes_id_doadorTousuarios : true
                }
            }).then(results => results.map((donation) => ({ 
                ...donation,
                doador: donation.usuarios_doacoes_id_doadorTousuarios
            })));
            return donations;
        } catch (e) {
            throw new Error(`Erro ao buscar doação: ${e.message}`);

        }
    }

    async update(id, data) {
        try {
            const donation = await prisma.doacoes.update({
                where: { id: parseInt(id) },
                data: {
                    valor: data.valor,
                    data_doacao: data.data_doacao,
                    comprovante_url: data.comprovante_url,
                    image: data.image,
                },
            });
            return donation;
        } catch (error) {
            throw new Error(`Erro ao atualizar doação: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await prisma.doacoes.delete({
                where: { id: parseInt(id) },
            });
            return { message: 'Doação deletada com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao deletar doação: ${error.message}`);
        }
    }
}

module.exports = new DonationService();