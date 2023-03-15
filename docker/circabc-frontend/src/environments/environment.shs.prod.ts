import { Environment } from 'environments/environment.interface';

export const environment: Environment = {
  production: true,
  alfrescoURL: 'https://classified.circabc.europa.eu/service/api',
  circabcURL: 'https://classified.circabc.europa.eu/service/circabc',
  serverURL: 'https://classified.circabc.europa.eu/',
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
