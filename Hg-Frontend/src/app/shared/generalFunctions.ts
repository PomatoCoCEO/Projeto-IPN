export class GeneralFunctions {
    constructor() {}
    public hasPassed(d:Date) {
        return Date.parse('' + d) < new Date().getTime();
    }
    public indexArray(size:number) {
        return [...Array(size).keys()];
    }
}