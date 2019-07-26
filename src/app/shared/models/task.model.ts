export class Task{
    constructor(
        public date: any,
        public header: string,
        public description: string,
        public checked: boolean,
        public order: number,
        public id?: number
    ) {}
}