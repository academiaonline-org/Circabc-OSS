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
import { Node } from './node';

/**
 * all the translations attachted to one node, it is not the translations of each of its properties but the trasnlations of its content
 */
export interface Translations {
  pivot?: Node;
  translations?: Array<Node>;
}
