var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose =require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter=require('./routes/todos')
var imageRouter=require('./routes/image')
var loginRouter=require('./routes/login')
var produitRouter=require('./routes/produit')
var fournisseurRouter=require('./routes/fournisseur')
var categorieRouter=require('./routes/categorie')
var packRouter=require('./routes/pack')
var clientRouter=require('./routes/client')
var commandeRouter=require('./routes/commande')

var cron =require('node-cron');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos',todosRouter);
app.use('/images',imageRouter);
app.use('/logins',loginRouter);
app.use('/produits',produitRouter);
app.use('/categorie',categorieRouter);
app.use('/fournisseurs',fournisseurRouter);
app.use('/packs',packRouter);
app.use('/clients',clientRouter);
app.use('/commandes',commandeRouter);
app.use('/upload', express.static('upload'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

var mongoDB ='mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true}).then(
  ()=>{console.log("connected to db");
  app.listen(3000);
}
).catch(err=>{8 
  console.log(err);
})

module.exports = app;