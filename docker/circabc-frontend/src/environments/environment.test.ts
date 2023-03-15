import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: true,
  alfrescoURL: 'https://circabc.test.europa.eu/service/api',
  circabcURL: 'https://circabc.test.europa.eu/service/circabc',
  serverURL: 'https://circabc.test.europa.eu/',
  baseHref: '/ui/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'test',
  circabcRelease: 'ent',
  aresBridgeEnabled: false,
  aresBridgeServer: '',
  aresBridgeURL: '',
  aresBridgeKey: '',
  aresBridgeUiURL: '',
};
