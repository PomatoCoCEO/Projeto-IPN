export class SignUpViewModel {
  username: string = '';
  email: string = '';
  password: string = '';
  roleNames: string[] = [];
  birthDate: Date = new Date();
  phoneNumber: string = '';
  biography: string = '';
  photoFilePath: string = '';
  constructor(...args: any[]) {
    if (args.length == 0 || args[0] == null) return;
    let f = args[0];
    this.biography = new String(f.biography).toString();
    if (f.birthdate != undefined) this.birthDate = new Date(f.birthdate);
    else this.birthDate = new Date(f.birthDate);
    if (f.password != undefined)
      this.password = new String(f.password).toString();
    this.email = new String(f.email).toString();
    if (f.phoneNumber != null)
      this.phoneNumber = new String(f.phoneNumber).toString();
    if (f.photoFilePath != null)
      this.photoFilePath = new String(f.photoFilePath).toString();
    this.roleNames = [];
    if (f.roleNames != null) for (let r of f.roleNames) this.roleNames.push(r);
    if (f.userName != undefined) this.username = f.userName;
    else this.username = new String(f.username).toString();
  }
  public static str2usr(jsonString: string) {
    var r = new SignUpViewModel();
    r = JSON.parse(jsonString);
    return r;
  }
}

export class DateDay {
  day: number = 0;
  month: number = 0;
  year: number = 0;
  constructor() {}
}
