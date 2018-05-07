// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

//exp//ort const environment = {
//  production: false,
//  domain: 'http://localhost:4200',
//  apiUrl: 'http://api-test.oceano.com',
//  dsUrl: 'http://ds-test.oceano.com',
//  ssoLoginUrl: 'http://sso-test.oceano.com/sso/login',
//  pathPublic: 'public',
//  pathLogin: 'login',
//  pathRegistro: 'registro',
//  pathPassRecovery: 'recuperar'
//};

export const environment = {
  production: false,
  
  domain: 'http://localhost:4200',
  apiUrl: './mocks',
  dsUrl: 'http://ds-test.oceano.com',
  suiteUrl: 'http://suite.oceano.com/',
  
  pathPublic: 'public',
  pathLogin: 'login',
  pathRegistro: 'registro',
  pathPassRecovery: 'recuperar',

  pathCampus: 'campus',
  pathAcount: 'mi-cuenta',
  pathCourses: 'mis-cursos',
  pathCertificates: 'mis-certificados',

  ssoLoginUrl: 'http://sso-test.oceano.com/sso/login',

  recoveryMail: 'recovery-mail.json',
  newPassword: 'recovery-mail.json',
  getConsumerProducts: './mocks/list-products.json'
};