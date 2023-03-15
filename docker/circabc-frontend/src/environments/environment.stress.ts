import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: false,
  alfrescoURL: 'https://circabc.stress.europa.eu/service/api',
  circabcURL: 'https://circabc.stress.europa.eu/service/circabc',
  serverURL: 'https://circabc.stress.europa.eu/',
  baseHref: '/ui/',
  nodeName: 'S1',
  showUiSwitch: true,
  environmentType: 'stress',
  circabcRelease: 'ent',
  aresBridgeEnabled: false,
  aresBridgeServer: '',
  aresBridgeURL: '',
  aresBridgeKey: '',
  aresBridgeUiURL: '',
};
