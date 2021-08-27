import { ProjectViewModel } from './projects';
import { SignUpViewModel } from './signup';
import { UserViewModel } from './user';

export class TaskViewModel {
  public id: number = 0;
  public title = '';
  public description = '';
  public deadline = new Date();
  public finished: boolean = false; // db migration is necessary
  public project: null | ProjectViewModel = null;
  public programmer: UserViewModel = new UserViewModel();

  constructor(...args: any[]) {
    if (args.length == 0 || args[0] == null) return;
    let t: TaskViewModel = args[0];
    this.id = t.id;
    this.deadline = new Date(t.deadline);
    this.description = new String(t.description).toString();
    this.finished = t.finished;
    this.title = new String(t.title).toString();
    this.programmer = new UserViewModel(t.programmer);
    // this.project = new ProjectViewModel(t.project);
    if (t.project != null) this.project = new ProjectViewModel(t.project);
  }
  /*constructor(t: TaskViewModel | undefined) {
    if(t == undefined) return;
    this.deadline = t.deadline;
    this.description = new String(t.description).toString();
    this.title = new String(t.title).toString();
    this.finished = t.finished;
    this.project
  }*/
}
