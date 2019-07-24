import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BaseApi } from 'src/app/shared/core/base-api';
import { Task } from '../models/task.model';


@Injectable()
export class TaskService extends BaseApi {
    constructor(public http: HttpClient){
        super(http)
    }


    getTasks(){
        return this.get('tasks');
    }

    createNewTask(task: Task){
        return this.post('tasks', task);
    }

    editTask(task: Task){
        return this.put(`tasks/${task.id}`, task);
    }

    deleteTask(taskId){
        return this.delete('tasks', taskId);
    }
}