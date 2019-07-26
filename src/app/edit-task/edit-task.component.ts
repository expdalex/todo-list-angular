import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) { }
  
  @Output() onUpdateTask = new EventEmitter<[{}]>();

  //taskId: any;
  task;
  form: FormGroup;

  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;



  ngOnInit() {
    this.sub2$ = this.route.data
      .subscribe((task)=>{
        //console.log(task.TaskResolver);
        this.task = task.TaskResolver;

      })

    this.form = new FormGroup({
      'header': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    const date = this.task.date;
    const header = this.form.value.header;
    const description = this.form.value.description;
    const checked = this.task.checked;
    const order = this.task.order;
    const id = this.task.id
    const newTask = new Task(date, header, description, checked, order, id);
    this.sub1$ = this.taskService.editTask(newTask)
      .pipe(mergeMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        //console.log(tasks);
        this.onUpdateTask.emit(tasks);
        this.form.setValue({
          header: '',
          description: ''
        })
        this.router.navigate(['']);
      })
  }

  cancel(){
    this.router.navigate(['']);
  }

  ngOnDestroy(){
    if(this.sub1$) this.sub1$.unsubscribe();
    if(this.sub2$) this.sub2$.unsubscribe();
    if(this.sub3$) this.sub3$.unsubscribe();
  }
}
