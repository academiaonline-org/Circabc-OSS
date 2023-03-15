import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExternalRepositoryService } from 'app/core/generated/circabc';

@Component({
  selector: 'cbc-external-repository',
  templateUrl: './external-repository.component.html',
  styleUrls: ['./external-repository.component.scss'],
  preserveWhitespaces: true,
})
export class ExternalRepositoryComponent implements OnInit {
  public igId!: string;
  public saving = false;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private externalRepositoryService: ExternalRepositoryService
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      repos: this.fb.array([]),
    });
    this.route.params.subscribe(async (params) => {
      this.igId = params.id;
      await this.load();
    });
  }

  private async load() {
    const availibleRepos = await this.externalRepositoryService
      .getAvailableExternalRepositories()
      .toPromise();
    const repos = await this.externalRepositoryService
      .getExternalRepositories(this.igId)
      .toPromise();
    const reposFormArray = this.form.controls.repos as FormArray;
    reposFormArray.clear();
    availibleRepos.forEach((repo: string) => {
      const name = repo;
      let enabled = false;
      let requestedOn;
      const externalRepo = repos.find((r) => r.name === name);
      if (externalRepo && externalRepo.registrationDate) {
        enabled = true;
        requestedOn = new Date(externalRepo.registrationDate);
      }
      this.addRepo(name, enabled, requestedOn);
    });
  }

  addRepo(name: string, enabled: boolean, requestedOn?: Date) {
    const repos = this.form.controls.repos as FormArray;
    repos.push(
      this.fb.group({
        name: name,
        requestedOn: requestedOn,
        enabled: enabled,
      })
    );
  }

  public async save() {
    this.saving = true;
    const repos = await this.externalRepositoryService
      .getExternalRepositories(this.igId)
      .toPromise();
    const reposModel = this.form.value.repos as {
      name: string;
      requestedOn?: Date;
      enabled: boolean;
    }[];
    reposModel.forEach(async (repo) => {
      const externalRepo = repos.find((r) => r.name === repo.name);
      if (repo.enabled && externalRepo === undefined) {
        await this.externalRepositoryService
          .addExternalRepositories(this.igId, repo.name)
          .toPromise();
      }
      if (!repo.enabled && externalRepo !== undefined) {
        await this.externalRepositoryService
          .deleteExternalRepository(this.igId, repo.name)
          .toPromise();
      }
      await this.load();
    });
    this.saving = false;
  }

  public async cancel() {
    await this.load();
  }
}
