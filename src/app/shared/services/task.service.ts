import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { BaseApi } from 'src/app/shared/core/base-api';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';


@Injectable()
export class TaskService extends BaseApi {
    constructor(public http: HttpClient){
        super(http)
    }

    getTaskById(id){//{
        // return this.http.get(`http://localhost:3000/tasks`, {params: new HttpParams().set('id', id)})
        // .pipe(map((response: Task)=>{return response}));
        return this.get(`tasks/${id}`);
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