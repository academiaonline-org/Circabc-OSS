import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: true,
  alfrescoURL: 'https://webgate.acceptance.ec.europa.eu/s-circabc/service/api',
  circabcURL:
    'https://webgate.acceptance.ec.europa.eu/s-circabc/service/circabc',
  serverURL: 'https://webgate.acceptance.ec.europa.eu/s-circabc/',
  baseHref: '/s-circabc/ui/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'acc',
  circabcRelease: 'echa',
  aresBridgeEnabled: false,
  aresBridgeServer: '',
  aresBridgeURL: '',
  aresBridgeKey: '',
  aresBridgeUiURL: '',
};
