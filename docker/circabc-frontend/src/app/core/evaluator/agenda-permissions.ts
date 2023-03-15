export enum AgendaPermissions {
  EveNoAccess,
  EveAccess,
  EveAdmin,
}

export const agendaPermissionKeys = Object.keys(AgendaPermissions).filter(
  // tslint:disable-next-line:no-any
  (k) => typeof AgendaPermissions[k as any] === 'number'
);
