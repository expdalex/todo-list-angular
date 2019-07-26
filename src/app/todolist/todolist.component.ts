import { Component, OnInit, OnDestroy } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/models/task.model';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {

  constructor(private taskService: TaskService) { }

  form: FormGroup;

  tasksNew = [];

  sub1$: Subscription;
  sub2$: Subscription;

  ngOnInit() {
    this.sub2$ = this.taskService.getTasks().subscribe((tasks)=>{
      this.tasksNew = tasks;
      this.sortTasks();
      console.log(this.tasksNew);
    })
  
    this.form = new FormGroup({
      'header': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    })
  }

  updateTaskList(tasks){
    this.tasksNew = tasks;
    this.sortTasks();
  }

  onSubmit(){
    //console.log(this.form);
    const date = +new Date();
    const header = this.form.value.header;
    const description = this.form.value.description;
    const checked = false;
    const order = this.tasksNew.length;
    //console.log(this.form);
    const newTask = new Task(date, header, description, checked, order);
    this.sub1$ = this.taskService.createNewTask(newTask)
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.tasksNew = tasks;
        this.form.setValue({
          header: '',
          description: ''
        })
      })
  }

  sortTasks(){
    function compareTask(taskA, taskB) {
      return taskA.order - taskB.order;
    };
    this.tasksNew.sort(compareTask);
    //console.log(this.tasksNew);
  }

  ngOnDestroy(){
    if(this.sub1$) this.sub1$.unsubscribe();
    if(this.sub2$) this.sub2$.unsubscribe();
  }
}