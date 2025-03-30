// services/UserService.js
const { prisma } = require('../database');
const jwt = require('jsonwebtoken');

class UserService {

    async login (data) { 
        try{ 
            const {email, password} = data;
            console.log('email: ', email);
            console.log('password: ', password)
            const user = await this.findByEmaill(email);
            if(!user){ 
                throw new Error(`Erro ao Fazer Login: usuário não encontrado!`);
            };
            if (!(user.senha === password)){
               throw new Error(`Senha incorreta!`);
            }
            const secretKey = 'secret';
            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '3h' });
            return { 
                user,
                token
            };
        }catch(e){ 
            throw new Error(`Erro ao Fazer Login: ${e.message}`);
        }
    }

    async create(data) {
        try {
            const user = await prisma.usuarios.create({
                data: {
                    id_tipo_usuario: data.id_tipo_usuario,
                    cnpj: data.cnpj,
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha, // Em produção, você deve hashear a senha
                    image: data.image,
                    created_at: data.created_at || new Date(),
                },
            });
            return user;
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const users = await prisma.usuarios.findMany({
                include: {
                    tipo_usuario: true,
                },
            });
            return users;
        } catch (error) {
            throw new Error(`Erro ao buscar usuários: ${error.message}`);
        }
    }

    async findInstitutionUsers(){ 
        try{ 
            const data = await prisma.usuarios.findMany({ 
                where :  {
                    id_tipo_usuario : 2
                },
                include:  {
                    tipo_usuario : true
                }
            });
            if(!data){ 
                throw new Error('Nenhuma instituição encontrada!');
            }
            console.log('institutions: ', data)
            return data;
        }catch(e){ 
            throw e;
        }
    }

    async findByEmaill(email){ 
        try{ 
            const user = await prisma.usuarios.findUnique({
                where: { email: email },
                include: {
                    tipo_usuario: true,
                },
            });
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            return user;
        }catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const user = await prisma.usuarios.findUnique({
                where: { id: parseInt(id) },
                include: {
                    tipo_usuario: true,
                },
            });
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const user = await prisma.usuarios.update({
                where: { id: parseInt(id) },
                data: {
                    id_tipo_usuario: data.id_tipo_usuario,
                    cnpj: data.cnpj,
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha, // Em produção, hashear a senha
                    image: data.image,
                },
            });
            return user;
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await prisma.usuarios.delete({
                where: { id: parseInt(id) },
            });
            return { message: 'Usuário deletado com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }
}

module.exports = new UserService();