import { ManagerStats } from './manager';
import { ProgrammerStats } from './programmer';
import { SignUpViewModel } from './signup';

export class UserStats {
  public info = new SignUpViewModel();
  public programmerStats = new ProgrammerStats();
  public managerStats = new ManagerStats();
  public constructor(...args: any[]) {
    if (args.length == 0 || args[0] == null) return;
    let u: UserStats = args[0];
    this.info = new SignUpViewModel(u.info);
    this.programmerStats = new ProgrammerStats(u.programmerStats);
    this.managerStats = new ManagerStats(u.managerStats);
  }
}

export class UserViewModel {
  username: string = '';
  email: string = '';
  roleNames: string[] = [];
  birthDate: Date = new Date();
  phoneNumber: string = '';
  biography: string = '';
  photoFilePath: string = '';
  public constructor(...args: any[]) {
    if (args.length == 0 || args[0] == null) return;
    // if(typeof args[0] == "SignUpViewModel")
    let u = args[0];
    this.username = new String(u.username).toString();
    if(u.birthdate != null) this.birthDate = new Date(u.birthdate);
    if (u.email != null) this.email = new String(u.email).toString();
    if (u.phoneNumber != null)
      this.phoneNumber = new String(u.phoneNumber).toString();
    this.roleNames = [];
    if (u.roleNames != null)
      for (let r in u.roleNames) this.roleNames.push(new String(r).toString());
    this.biography = new String(u.biography).toString();
    this.photoFilePath = new String(u.photoFilePath).toString();
  }
}
