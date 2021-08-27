import { SignUpViewModel } from './signup';

export class LoginViewModel {
  public username: string = '';
  public password: string = '';
  public rememberMe: boolean = false;
  constructor() {}
}
export class LoginResult {
  public token: string = '';
  public expiration: Date = new Date();
  public userDetails: SignUpViewModel = new SignUpViewModel();
}
