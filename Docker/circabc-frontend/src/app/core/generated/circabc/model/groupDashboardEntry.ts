/**
 * CIRCABC REST API
 * This is the first version of the CIRCABC REST API used by the new User Interface
 *
 * The version of the OpenAPI document: 4.1.4
 * Contact: DIGIT-CIRCABC-SUPPORT@ec.europa.eu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { EntryEvent } from './entryEvent';

/**
 * all the activities inside one group it shall returns a filtered content based on the user\'s permission the \'news\' should be sorted by date !
 */
export interface GroupDashboardEntry {
  date?: string;
  groupId?: string;
  news?: Array<EntryEvent>;
}
