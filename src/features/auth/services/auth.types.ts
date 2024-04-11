export interface UserInterface {
  _id: string | null;
  name: string | null;
  email: string | null;
}

export interface AuthPayloadInterface {
  email: string;
  password: string;
}

export interface AuthResponseInterface {
  access_token: string;
  expires_in: number;
  token_type: string;
}
