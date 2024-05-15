const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  // app.use(function(req, res, next){
  //     res.header(
  //         "Access-Control-Allow-Headers",
  //         "Access-Control-Allow-Credentials", "true",
  //         "Origin, Content-Type, Accept"
  //     );
  //     next();
  // });

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Set this to 'true'
    next();
});

  app.post(
    '/api/auth/signup',
    [verifySignUp.checkDuplicateUserOrEmail, verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.post('/api/auth/signin', controller.signin);

  app.post('/api/auth/signout', controller.signout);
};
