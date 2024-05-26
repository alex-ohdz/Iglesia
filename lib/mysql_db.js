import mysql from 'mysql';

export const connectToDatabase = mysql.createConnection({
        host: 'localhost',
        user: 'myuser',
        password: 'mypassword',
        database: 'mydatabase'
    }).connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return null; // Retornar null si hay un error en la conexión
        }
        console.log('Conexión exitosa a la base de datos MySQL');
    });

function executeQuery(query, callback) {
    const connection = connectToDatabase();

    if (!connection) {
        // Si no se pudo establecer la conexión, ejecutar el callback con un error
        callback(new Error('No se pudo conectar a la base de datos'));
        return;
    }

    // Ejecutar la consulta
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            callback(err); // Ejecutar el callback con el error
            return;
        }
        callback(null, results); // Ejecutar el callback con los resultados
        connection.end(); // Cerrar la conexión después de ejecutar la consulta
    });
}
