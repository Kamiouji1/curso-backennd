const express = require('express')
const rotaUsuario = require('./rotas/usuario.rot')
const rotaPost = require ('./rotas/posts.rota')
var expressLayouts = require('express-ejs-layouts')

const app = express()

app.use(express.json())
app.set('view engine', 'ejs')

app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.use('/static', express.static('public'))

app.use('/usuarios', rotaUsuario)
app.use('/posts', rotaPost)



app.get('/', (req, res) =>{
    res.json({msg:'Hello from Express!'})
})

app.get('/home', (req, res) => { // quando o usuario acessar /home
    const number = Math.random()
    res.render('pages/index', {variavel: number})    // renderiza a pagina index que ta dentro de pages
})

app.get('/cursos', (req, res) => { // quando o usuario acessar /home
    const cursos = [
        {nome: "Programação Frontend", ch: 280},
        {nome: "Programação backend", ch: 300},
        {nome: "Programação SQL", ch: 189}
    ]
    res.render('pages/cursos/index', {cursos: cursos})    // renderiza a pagina index que ta dentro de pages
})

app.get('/alunos', (req, res) => { 
    const alunos = [
        {nome: "João"},
        {nome: "Maria"},
        {nome: "Pedro"},
        
    ]
    res.render('pages/alunos/index',{alunos: alunos})
})


app.listen(8080, () => {
    console.log(`Iniciando o ambiente ${process.env.NODE_ENV}`)
    console.log('Server rodando na porta 8080')
})