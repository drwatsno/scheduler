
var providers = {};

try {
  providers = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}


var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

var path = require('path');
app.set('views', path.join(__dirname, 'views'));

var started = new Date();
var uptime = function() {
  return {
    started: started,
    uptime: (Date.now() - Number(started)) / 1000
  }
}

app.get('/', function(req, res, next) {
  res.render('pages/index', {
    status: JSON.stringify(uptime()),
    providers: providers
  });
});

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/local', function(req, res, next) {
  res.render('pages/local', {
    user: req.user,
    url: req.url,
  });
});

app.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next) {
  res.render('pages/loginProfiles', {
    user: req.user,
    url: req.url,
  });
});

app.get('/login', function(req, res, next) {
  res.render('pages/login', {
    providers: providers,
    user: req.user,
    url: req.url,
  });
});

app.get('/auth/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

app.get('/signup', function(req, res, next) {
  res.render('pages/signup', {
    user: req.user,
    url: req.url,
  });
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  console.log("application booted");

  for (var m in app.models) {
    console.log(m);
  }

  // create and configure passport

  var passportConfigurator = new require('loopback-component-passport').PassportConfigurator(app);

  passportConfigurator.init();

  passportConfigurator.setupModels({
    userModel: app.models.User,
    userIdentityModel: app.models.UserIdentity,
    userCredentialModel: app.models.UserCredential
  });

  for (var s in providers) {
    var c = providers[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
    console.log("configuring passport provider:", s);
  }

  // The access token is only available after boot
  app.middleware('auth', loopback.token({
    model: app.models.AccessToken,
  }));


  app.post('/signup', function(req, res, next) {
    var User = app.models.User;

    var newUser = {};
    newUser.email = req.body.email.toLowerCase();
    newUser.username = req.body.username.trim();
    newUser.password = req.body.password;

    User.create(newUser, function(err, user) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('back');
      } else {
        // Passport exposes a login() function on req (also aliased as logIn())
        // that can be used to establish a login session. This function is
        // primarily used when users sign up, during which req.login() can
        // be invoked to log in the newly registered user.
        req.login(user, function(err) {
          if (err) {
            req.flash('error', err.message);
            return res.redirect('back');
          }
          return res.redirect('/auth/account');
        });
      }
    });
  });

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();

});
