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

/**
 * Request specific options.
 */
export interface RequestOptions {
  /**
   * For this specific request, specify to which URL AresBridge UI must redirect the user to after completion in the AresBridge UI. This is useful if AresBridge UI should redirect to a specific URL (e.g. pointing to the document in the source system) rather than a generic one.\\ Only trusted URLs are allowed, a URL is trusted if the host has been configured at AresBridge server.
   */
  redirectURL?: string;
}
