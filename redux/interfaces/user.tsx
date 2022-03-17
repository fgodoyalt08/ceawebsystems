export interface IUserReducer {
  error?: any;
  request: boolean;
  data?: any;
}

export interface IUserDispatch {
  type: string
}

export interface IUserLoginData {
  email:string;
  password:string;
}