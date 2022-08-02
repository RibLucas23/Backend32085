const fs = require('fs/promises');
// const ruta = './clase04.json'

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }


    async getAll() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objetos)
        } catch (error) {
            return []
        }
    }

    async guardar(obj) {
        const objetos = await this.getAll()
        let newId
        if (objetos.length == 0) {
            newId = 1
        } else {
            newId = objetos[objetos.length - 1].id + 1
        }
        const newObjeto = { ...obj, id: newId }
        objetos.push(newObjeto)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newObjeto;
        } catch (error) {
            console.log(`Error al  guardar`)
        }
    }

    async getById(id) {
        const objetos = await this.getAll()
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
    async deleteById(id) {
        const objetos = await this.getAll()
        try {
            const obj = objetos.find(obj => obj.id == id)
            if (obj == undefined) {
                console.log(`No existe el objeto con id ${id}`)
            } else {
                const newObjetos = objetos.filter(obj => obj.id != id)
                await fs.writeFile(this.ruta, JSON.stringify(newObjetos, null, 2))
                return obj, console.log(obj)
            }

        } catch (error) {
            console.log(`Error al  deleteById`)
        }
    }
    async deleteAll() {
        const objetos = await this.getAll()
        try {
            const newObjetos = []
            await fs.writeFile(this.ruta, JSON.stringify(newObjetos, null, 2))
            return objetos, console.log(objetos)
        } catch (error) {
            console.log(`Error al  deleteAll`)
        }
    }



}
async function main() {
    const contenedor = new Contenedor('./clase04.json')
    await contenedor.guardar({ nombre: 'teclado', precio: 880 })
    await contenedor.guardar({ nombre: 'monitor', precio: 700 })
    await contenedor.guardar({ nombre: 'mouse', precio: 120 })
    await contenedor.guardar({ nombre: 'guitarra', precio: 188 })
    console.log(await contenedor.getAll())
    await contenedor.getById(1)
    await contenedor.deleteById(4)
    console.log(await contenedor.getAll())
    // await contenedor.deleteAll()
    console.log(await contenedor.getAll())

}
main()


