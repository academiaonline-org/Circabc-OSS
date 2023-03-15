export interface CardEntry {
  id: number;
  type: string;
  title: string;
  text: string;
  date: string;
  size: number;
  skin: string;
  height?: number;
  // tslint:disable-next-line:no-any
  properties?: { [key: string]: any };
}
