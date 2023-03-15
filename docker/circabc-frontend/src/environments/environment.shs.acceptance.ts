import { Environment } from 'environments/environment.interface';

export const environment: Environment = {
  production: true,
  alfrescoURL: 'https://acceptance.classified.circabc.europa.eu/service/api',
  circabcURL: 'https://acceptance.classified.circabc.europa.eu/service/circabc',
  serverURL: 'https://acceptance.classified.circabc.europa.eu/',
  baseHref: '/ui/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'acc',
  circabcRelease: 'ent',
  aresBridgeEnabled: false,
  aresBridgeServer: '',
  aresBridgeURL: '',
  aresBridgeKey: '',
  aresBridgeUiURL: '',
};
