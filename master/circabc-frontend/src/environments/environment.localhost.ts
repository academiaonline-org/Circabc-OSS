import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: true,
  // alfrescoURL: 'http://localhost:8080/circabc/service/api',
  // circabcURL: 'http://localhost:8080/circabc/service/circabc',
  // serverURL: 'http://localhost:8080/circabc',
  alfrescoURL: 'https://localhost:7002/service/api',
  circabcURL: 'https://localhost:7002/service/circabc',
  serverURL: 'https://localhost:7002/',
  baseHref: '/ui',
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
