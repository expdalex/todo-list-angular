import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['../todolist/todolist.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task;
  @Input() tasks;
  @Output() onUpdateTask = new EventEmitter<[{}]>();

  constructor(private taskService: TaskService, private router: Router) { }

  d = +new Date();
  descNum: number;

  showDesc: boolean;

  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  sub4$: Subscription;
  sub5$: Subscription;

  ngOnInit() {
  }

  showDescription(task){
    this.descNum = task.id;
    if(this.showDesc){
      this.showDesc = false
    } else {  
      this.showDesc = true
    }
  }

  checked(task){
    //console.log(task);
    const checked = true;
    const newTask = new Task(task.date, task.header, task.description, checked, task.order, task.id);
    //console.log(newTask);
    this.sub1$ = this.taskService.editTask(newTask)
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.onUpdateTask.emit(tasks);
      })
  }

  unchecked(task){
    const checked = false;
    const newTask = new Task(task.date, task.header, task.description, checked, task.order, task.id);
    this.sub2$ = this.taskService.editTask(newTask)
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.onUpdateTask.emit(tasks);
      })
  }

  upTask(task){
    if(task.order !== 0){
      let upTask = new Task(this.tasks[task.order].date, this.tasks[task.order].header, this.tasks[task.order].description, this.tasks[task.order].checked, this.tasks[task.order].order-1, this.tasks[task.order].id);
      let downTask = new Task(this.tasks[task.order-1].date, this.tasks[task.order-1].header, this.tasks[task.order-1].description, this.tasks[task.order-1].checked, this.tasks[task.order-1].order+1, this.tasks[task.order-1].id);
      this.sub3$ = this.taskService.editTask(upTask)
      .pipe(mergeMap(()=>this.taskService.editTask(downTask)))
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.onUpdateTask.emit(tasks);
      })
    }
  }

  downTask(task){
    if(task.order !== this.tasks.length - 1){
      let upTask = new Task(this.tasks[task.order+1].date, this.tasks[task.order+1].header, this.tasks[task.order+1].description, this.tasks[task.order+1].checked, this.tasks[task.order+1].order-1, this.tasks[task.order+1].id);
      let downTask = new Task(this.tasks[task.order].date, this.tasks[task.order].header, this.tasks[task.order].description, this.tasks[task.order].checked, this.tasks[task.order].order+1, this.tasks[task.order].id);
      this.sub4$ = this.taskService.editTask(upTask)
      .pipe(mergeMap(()=>this.taskService.editTask(downTask)))
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.onUpdateTask.emit(tasks);
      })
      // console.log(downTask);
      // console.log(this.tasks.length);
    }
  }

  updateTask(task){
    this.router.navigate(['/edit', task.id]);

  }

  deleteTask(taskId){
    this.sub5$ = this.taskService.deleteTask(taskId)//.subscribe((data)=>{console.log('delete')})
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.onUpdateTask.emit(tasks);
      })
  }

  ngOnDestroy(){
    if(this.sub1$) this.sub1$.unsubscribe();
    if(this.sub2$) this.sub2$.unsubscribe();
    if(this.sub3$) this.sub3$.unsubscribe();
    if(this.sub4$) this.sub4$.unsubscribe();
    if(this.sub5$) this.sub5$.unsubscribe();
  }

}
