import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { TaskList } from '../models/todo';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import { TaskListService } from '../services/tasklist.service';
import { first } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  todoList:any= [];
  doneList:any = [];
  //editedTaskListItem:TaskList | undefined;

  todoForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl(''),
  
  });

  constructor(private formBuilder: FormBuilder
    ,private taskListService:TaskListService,
  private toastedService:ToastrService) {
      this.retrieveTaskListsByUserId();
  }

  get form() { return this.todoForm.controls; }


  onSubmit() {

    if (this.todoForm.invalid) {
      return;
    }
    console.log(this.todoForm.value);
    console.info("Form Valid!")

    this.taskListService.create(this.todoForm.value)
    .pipe(first())
    .subscribe({
        next: () => {
          this.retrieveTaskListsByUserId();

        },
        error: error => {
            // this.error = error;
            // this.loading = false;
        }
    });
   }

   retrieveTaskListsByUserId(): void {
    this.taskListService.getUserTaskList()
      .subscribe({
        next: (data:any) => {
          this.todo = data;
         // this.t = data;
          console.log(this.todo );
        
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
    this.todoForm = this.formBuilder.group(
      {
      title: new FormControl<string>('', Validators.required),
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(250)
        ]
      ],
      dueDate: new FormControl((new Date()).toISOString().substring(0, 10))
    })
    this.retrieveTaskListsByUserId();
  }

  onEdit(item:TaskList) {
   this.todoForm.controls['title'].setValue(item.title); 
   this.todoForm.controls['description'].setValue(item.description!);  
   this.todoForm.controls['dueDate'].setValue(formatDate(item.dueDate,'yyyy-MM-dd','en'));  
   //this.editedTaskListItem = item;
   window.scroll(0,0);
  }

  // onUpdate() {
  //   let taskList:any =  { title: this.form['title'].value, description: this.form['description'].value,dueDate:this.form['dueDate'].value,id:this.editedTaskListItem?.id}
  //   this.taskListService.update(this.editedTaskListItem?.id,this.todoForm.value)
  //   .pipe(first())
  //   .subscribe({
  //       next: () => {
  //       },
  //       error: error => {
  //           // this.error = error;
  //           // this.loading = false;
  //       }
  //   });
  //   console.log(this.todoForm.value);
  // }

  onDelete(item:TaskList){
    this.taskListService.delete(item.id)
    .pipe(first())
    .subscribe({
        next: () => {
         this.retrieveTaskListsByUserId();
        //  let taskList:any =  { title: this.form['title'].value, description: this.form['description'].value,dueDate:this.form['dueDate'].value}
        //   this.todoList.push(taskList);
        },
        error: error => {
            // this.error = error;
            // this.loading = false;
        }
    });
    console.log(this.todoForm.value);
  }

  onCompletedTask(event:any){
    console.log(event);

  }

  undoCompletedTask(event:any) {
    console.log(event);
  }

  todo :any[] = [];

  done :any[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let index :any = +event.currentIndex.toString();
      let moveditem : any =  event.container.data[index];

      const taskList = moveditem as TaskList;
      taskList.isCompleted = !taskList.isCompleted;
      this.updateTaskList(taskList);
    }
  }

  updateTaskList(taskList:any){
    this.taskListService.update(taskList?.id,taskList)
    .pipe(first())
    .subscribe({
        next: () => {
        //  let taskList:any =  { title: this.form['title'].value, description: this.form['description'].value,dueDate:this.form['dueDate'].value}
        //   this.todoList.push(taskList);
        },
        error: error => {
            // this.error = error;
            // this.loading = false;
        }
    });
  }
}
