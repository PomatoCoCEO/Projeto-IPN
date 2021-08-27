import { SignUpViewModel } from './signup';
import { TaskViewModel } from './tasks';
import { UserStats, UserViewModel } from './user';

export class ProjectViewModel {
  public id: number = 0;
  public title: string = '';
  public description: string = '';
  // public deadline: Date = new Date(); // db migration is necessary ?? -> not needed
  public budget: number = 0.0;
  public manager: UserViewModel = new UserViewModel();
  public tasks: TaskViewModel[] = [];

  constructor(...args: any[]) {
    if (args.length == 0 || args[0] == null) return;
    let p: ProjectViewModel = args[0];
    this.id = p.id;
    this.budget = p.budget;
    // this.deadline = new Date(p.deadline);
    this.description = new String(p.description).toString();
    this.manager = new UserViewModel(p.manager);
    this.tasks = [];
    for (let tr of p.tasks) {
      let tn = new TaskViewModel(tr);
      this.tasks.push(tn);
    }
    this.title = new String(p.title).toString();
  }
}
