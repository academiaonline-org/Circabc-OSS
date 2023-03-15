export enum LibraryPermissions {
  LibNoAccess,
  LibAccess,
  LibManageOwn,
  LibEditOnly,
  LibFullEdit,
  LibAdmin,
}

export const libraryPermissionKeys = Object.keys(LibraryPermissions).filter(
  // tslint:disable-next-line:no-any
  (k) => typeof LibraryPermissions[k as any] === 'number'
);
