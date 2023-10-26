const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
//Establecemos la conexión
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'vepic_Company'
})
//Conexión a la database
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("¡Conexión exitosa a la base de datos!")
    }
})


app.get('/', function(req,res){
    res.send('home')
})
//Obtener todos los animes
app.get('/api/animes', (req,res)=>{
    conexion.query('SELECT * FROM animes', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
            
        }
    })
})
//Obtener un solo anime
app.get('/api/animes/:name', (req,res)=>{
    conexion.query('SELECT * FROM animes WHERE name = ?', [req.params.name], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})
//Insertar un anime
app.post('/api/animes', (req,res)=>{
    let data = {
        description: req.body.description, 
        name: req.body.name, 
        date: req.body.date,
        image: req.body.image,
        url: req.body.url
    }
    let sql = "INSERT INTO animes SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})
//Editar un anime
app.put('/api/animes/:id', (req, res)=>{
    let id = req.params.id
    let description = req.body.description
    let name = req.body.name
    let date = req.body.date
    let image = req.body.image
    let url = req.body.url
    let sql = "UPDATE animes SET description = ?, name = ?, date = ?, image = ?, url = ? WHERE id = ?"
    conexion.query(sql, [description, name, date, image, url, id], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
})
//Eliminar un anime
app.delete('/api/animes/:id', (req,res)=>{
    conexion.query('DELETE FROM animes WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
})

//-------------------------------------------------------------------------------------------------

// //Obtener un solo usuario por id
// app.get('/api/animes/users/:id', (req,res)=>{
//     conexion.query('SELECT * FROM users WHERE id = ?', [req.params.id], (error, fila)=>{
//         if(error){
//             throw error
//         }else{
//             res.send(fila)
//         }
//     })
// })
//Obtener un solo usuario por username
app.get('/api/animes/users/:username', (req,res,next)=>{
    conexion.query('SELECT * FROM users WHERE username = ?', [req.params.username], (error, fila)=>{
        if(fila.length == 0){
            next("Invalid username or password")
        } else{
            res.send(fila)
        }
    })
})
//Crear un usuario
app.post('/api/animes/users', (req,res)=>{
    let data = {
        username: req.body.userName,
        password: req.body.password,
        birthdate: req.body.birthdate
    }
    let sql = "INSERT INTO users SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
              Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})
//Editar un usuario
app.put('/api/animes/users/:id', (req, res)=>{
    let id = req.params.id
    let username = req.body.username
    let password = req.body.password
    let birthdate = req.body.birthdate
    let sql = "UPDATE users SET username = ?, password = ?, birthdate = ? WHERE id = ?"
    conexion.query(sql, [username, password, birthdate, id], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
})
//Eliminar usuario
app.delete('/api/animes/users/:userName', (req,res)=>{
    conexion.query('DELETE FROM users WHERE username = ?', [req.params.userName], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
})

//
const puerto = process.env.PUERTO || 3001
app.listen(puerto, function(){
    console.log("Servidor Ok en puerto:"+puerto)
})