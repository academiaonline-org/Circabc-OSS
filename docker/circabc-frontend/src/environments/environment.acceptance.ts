import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: true,
  alfrescoURL: 'https://circabc.acceptance.europa.eu/service/api',
  circabcURL: 'https://circabc.acceptance.europa.eu/service/circabc',
  serverURL: 'https://circabc.acceptance.europa.eu/',
  baseHref: '/ui/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'acc',
  circabcRelease: 'ent',
  aresBridgeEnabled: false,
  aresBridgeServer: 'https://intragate.test.ec.europa.eu',
  aresBridgeURL:
    'https://intragate.test.ec.europa.eu/Ares_pg/bridge/services/v1',
  aresBridgeKey: 'c4c750c74d8e44beb36e12ed9c8db2ab',
  aresBridgeUiURL: 'https://intragate.test.ec.europa.eu/Ares_pg/bridge/ui',
};
