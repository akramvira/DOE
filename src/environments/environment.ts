// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
//user this api url in production mode 'http://192.168.137.98:8076/api'

export const environment = {
  production: false,
 apiUrl : 'http://localhost:3000/api',
  //apiUrl : 'http://192.168.137.98:8083/api/v2',
  apiKey : { key : 'c1a821c0'}
};
