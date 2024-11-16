const express = require('express')
const rotaUsuario = require('./rotas/usuario.rot')
const rotaPost = require ('./rotas/posts.rota')
var expressLayouts = require('express-ejs-layouts')

const indexRoute = require('./rotas/index.rota')

const app = express()

app.use(express.json())
app.set('view engine', 'ejs')

app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.use('/static', express.static('public'))

app.use('/api/usuarios', rotaUsuario)
app.use('/api/posts', rotaPost)

app.use('/', indexRoute)

app.get('/api', (req, res) =>{
    res.json({msg:'Hello from Express!'})
})

app.listen(8080, () => {
    console.log(`Iniciando o ambiente ${process.env.NODE_ENV}`)
    console.log('Server rodando na porta 8080')
})