import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: true,
  alfrescoURL: 'https://circabc.europa.eu/service/api',
  circabcURL: 'https://circabc.europa.eu/service/circabc',
  serverURL: 'https://circabc.europa.eu/',
  baseHref: '/ui/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'prod',
  circabcRelease: 'ent',
  aresBridgeEnabled: false,
  aresBridgeServer: '',
  aresBridgeURL: '',
  aresBridgeKey: '',
  aresBridgeUiURL: '',
};
