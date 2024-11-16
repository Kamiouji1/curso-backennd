const express = require ('express'); // Importa o framework Express.js
const router = express.Router() // Cria um objeto de roteamento
const { v4: uuidv4 } = require('uuid'); // Importa a função uuidv4 para gerar IDs únicos
const usuarioMid = require ('../middleware/validarUsuario.middleware')

const { Usuario} = require ('../db/models')

module.exports = router

router.post('/', usuarioMid)
router.put('/', usuarioMid)

// GET - Listar todos os usuários
router.get('/', async (req, res)=> {
    const usuarios = await Usuario.findAll()
    res.json({usuarios: usuarios})
})

// GET - Obter um usuário pelo ID
router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id)
    
    res.json({usuarios: usuario}) // Corrigido: usar 'usuario' ao invés de 'usuarios'
})

router.post('/', async (req, res) => {
    const usuario = await Usuario.create(req.body)
    res.json({msg: "Usuario criado com sucesso!"})
});

// DELETE - Deletar um usuário pelo ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findByPk(id)
    if(usuario){ // Corrigido: usar 'usuario' ao invés de 'post'
        await usuario.destroy()
        res.json({msg: 'Usuario deletado com sucesso!'})
    }else{
        res.status(400).json({msg: 'Id não encontrado'})
    }
})

// PUT - Atualizar um usuário pelo ID
router.put('/:id', usuarioMid, async (req, res) => {

    const id = req.params.id
    const usuario = await Usuario.findByPk(id)

    if(usuario){ // Corrigido: usar 'usuario' ao invés de 'usuarios'
        usuario.email = req.body.email
        usuario.senha = req.body.senha
        await usuario.save()
        res.json({msg: "Usuario atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: 'Id não encontrado'})
    }
})

function prepararResultado(usuario){
    const result = Object.assign({}, usuario)

    if(result.createdAt) delete result.createdAt //remove o resultado do createdAt
    if(result.updatedAt) delete result.updatedAt //remove o resultado do updatedAt
    
    return result
}