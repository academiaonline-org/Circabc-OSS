import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FavouritesService,
  Node as ModelNode,
  NodesService,
  PagedNodes,
} from 'app/core/generated/circabc';
import { LoginService } from 'app/core/login.service';
import { ListingOptions } from 'app/group/listing-options/listing-options';

// Node as ModelNode,

@Component({
  selector: 'cbc-user-favourites',
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.scss'],
  preserveWhitespaces: true,
})
export class UserFavouritesComponent implements OnInit {
  public loading = false;
  public listingOptions: ListingOptions = { page: 1, limit: 10, sort: '' };
  public totalItems = 10;
  public pagedFavourites!: PagedNodes;

  constructor(
    private favouritesService: FavouritesService,
    private loginService: LoginService,
    private nodesService: NodesService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadFavourites();
  }

  async loadFavourites() {
    this.loading = true;
    this.pagedFavourites = await this.favouritesService
      .getFavourites(
        this.loginService.getCurrentUsername(),
        this.listingOptions.limit,
        this.listingOptions.page
      )
      .toPromise();
    this.loading = false;
  }

  public getTotal(): number {
    if (this.pagedFavourites && this.pagedFavourites.total) {
      return this.pagedFavourites.total;
    }

    return 0;
  }

  isFile(node: ModelNode): boolean {
    if (node.type) {
      return node.type.indexOf('folder') === -1;
    } else {
      return false;
    }
  }

  isFolder(node: ModelNode): boolean {
    if (node.type) {
      return node.type.indexOf('folder') !== -1;
    } else {
      return false;
    }
  }

  async openLink(node: ModelNode) {
    if (node.id) {
      const groupId = await this.nodesService.getGroup(node.id).toPromise();

      if (node.type && node.type.indexOf('folder') > -1) {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate(['/group', groupId.id, 'library', node.id]);
      } else {
        // tslint:disable-next-line:no-floating-promises
        this.router.navigate([
          '/group',
          groupId.id,
          'library',
          node.id,
          'details',
        ]);
      }
    }
  }

  async changePage(p: number) {
    this.listingOptions.page = p;
    await this.loadFavourites();
  }

  public trackById(_index: number, item: { id?: string | number }) {
    return item.id;
  }
}
