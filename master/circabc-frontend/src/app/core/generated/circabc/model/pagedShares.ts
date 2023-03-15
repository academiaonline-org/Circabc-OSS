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
import { Share } from './share';

export interface PagedShares {
  data: Array<Share>;
  /**
   * return the total amount of nodes, without paging so the UI can compute the number of pages
   */
  total: number;
}
