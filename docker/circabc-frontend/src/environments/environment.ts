import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: false,
  alfrescoURL: 'http://localhost:7001/service/api',
  circabcURL: 'http://localhost:7001/service/circabc',
  serverURL: 'http://localhost:7001/',
  baseHref: '/',
  nodeName: 'N1',
  showUiSwitch: true,
  environmentType: 'local',
  circabcRelease: 'ent',
  aresBridgeEnabled: false,
  aresBridgeServer: '',
  aresBridgeURL: '',
  aresBridgeKey: '',
  aresBridgeUiURL: '',
};
