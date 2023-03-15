import { Component } from '@angular/core';
import { HelpSearchResult, HelpService } from 'app/core/generated/circabc';

@Component({
  selector: 'cbc-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  preserveWhitespaces: true,
})
export class HelpComponent {
  public showSearch = false;
  public searching = false;
  public resultSearch: HelpSearchResult | undefined;

  constructor(private helpService: HelpService) {}

  public async searchInHelp(data: string) {
    if (data === '') {
      this.showSearch = false;
      this.resultSearch = undefined;
    } else {
      this.showSearch = true;
      this.searching = true;
      this.helpService.helpSearch(data).subscribe((result) => {
        this.resultSearch = result;
        this.searching = false;
      });
    }
  }

  public closeSearch() {
    this.showSearch = false;
    this.resultSearch = undefined;
    this.searching = false;
  }

  public linkClick() {
    this.closeSearch();
  }
}
