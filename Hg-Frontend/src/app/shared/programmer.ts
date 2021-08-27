export class ProgrammerStats {
  tasksCompleted: number = 0;
  tasksFailed: number = 0;
  tasksAssigned: number = 0;
  constructor(...args: any[]) {
    if(args.length == 0|| args[0]==null) return;
    let ps: ProgrammerStats = args[0];
    this.tasksAssigned = ps.tasksAssigned;
    this.tasksCompleted = ps.tasksCompleted;
    this.tasksFailed = ps.tasksFailed;
  }
}
