import {
  InterestGroup,
  KeywordDefinition,
  Node as ModelNode,
  UserProfile,
} from 'app/core/generated/circabc';
import { BulkImportUserData } from 'app/core/generated/circabc/model/bulkImportUserData';

export * from './quote';

export interface Selectable {
  selected?: boolean;
}

export interface Indexed {
  index?: number;
}
export interface SelectableNode extends ModelNode, Selectable {}
export interface SelectableKeyword extends KeywordDefinition, Selectable {}

export interface SelectableUserProfile extends UserProfile, Selectable {}

export interface SelectableBulkImportUserData
  extends BulkImportUserData,
    Selectable {}

export interface IndexedInterestGroup extends Indexed, InterestGroup {}

export interface IdName {
  id: string;
  name: string;
}
