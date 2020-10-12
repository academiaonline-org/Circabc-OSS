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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { Observable } from 'rxjs';

import { PagedArchiveNodes } from '../model/models';
import { RestoreNodeMetadata } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  protected basePath = 'http://localhost/service/circabc';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  private addToHttpParams(
    httpParams: HttpParams,
    value: any,
    key?: string
  ): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(
    httpParams: HttpParams,
    value?: any,
    key?: string
  ): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        (value as any[]).forEach(
          (elem) =>
            (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key))
        );
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(
            key,
            (value as Date).toISOString().substr(0, 10)
          );
        } else {
          throw Error('key may not be null if value is Date');
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k
            ))
        );
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error('key may not be null if value is not object or array');
    }
    return httpParams;
  }

  /**
   * delete the archived item of an Interest group
   * @param id
   * @param nodeId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteDeletedDocument(
    id: string,
    nodeId: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any>;
  public deleteDeletedDocument(
    id: string,
    nodeId: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpResponse<any>>;
  public deleteDeletedDocument(
    id: string,
    nodeId: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpEvent<any>>;
  public deleteDeletedDocument(
    id: string,
    nodeId: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling deleteDeletedDocument.'
      );
    }
    if (nodeId === null || nodeId === undefined) {
      throw new Error(
        'Required parameter nodeId was null or undefined when calling deleteDeletedDocument.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (basicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
          btoa(this.configuration.username + ':' + this.configuration.password)
      );
    }
    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      );
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text';
    }

    return this.httpClient.delete<any>(
      `${this.configuration.basePath}/groups/${encodeURIComponent(
        String(id)
      )}/documents/deleted/${encodeURIComponent(String(nodeId))}`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * get the deleted documents of an Interest group
   * @param id
   * @param limit the amount of values per page values &#x3D; 25 (default) / 50 / 100 / 0 (all) if not any value is passed, the default value (25) is used
   * @param page the number of the page
   * @param order the column name on which a sorting applies  - for DESC and + for ASC
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getDeletedDocuments(
    id: string,
    limit?: number,
    page?: number,
    order?: string,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<PagedArchiveNodes>;
  public getDeletedDocuments(
    id: string,
    limit?: number,
    page?: number,
    order?: string,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpResponse<PagedArchiveNodes>>;
  public getDeletedDocuments(
    id: string,
    limit?: number,
    page?: number,
    order?: string,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<HttpEvent<PagedArchiveNodes>>;
  public getDeletedDocuments(
    id: string,
    limit?: number,
    page?: number,
    order?: string,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json' }
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling getDeletedDocuments.'
      );
    }

    let queryParameters = new HttpParams({ encoder: this.encoder });
    if (limit !== undefined && limit !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>limit,
        'limit'
      );
    }
    if (page !== undefined && page !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>page,
        'page'
      );
    }
    if (order !== undefined && order !== null) {
      queryParameters = this.addToHttpParams(
        queryParameters,
        <any>order,
        'order'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (basicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
          btoa(this.configuration.username + ':' + this.configuration.password)
      );
    }
    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      );
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text';
    }

    return this.httpClient.get<PagedArchiveNodes>(
      `${this.configuration.basePath}/groups/${encodeURIComponent(
        String(id)
      )}/documents/deleted`,
      {
        params: queryParameters,
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * restore one archived node
   * @param id
   * @param restoreNodeMetadata
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public restoreDocument(
    id: string,
    restoreNodeMetadata: RestoreNodeMetadata,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any>;
  public restoreDocument(
    id: string,
    restoreNodeMetadata: RestoreNodeMetadata,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpResponse<any>>;
  public restoreDocument(
    id: string,
    restoreNodeMetadata: RestoreNodeMetadata,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpEvent<any>>;
  public restoreDocument(
    id: string,
    restoreNodeMetadata: RestoreNodeMetadata,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling restoreDocument.'
      );
    }
    if (restoreNodeMetadata === null || restoreNodeMetadata === undefined) {
      throw new Error(
        'Required parameter restoreNodeMetadata was null or undefined when calling restoreDocument.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (basicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
          btoa(this.configuration.username + ':' + this.configuration.password)
      );
    }
    let httpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(
        httpHeaderAccepts
      );
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (
      httpHeaderAcceptSelected &&
      httpHeaderAcceptSelected.startsWith('text')
    ) {
      responseType = 'text';
    }

    return this.httpClient.post<any>(
      `${this.configuration.basePath}/groups/${encodeURIComponent(
        String(id)
      )}/documents/deleted`,
      restoreNodeMetadata,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
