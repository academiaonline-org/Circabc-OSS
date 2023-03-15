import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationStatusComponent } from 'app/group/admin/notification-status/notification-status.component';
import { DashboardComponent } from 'app/group/dashboard/dashboard.component';
import { GroupComponent } from 'app/group/group.component';
import { GroupResolver } from 'app/group/group.resolver';
import { AdminGuard } from 'app/group/guards/admin-guard.service';
import { GroupGuard } from 'app/group/guards/group-guard.service';
import { GroupMembersAdminGuard } from 'app/group/guards/group-members-admin-guard.service';

const groupRoutes: Routes = [
  {
    path: ':id',
    component: GroupComponent,
    canActivate: [GroupGuard],
    resolve: {
      group: GroupResolver,
    },
    runGuardsAndResolvers: 'always',
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'library',
        loadChildren: () =>
          import('app/group/library/library.module').then(
            (m) => m.LibraryModule
          ),
      },
      {
        path: 'members',
        loadChildren: () =>
          import('app/group/members/members.module').then(
            (m) => m.MembersModule
          ),
      },
      {
        path: 'forum',
        loadChildren: () =>
          import('app/group/forum/forum.module').then((m) => m.ForumModule),
      },
      {
        path: 'agenda',
        loadChildren: () =>
          import('app/group/agenda/agenda.module').then((m) => m.AgendaModule),
      },
      {
        path: 'information',
        loadChildren: () =>
          import('app/group/information/information.module').then(
            (m) => m.InformationModule
          ),
      },
      {
        path: 'keywords',
        loadChildren: () =>
          import('app/group/keywords/keywords.module').then(
            (m) => m.KeywordsModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'profiles',
        loadChildren: () =>
          import('app/group/profiles/profiles.module').then(
            (m) => m.ProfilesModule
          ),
        canActivate: [GroupMembersAdminGuard],
      },
      {
        path: 'dynamic-properties',
        loadChildren: () =>
          import('app/group/dynamic-properties/dynamic-properties.module').then(
            (m) => m.DynamicPropertiesModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('app/group/admin/group-admin.module').then(
            (m) => m.GroupAdminModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'applicants',
        loadChildren: () =>
          import('app/group/applicants/applicants.module').then(
            (m) => m.ApplicantsModule
          ),
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import('app/group/permissions/permissions.module').then(
            (m) => m.PermissionsModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('app/group/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'notification-status/:nodeId',
        component: NotificationStatusComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(groupRoutes)],
  exports: [RouterModule],
  providers: [GroupResolver],
})
export class GroupRoutingModule {}
