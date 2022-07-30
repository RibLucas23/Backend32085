const fs = require('fs/promises');
const ruta = './clase04.json'

class Contenedor {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

async function getAll() {
    try {
        const objetos = await fs.readFile(ruta, 'utf-8')
        return JSON.parse(objetos)
    } catch (error) {
        return []
    }
}

async function guardar(obj) {
    const objetos = await getAll()
    let newId
    if (objetos.length == 0) {
        newId = 1
    } else {
        newId = objetos[objetos.length - 1].id + 1
    }
    const newObjeto = { ...obj, id: newId }
    objetos.push(newObjeto)
    try {
        await fs.writeFile(ruta, JSON.stringify(objetos, null, 2))
        return newObjeto;
    } catch (error) {
        console.log(`Error al  guardar`)
    }
}

async function getById(id) {
    const objetos = await getAll()
    try {

        const obj = objetos.find(obj => obj.id == id)
        if (obj == undefined) {
            console.log(`No existe el objeto con id ${id}`)
        } else {
            return obj, console.log(obj)
        }

    } catch (error) {
        console.log(`Error al  getById`)
    }
}
async function deleteById(id) {
    const objetos = await getAll()
    try {
        const obj = objetos.find(obj => obj.id == id)
        if (obj == undefined) {
            console.log(`No existe el objeto con id ${id}`)
        } else {
            const newObjetos = objetos.filter(obj => obj.id != id)
            await fs.writeFile(ruta, JSON.stringify(newObjetos, null, 2))
            return obj, console.log(obj)
        }

    } catch (error) {
        console.log(`Error al  deleteById`)
    }
}
async function deleteAll() {
    const objetos = await getAll()
    try {
        const newObjetos = []
        await fs.writeFile(ruta, JSON.stringify(newObjetos, null, 2))
        return objetos, console.log(objetos)
    } catch (error) {
        console.log(`Error al  deleteAll`)
    }
}



async function main() {
    await guardar(new Contenedor('teclado', 880))
    await guardar(new Contenedor('monitor', 700))
    await guardar(new Contenedor('mouse', 120))
    await guardar(new Contenedor('guitarra', 1880))
    console.log(await getAll())
    await getById(1)
    await deleteById(4)
    console.log(await getAll())
    await deleteAll()
    console.log(await getAll())

}
main()


