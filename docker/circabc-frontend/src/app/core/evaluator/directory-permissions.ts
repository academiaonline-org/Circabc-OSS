export enum DirectoryPermissions {
  DirNoAccess,
  DirAccess,
  DirManageMembers,
  DirAdmin,
}

export const directoryPermissionKeys = Object.keys(DirectoryPermissions).filter(
  // tslint:disable-next-line:no-any
  (k) => typeof DirectoryPermissions[k as any] === 'number'
);
