const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); //*Para que nuestro servidor sea capaz de parsear (interpretar) los datos en formato JSON dentro de nuestros controladores bajo el cuerpo de la petición (en el "req.body")

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// Handle the POST request for summing the two numbers
app.post('/resultado', (req, res) => {
  const numero1 = parseInt(req.body.numero1);
  const numero2 = parseInt(req.body.numero2);

  if (isNaN(numero1) || isNaN(numero2)) {
    res.send(`
    <h1>Resultado</h1>
    <p>Los valores ingresados no son números enteros válidos.</p>
    <a href="/">Volver al inicio</a>
    `);
  } else {
    const resultado = numero1 + numero2;
    res.redirect(`/resultado?numero1=${numero1}&numero2=${numero2}&resultado=${resultado}`);
  }
});

// Serve the resultado.html file with the result of the sum
app.get("/resultado", (req, res) => {
  const numero1 = parseInt(req.query.numero1);
  const numero2 = parseInt(req.query.numero2);
  const resultado = parseInt(req.query.resultado);

  res.send(`
    <h1>Resultado</h1>
    <p>${numero1} + ${numero2} = ${resultado}</p>
    <a href="/">Volver al inicio</a>
  `);
});

// Serve the error.html file in case of invalid input
app.get("/error", (req, res) => {
  res.send(`
    <h1>Error</h1>
    <p>Por favor ingrese dos números válidos.</p>
    <a href="/">Volver al inicio</a>
  `);
});

app.listen(3000, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});