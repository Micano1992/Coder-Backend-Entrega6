const express = require('express')
const fs = require('fs')

const PORT = process.env.PORT || 8081

const app = express();

class Contenedor {

    constructor(ruta) {
        this.ruta = ruta
    }

    getAll = async () => {

        try {
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')

            const productos = JSON.parse(contenido)

            return productos

        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

    getById = async (id) => {

        try {

            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')

            const productos = JSON.parse(contenido)

            const productoBuscado = productos.find(prod => prod.id == id)

            return productoBuscado
        }
        catch (err) {
            console.log(`Se produjo un error: ${err}`)
        }
    }

}


const nContenedor = new Contenedor('./productos.txt')

app.get('/', (req, res) => {
    res.send(`<h1>Levanta<h1/>`)
})

app.get('/productos', (req, res) => {

    nContenedor.getAll()
        .then((resultado) => {
            console.log("Metodo getAll")
            console.log(resultado)
            res.send(resultado)
        })



})

app.get('/productoRandom', (req, res) => {
    nContenedor.getAll()
        .then((resultado) => {

            let numRandom = Math.floor(Math.random() * resultado.length);
            nContenedor.getById(numRandom + 1)
                .then((resultado) => {

                    res.send(resultado)
                })
        })
})

app.listen(PORT, () => { console.log(`Servidor activo en puerto: ${PORT}`) })
