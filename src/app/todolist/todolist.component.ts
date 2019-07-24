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
  checkedTasks = [];

  //isChecked:boolean = false;
  showDesc:boolean = false;

  d = +new Date();
  descNum: number;

  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  sub4$: Subscription;
  sub5$: Subscription;

  ngOnInit() {
    this.sub5$ = this.taskService.getTasks().subscribe((tasks)=>{
      this.tasksNew = tasks;
      console.log(this.tasksNew);
    })

    this.form = new FormGroup({
      'header': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    const date = +new Date();
    const header = this.form.value.header;
    const description = this.form.value.description;
    //console.log(this.form);
    const newTask = new Task(date, header, description);
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

  updateTask(task){
    let header = '';
    while (header===''){
      header = prompt('input header');
    }
    let description = '';
    while (description===''){
      description = prompt('input description');
    }
    const newTask = new Task(task.date, header, description, task.id);
    this.sub2$ = this.taskService.editTask(newTask)
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.tasksNew = tasks;
      })
  }

  deleteTask(taskId){
    this.sub3$ = this.taskService.deleteTask(taskId)
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.tasksNew = tasks;
      })
  }

  sortTasks(){
    function compareTask(taskA, taskB) {
      return taskA.id - taskB.id;
    };
    this.tasksNew.sort(compareTask);
    console.log(this.tasksNew);
  }

  upTask(task){
    for(let i = 0; i < this.tasksNew.length; i++){
      if((task.id === this.tasksNew[i].id) && (i !== 0) ){
        [this.tasksNew[i - 1], this.tasksNew[i]] = [this.tasksNew[i], this.tasksNew[i - 1]];
      } 
    }
    //console.log(this.tasksNew);
  }

  downTask(task){
    for(let i = 0; i < this.tasksNew.length; i++){
      if((task.id === this.tasksNew[i].id) && (i !== this.tasksNew.length-1)){
        [this.tasksNew[i],this.tasksNew[i + 1]]=[this.tasksNew[i + 1],this.tasksNew[i]];
        break;
      }
    }
  }

  checked(task){
    //this.isChecked = true;
    for(let i = 0; i < this.tasksNew.length; i++){
      if(task.id === this.tasksNew[i].id){
        this.checkedTasks.push(task);
        this.deleteTask(task.id);
      }
    }
  }

  unchecked(checkedTask){
    for(let i = 0; i < this.checkedTasks.length; i++){
      if(checkedTask === this.checkedTasks[i]){
        this.checkedTasks.splice(i, 1);
        const uncheckedTask = new Task(checkedTask.date, checkedTask.header, checkedTask.description);
        this.sub4$ = this.taskService.createNewTask(uncheckedTask)
        .pipe(mergeMap(() => this.taskService.getTasks()))
        .subscribe((tasks) => {
          this.tasksNew = tasks;
        })
      }
    }
  }

  showDescription(task){
    for(let i = 0; i < this.tasksNew.length; i++){
      if(task.id === this.tasksNew[i].id){
        this.descNum = task.id;
        if(this.showDesc){
          this.showDesc = false
        } else {  
          this.showDesc = true;
        }
      }
    }
  }

  ngOnDestroy(){
    if(this.sub1$) this.sub1$.unsubscribe();
    if(this.sub2$) this.sub2$.unsubscribe();
    if(this.sub3$) this.sub3$.unsubscribe();
    if(this.sub4$) this.sub4$.unsubscribe();
    if(this.sub5$) this.sub5$.unsubscribe();
  }
}
