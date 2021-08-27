export class ManagerStats {
  noProjects: number = 0;
  budgetSum: number = 0;
  constructor(...args: any[]) {
    if (args.length == 0|| args[0]==null) return;
    let ms: ManagerStats = args[0];
    this.noProjects = ms.noProjects;
    this.budgetSum = ms.budgetSum;
  }
}
