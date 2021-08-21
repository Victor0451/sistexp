const moment = require("moment");

let { transporter } = require("../../config/nodeMailer");

export default async function sendMail(req, res) {
  const mailData = {
    from: "victor.m.longo@gmail.com",
    to: `${req.body.operador}`,
    subject: `Audiencia Agendada`,
    text: `descripcion: ${req.body.title}, inicia: ${req.body.start}, termina:${req.body.end}, prioridad: ${req.body.priority}, expediente: ${req.body.expediente}`,
    html: `

    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>

    <h2>
    Notificacion de Audiencia Registrada
    </h2>

    </br>

    <div>
    <p><strong><u>Asunto</strong></u>: ${req.body.title}</P> 
    <p><strong><u>Inicia</strong></u>: ${moment(req.body.start).format(
      "DD/MM/YYYY HH:mm:ss"
    )}</p>
    <p><strong><u>Termina</strong></u> :${moment(req.body.end).format(
      "DD/MM/YYYY HH:mm:ss"
    )}</p> 
    <p><strong><u>Prioridad</strong></u>: ${
      req.body.priority == 1
        ? "Normal"
        : req.body.priority == 2
        ? "Importante"
        : req.body.priority == 3
        ? "Urgente"
        : null
    }</p> 
    <p><strong><u>Expediente</strong></u>: ${req.body.expediente}</p>
    </div>
    <p>Email enviado desde: SISTEXP - Sistema Informatico Para La Gestion De Expedientes.
     </p>

     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    </body>
  </html>

  `,
  };
  try {
    const response = await transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify(response));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
