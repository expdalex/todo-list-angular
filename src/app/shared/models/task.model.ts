export class Task{
    constructor(
        public date: any,
        public header: string,
        public description: string,
        public id?: number
    ) {}
}