import { Injectable } from '@angular/core';
import {
  AresBridgeService,
  Attachment,
  StoreDocumentRequest,
  StoreDocumentResponse,
} from 'app/core/generated/ares-bridge';

import { DownloadService } from 'app/core/download.service';
import {
  ExternalRepositoryService,
  Node as ModelNode,
  TicketRequestInfo,
} from 'app/core/generated/circabc';
import { ExternalRepoTransaction } from 'app/core/generated/circabc/model/models';
import { LoginService } from 'app/core/login.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AresBridgeHelperService {
  public constructor(
    private loginService: LoginService,
    private aresBridgeService: AresBridgeService,
    private downloadService: DownloadService,
    private externalRepositoryService: ExternalRepositoryService
  ) {
    this.aresBridgeService.configuration.apiKeys = {};
  }

  public async isAresBridgeEnabled(groupId: string) {
    if (!environment.aresBridgeEnabled) {
      return false;
    }
    let result = false;

    const repos = await this.externalRepositoryService
      .getExternalRepositories(groupId)
      .toPromise();
    if (repos.length > 0) {
      result = repos.findIndex((repo) => repo.name === 'AresBridge') > -1;
    }

    return result;
  }

  public async sendToAresBridge(nodeOrNodes: ModelNode | ModelNode[]) {
    let nodeArray: ModelNode[];
    if (nodeOrNodes instanceof Array) {
      if (nodeOrNodes.length === 0) {
        return;
      } else {
        nodeArray = nodeOrNodes;
      }
    } else {
      nodeArray = [nodeOrNodes];
    }

    let documentDate: number | undefined;
    if (nodeArray[0].properties) {
      documentDate = new Date(nodeArray[0].properties.modified).getTime();
    }

    const username = this.loginService.getUser().userId as string;

    const hasUserAccessRequestDate = new Date().toUTCString();
    const hasUserAccessTicket = await this.getAresBridgeTicket(
      hasUserAccessRequestDate,
      '/user/access/' + username,
      'GET'
    );
    if (!hasUserAccessTicket) {
      return;
    }
    this.setTicket(hasUserAccessTicket);

    const hasUserAccess = await this.aresBridgeService
      .hasUserAccess(username, undefined, hasUserAccessRequestDate)
      .toPromise();

    const attachments: Attachment[] = [];
    const attachment: Blob[] = [];
    let sequence = 1;
    nodeArray.forEach(async (content: ModelNode) => {
      attachments.push({
        sequence: sequence,
        filename: content.name as string,
        type: 'MAIN',
        language: 'NS',
      });
      if (content.id) {
        const blob = await this.downloadService.getNodeContent(content.id);
        attachment.push(blob);
      }
      sequence = sequence + 1;
    });

    if (hasUserAccess.access && hasUserAccess.registrationRights) {
      const body: StoreDocumentRequest = {
        username: username,
        document: {
          title: nodeArray[0].name,
          levelOfSensitivity: 'NORMAL',
          documentDate: documentDate,
          attachments: attachments,
        },
        uiPreferences: {
          titleEditable: false,
        },
      };

      const storeDocumentRequestDate = new Date().toUTCString();
      const storeDocumentTicket = await this.getAresBridgeTicket(
        storeDocumentRequestDate,
        '/document',
        'POST'
      );
      if (!storeDocumentTicket) {
        return;
      }
      this.setTicket(storeDocumentTicket);

      const response = await this.aresBridgeService
        .storeDocument(body, attachment, undefined, storeDocumentRequestDate)
        .toPromise();
      const externalRepoTransaction: ExternalRepoTransaction = {
        nodes: nodeArray,
        transactionId: response.transactionId,
      };
      await this.openAresBridge(
        externalRepoTransaction,
        storeDocumentRequestDate,
        storeDocumentTicket,
        response
      );
    }
  }

  private setTicket(ticket: string) {
    if (this.aresBridgeService.configuration.apiKeys) {
      this.aresBridgeService.configuration.apiKeys[
        'Authorization'
      ] = `AresBridge ${environment.aresBridgeKey}:${ticket}`;
    }
  }

  private async openAresBridge(
    externalRepoTransaction: ExternalRepoTransaction,
    storeDocumentRequestDate: string,
    storeDocumentTicket: string,
    response: StoreDocumentResponse
  ) {
    await this.externalRepositoryService
      .saveExternalRepoTansaction('AresBridge', externalRepoTransaction)
      .toPromise();
    const aresBridgeDate = encodeURIComponent(storeDocumentRequestDate);
    const aresBridgeTicket = storeDocumentTicket;
    // tslint:disable-next-line:max-line-length
    const url = `${environment.aresBridgeUiURL}?token=${aresBridgeTicket}&apiKey=${environment.aresBridgeKey}&date=${aresBridgeDate}&transactionId=${response.transactionId}`;
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  }

  private async getAresBridgeTicket(
    requestDate: string,
    path: string,
    httpVerb: 'GET' | 'POST'
  ) {
    const fullPath =
      environment.aresBridgeURL.replace(environment.aresBridgeServer, '') +
      path;
    const ticketRequestInfo: TicketRequestInfo = {
      requestDate: requestDate,
      httpVerb: httpVerb,
      path: fullPath,
    };
    const ticket = await this.externalRepositoryService
      .getExternalRepoTicket('AresBridge', ticketRequestInfo)
      .toPromise();
    return ticket.ticket;
  }
}
