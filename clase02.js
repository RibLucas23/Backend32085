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
        console.log(`Mascotas actuales: ${this.mascotas} \n_________________________________\n`);
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
        return console.log(`GET BOOK NAMES: \nLibros: ${this.libros.map(libro => `libro= ${libro.nombre} \n`)} \n_________________________________\n`);
    }
}
const persona = new Usuario('Juan', 'Perez', ['El señor de los anillos', 'El señor de los anillos 2'], ['Perro', 'Gato']);



persona.getFullname();
persona.addMascota('Caballo', "leon");
persona.CountMascotas();
persona.addBook('El arte de ensoñar', 'Carlos Castaneda')
persona.addBook('el señor de los anillos', 'J.R.R. Tolkien')
persona.getBookNames();
console.log(persona.libros) //agregue este console.log para ver porque no se muestra el libro en la funcion getBookNames(). es porque los otros libros no tienen valor libros.nombre