import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';
import { TaskService } from './task.service';


@Injectable()
export class TaskResolver implements Resolve<Task>{
    constructor(private taskService: TaskService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> | Promise<Task> | Task{
        //console.log(+route.params['id']);
        return this.taskService.getTaskById(+route.params['id']);
    }
}