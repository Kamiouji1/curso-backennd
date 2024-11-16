const express = require('express')
const rotaUsuario = require('./rotas/usuario.rot')
const rotaPost = require ('./rotas/posts.rota')

const app = express()
app.use(express.json())

app.use('/static', express.static('public'))

app.use('/usuarios', rotaUsuario)
app.use('/posts', rotaPost)



app.get('/', (req, res) =>{
    res.json({msg:'Hello from Express!'})
})


app.listen(8080, () => {
    console.log(`Iniciando o ambiente ${process.env.NODE_ENV}`)
    console.log('Server rodando na porta 8080')
})