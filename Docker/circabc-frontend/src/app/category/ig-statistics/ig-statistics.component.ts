import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'app/core/generated/circabc';
import { PagedStatisticsContents } from 'app/core/generated/circabc/model/pagedStatisticsContents';
import { StatisticsContent } from 'app/core/generated/circabc/model/statisticsContent';
import { BASE_PATH } from 'app/core/generated/circabc/variables';
import { SaveAsService } from 'app/core/save-as.service';
import { ListingOptions } from 'app/group/listing-options/listing-options';

@Component({
  selector: 'cbc-ig-statistics',
  templateUrl: './ig-statistics.component.html',
  preserveWhitespaces: true,
})
export class IgStatisticsComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-any
  private interval: any;

  public contents!: StatisticsContent[];
  public listingOptions: ListingOptions = { page: 1, limit: 5, sort: '' };
  public totalItems = 5;

  public categoryId!: string;
  public loading = false;
  private basePath!: string;

  public showAddModal = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private saveAsService: SaveAsService,
    @Optional()
    @Inject(BASE_PATH)
    basePath: string
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
  }

  ngOnInit() {
    this.contents = [];

    this.route.params.subscribe(
      async (params) => await this.listContents(params)
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private async listContents(params: { [key: string]: string }) {
    this.categoryId = params.id;
    await this.loadContents();
    this.interval = setInterval(async () => {
      await this.loadContents();
      // tslint:disable-next-line:align
    }, 10000);
  }

  private async loadContents() {
    this.loading = true;
    if (this.categoryId !== undefined) {
      const result: PagedStatisticsContents = await this.categoryService
        .getCategoryStatistics(
          this.categoryId,
          this.listingOptions.limit,
          this.listingOptions.page
        )
        .toPromise();
      this.contents = result.data;
      this.totalItems = result.total;
    }
    this.loading = false;
  }

  public async goToPage(page: number) {
    this.listingOptions.page = page;
    await this.changePage(this.listingOptions);
  }

  public async changePage(listingOptions: ListingOptions) {
    this.listingOptions = listingOptions;
    if (this.categoryId !== undefined) {
      const result: PagedStatisticsContents = await this.categoryService
        .getCategoryStatistics(
          this.categoryId,
          this.listingOptions.limit,
          this.listingOptions.page
        )
        .toPromise();
      this.contents = result.data;
      this.totalItems = result.total;
    }
  }

  public async generateStatistics() {
    await this.categoryService
      .postCategoryStatistics(this.categoryId)
      .toPromise();
  }

  public download(content: StatisticsContent) {
    const hostBasePath = this.basePath.substring(
      0,
      this.basePath.length - '/service/circabc'.length
    );
    const url = `${hostBasePath}/s/api/node/content${(content.downloadURL as string).substring(
      4,
      63
    )}`;
    this.saveAsService.saveUrlAs(url, content.name as string);
  }

  public trackByName(_index: number, item: { name?: string }) {
    return item.name;
  }
}
