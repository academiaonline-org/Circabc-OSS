// tslint:disable:no-any
export enum InformationPermissions {
  InfNoAccess,
  InfAccess,
  InfManage,
  InfAdmin,
}

export const informationPermissionKeys = Object.keys(
  InformationPermissions
).filter((k) => typeof InformationPermissions[k as any] === 'number');
