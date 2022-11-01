
class ContenedorMemoria {
    constructor(contenido) {
        this.contenido = []
    }

    async getAll() {
        try {
            const todo = await this.contenido
            return todo
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            let DB = await this.contenido
            let objeto = DB.find(objeto => objeto.ID == id)
            if (!objeto) {
                const error = new Error(`no hay nada con  ID: ${id} `)
                error.status = 404
                throw error
            }
            return objeto
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async create(data) {
        try {
            await this.contenido.push(data);
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async update(id, objetoNuevo) {
        try {
            let index = this.contenido.findIndex(objeto => objeto.id == id)
            if (!index) {
                const error = new Error(`no hay nada con  ID: ${id} `)
                error.status = 404
                throw error
            }
            this.contenido[index] = objetoNuevo
            return this.contenido
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async removeAll() {
        try {
            return this.contenido = []

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
    async remove(id) {
        try {
            let DB = await this.contenido
            DB = DB.filter(objeto => objeto.id != id)
            this.removeAll()
            this.contenido = DB
            return DB

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }




}


export default ContenedorMemoria