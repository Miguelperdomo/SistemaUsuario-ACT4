
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path'); // Importa el módulo path


const app = express();
const port = 3000;



// Configurar el middleware
app.use(bodyParser.json()); // Para analizar JSON en las solicitudes

// Servir archivos estáticos desde la carpeta actual
app.use(express.static(__dirname)); // __dirname se refiere a la carpeta actual

// Configuración de la conexión a MySQL

// Configuración de la conexión a MySQL
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistemasusuario'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Endpoint para manejar el inicio de sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Consulta a la base de datos para verificar las credenciales
  conexion.query('SELECT * FROM users WHERE email_user = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error en el servidor' });
      }
      if (results.length > 0) {
          // Las credenciales son correctas
          return res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
          // Credenciales inválidas
          return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  });
});


// app.get('/roles', (req, res) => {
//   conexion.query('SELECT * FROM roles', (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: 'Error en el servidor' });
//       }
//       res.json(results);
//   });
// });


app.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;
  console.log('Datos recibidos para registro:', req.body); // Log de datos recibidos

  // Inserción en la base de datos
  const query = 'INSERT INTO users (nombre_user, email_user, password) VALUES (?, ?, ?)';
  conexion.query(query, [nombre, email, password], (err, results) => { // Cambié 'res' a 'results'
      if (err) {
          console.error('Error al insertar usuario:', err); // Log del error
          return res.status(500).json({ error: 'Error en el servidor' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
  });
});





// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


