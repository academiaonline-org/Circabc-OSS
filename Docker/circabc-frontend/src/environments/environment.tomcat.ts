import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: false,
  alfrescoURL: '../service/api',
  circabcURL: '../service/circabc',
  serverURL: 'http://localhost:8080/',
  baseHref: '/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'local',
  circabcRelease: 'oss',
  aresBridgeEnabled: false,
  aresBridgeServer: '',
  aresBridgeURL: '',
  aresBridgeKey: '',
  aresBridgeUiURL: '',
};
