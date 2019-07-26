import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskResolver } from './shared/services/task-resolver.service';


const routes: Routes = [
    {path: '', component: TodolistComponent},
    {path: 'edit/:id', component: EditTaskComponent, resolve: {TaskResolver}}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}