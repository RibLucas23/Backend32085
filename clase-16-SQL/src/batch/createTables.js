import knex from 'knex';
import { config } from '../utils/config.js';

const knexCli = knex(config.db);

knexCli.schema.dropTableIfExists('productos')
    .then(() => {
        knexCli.schema.createTable('productos', table => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.string('price', 50).notNullable();
            table.string('thumbnail', 250).notNullable();
        })
            .then(() => console.log("Tabla creada"))
            .catch(err => {
                console.log(err);
                throw err;
            })
            .finally(() => {
                knexCli.destroy();
            });
    });

knexCli.schema.dropTableIfExists('mensajes')
    .then(() => {
        knexCli.schema.createTable('mensajes', table => {
            table.increments('id').primary();
            table.string('nombre', 50).notNullable();
            table.string('mensaje', 150).notNullable();
        })
            .then(() => console.log("Tabla creada"))
            .catch(err => {
                console.log(err);
                throw err;
            })
            .finally(() => {
                knexCli.destroy();
            });
    });

