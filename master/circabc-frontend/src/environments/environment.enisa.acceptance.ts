import { Environment } from 'environments/environment.interface';

export const environment: Environment = {
  production: true,
  alfrescoURL: 'https://cermit.acceptance.enisa.europa.eu/service/api',
  circabcURL: 'https://cermit.acceptance.enisa.europa.eu/service/circabc',
  serverURL: 'https://cermit.acceptance.enisa.europa.eu/',
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
