// tslint:disable-next-line:no-relative-imports
import { ActionResult } from './action-result';
// tslint:disable-next-line:no-relative-imports
import { ActionType } from './action-type';

import { Node as ModelNode } from 'app/core/generated/circabc';

export * from './action-result';
export * from './action-type';
export * from './action-url';

export interface ActionEmitterResult {
  node?: ModelNode;
  type?: ActionType;
  result?: ActionResult;
}
