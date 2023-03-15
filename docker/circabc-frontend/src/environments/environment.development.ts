// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: false,
  alfrescoURL: 'https://circabc.development.europa.eu/service/api',
  circabcURL: 'https://circabc.development.europa.eu/service/circabc',
  serverURL: 'https://circabc.development.europa.eu/',
  baseHref: '/ui/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'dev',
  circabcRelease: 'ent',
  aresBridgeEnabled: false,
  aresBridgeServer: 'https://intragate.development.ec.europa.eu',
  aresBridgeURL:
    'https://intragate.development.ec.europa.eu/Ares-aresd/bridge/services/v1',
  aresBridgeKey: 'c4c750c74d8e44beb36e12ed9c8db2ab',
  aresBridgeUiURL:
    'https://intragate.development.ec.europa.eu/Ares-aresd/bridge/ui',
};
