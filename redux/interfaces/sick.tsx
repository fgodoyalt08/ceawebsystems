export interface ISickDispatch {
  type: string
}

export interface sickOpt {
  id: string;
  name: string;
}

export interface IState {
  request: boolean,
  error: any,
  data: any
}