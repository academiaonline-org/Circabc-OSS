import { Environment } from 'environments/environment.interface';

// tslint:disable:no-http-string
export const environment: Environment = {
  production: false,
  alfrescoURL: '/circabc/service/api',
  circabcURL: '/circabc/service/circabc',
  serverURL: 'circabc/',
  baseHref: '/',
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
