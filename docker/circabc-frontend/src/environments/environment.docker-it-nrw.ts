import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: false,
  alfrescoURL: '../service/api',
  circabcURL: '../service/circabc',
  serverURL: '../',
  baseHref: '/ui/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'prod',
  circabcRelease: 'oss',
  aresBridgeEnabled: false,
  aresBridgeServer: '',
  aresBridgeURL: '',
  aresBridgeKey: '',
  aresBridgeUiURL: '',
};
