class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    //Returnar nombre completo
    getFullname() {
        return console.log(`GET FULL NAME:\nNombre: ${this.nombre} \nApellido:${this.apellido}\n_________________________________\n`);
    }
    // Agregar mascota o mascotas
    addMascota(...mascotas) {
        console.log(`ADD MASCOTA: \nAgregando mascota: ${mascotas}`);
        return this.mascotas.push(mascotas), console.log(`Mascotas actuales: ${this.mascotas} \n_________________________________\n`);
    }

    //contar mascotas
    CountMascotas() {
        return console.log(`COUNT MASCOTAS: \nMascotas: ${this.mascotas.length} \n_________________________________\n`);
    }
    //agregar libro
    addBook(nombre, autor) {
        return this.libros.push({ nombre, autor }), console.log(`ADD BOOK: \nAgregando libro: ${nombre} \nAutor: ${autor} \n_________________________________\n`);
    }
    //retornar libros
    getBookNames() {
        return console.log(`GET BOOK NAMES: \nLibros: \n ${this.libros.map(libro => `libro: ${libro.nombre} \n`)} \n_________________________________\n`);
    }
}
const persona = new Usuario('Juan', 'Perez', [{ nombre: 'El señor de los anillos', autor: 'J.R.R. Tolkien' }], ['Perro', 'Gato']);



persona.getFullname();
persona.addMascota('Caballo', "leon");
persona.CountMascotas();
persona.addBook('El arte de ensoñar', 'Carlos Castaneda')
persona.addBook('Libro 2', 'autor 2')
persona.getBookNames();
