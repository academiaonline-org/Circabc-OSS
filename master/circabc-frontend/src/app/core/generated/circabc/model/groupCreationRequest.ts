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
import { User } from './user';

export interface GroupCreationRequest {
  id?: number;
  from: User;
  proposedName: string;
  /**
   * The object that is used to compile all the translations of a node into a JSON object. It is basically composed of a map with a key languaguage code and its value
   */
  proposedTitle?: { [key: string]: string };
  /**
   * The object that is used to compile all the translations of a node into a JSON object. It is basically composed of a map with a key languaguage code and its value
   */
  proposedDescription?: { [key: string]: string };
  requestDate?: string;
  categoryRef?: string;
  leaders?: Array<User>;
  /**
   * 1 == agreed -1 == refused 0 == waiting approval
   */
  agreement?: number;
  reviewer?: User;
  justification: string;
  argument?: string;
  agreementDate?: string;
}
