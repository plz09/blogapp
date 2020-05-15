//Carregando módulos

  const express = require('express');
  const exphbs = require('express-handlebars');
  const Handlebars = require('handlebars')
  const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
  const bodyParser = require('body-parser');
  const app = express();
  const admin = require("./routes/admin");
  const path = require("path");
  const mongoose = require("mongoose");
  const session = require("express-session");
  const flash = require("connect-flash");
  
  

//Configurações 
  // Session
    app.use(session({
      secret: "cursodenode",
      resave: true,
      saveUninitialized: true
    }));
    app.use(flash());
  // Middleware
    app.use((req, res, next) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      next();
    })
  //Body Parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

  //Handlebars
    /*app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');*/

    const hbs = exphbs.create({
      defaultLayout: 'main', 
      extname: 'handlebars',
      handlebars: allowInsecurePrototypeAccess(Handlebars)
    });

    app.engine('handlebars', hbs.engine); 
    app.set('view engine', 'handlebars');
    app.set('views', 'views');


  //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/blogapp').then(() => {
      console.log("Conectado ao Mongo")
    }).catch((err) => {
      console.log("Erro ao se conectar: " + err)
    })

  //Public
    app.use(express.static(path.join(__dirname, "public")));

    app.use((req, res, next) => {
      console.log("Eu sou um middleware");
      next();
    })

//Rotas

  app.use('/admin', admin);

//Outros

const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando")
});
