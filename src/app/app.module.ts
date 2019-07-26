import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TaskService } from './shared/services/task.service';
import { TaskComponent } from './task/task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskResolver } from './shared/services/task-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TaskComponent,
    EditTaskComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [TaskService, TaskResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
