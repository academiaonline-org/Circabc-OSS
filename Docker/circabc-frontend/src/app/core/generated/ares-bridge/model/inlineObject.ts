/**
 * AresBridge
 * AresBridge back-end services
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: DIGIT-ARESBRIDGE-SUPPORT@ec.europa.eu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { StoreDocumentRequest } from './storeDocumentRequest';

export interface InlineObject {
  body: StoreDocumentRequest;
  /**
   * The order of the attachment is important and MUST match the order of the attachments in the JSON. Basically attachment with sequence 1 must be the first attachment in this array.
   */
  attachment: Array<Blob>;
}
