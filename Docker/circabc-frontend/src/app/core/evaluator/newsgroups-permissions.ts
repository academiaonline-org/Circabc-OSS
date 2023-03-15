export enum NewsgroupsPermissions {
  NwsNoAccess,
  NwsAccess,
  NwsPost,
  NwsModerate,
  NwsAdmin,
}

export const newsGroupPermissionKeys = Object.keys(
  NewsgroupsPermissions
  // tslint:disable-next-line:no-any
).filter((k) => typeof NewsgroupsPermissions[k as any] === 'number');
