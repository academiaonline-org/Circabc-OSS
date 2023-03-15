import { Inject, Injectable, Optional } from '@angular/core';
import { ContentService, OfficeEditResult } from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { detectIEVersion, detectOS, OSInfo } from 'app/core/util';
import { SERVER_URL } from 'app/core/variables';

// tslint:disable-next-line:no-any
declare var ActiveXObject: new (s: string) => any;

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private serverURL!: string;

  public constructor(
    private loginService: LoginService,
    private contentService: ContentService,
    @Optional()
    @Inject(SERVER_URL)
    serverURL: string
  ) {
    if (serverURL) {
      this.serverURL = serverURL;
    }
  }

  public async canEdit(documentIds: string[]) {
    let result: OfficeEditResult[] = [];

    const ieVersion: number = detectIEVersion();

    if (ieVersion < 10 || ieVersion > 11) {
      return result;
    }

    const osInfo: OSInfo = detectOS();

    if (osInfo.name !== 'Windows' && osInfo.version > 7) {
      return result;
    }

    result = await this.contentService.getCheckOffice(documentIds).toPromise();

    return result;
  }

  public getDocumentUrl(documentLocation: string): string {
    const ticket = this.loginService.getTicket();
    return `${this.serverURL}webdav/4bac${ticket.substring(
      7,
      ticket.length
    )}${documentLocation}`;
  }

  public openDocument(documentLocation: string) {
    let showDocument = true;
    const userAgent = navigator.userAgent.toLowerCase();

    const url: string = this.getDocumentUrl(documentLocation);

    // if the link represents an Office document and we are in IE try and
    // open the file directly to get WebDAV editing capabilities
    if (userAgent.indexOf('msie') !== -1) {
      const lowerUrl: string = url.toLowerCase();

      if (
        lowerUrl.indexOf('.doc') !== -1 ||
        lowerUrl.indexOf('.docx') !== -1 ||
        lowerUrl.indexOf('.xls') !== -1 ||
        lowerUrl.indexOf('.xlsx') !== -1 ||
        lowerUrl.indexOf('.ppt') !== -1 ||
        lowerUrl.indexOf('.pptx') !== -1 ||
        lowerUrl.indexOf('.dot') !== -1 ||
        lowerUrl.indexOf('.dotx') !== -1
      ) {
        for (let version = 1; version < 5; version += 1) {
          // version 1..4 => Office 2000/XP, 2003, 2007
          try {
            const officeDocument = new ActiveXObject(
              `SharePoint.OpenDocuments.${version}`
            );

            if (officeDocument) {
              officeDocument.EditDocument(url);
              showDocument = false;
            }
            // tslint:disable-next-line:no-empty
          } catch (e) {}
        }
      }
    }

    if (showDocument) {
      window.open(url, '_blank');
    }
  }
}
