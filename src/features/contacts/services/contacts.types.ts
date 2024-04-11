export interface ContactsResponse {
  meta: ContactsResponseMeta;
  items: ContactInterface[];
}

export interface ContactsResponseMeta {
  page: number;
  perPage: number;
  sortBy: string;
  sortDir: string;
  search: string;
  total: number;
}

export interface ContactInterface {
  _id: string;
  name: string;
  role: string;
  emails: [string];
  phones: [string];
  bio: string;
}
