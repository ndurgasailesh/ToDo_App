import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskListService } from '../services/tasklist.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskList } from '../models/todo';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todo: any[] = [];
  done: any[] = [];
  searchText: string = "";
  editMode: boolean = false;
  editTaskId: number | undefined = 0;

 // editedTaskListItem: TaskList | undefined;
  deleteTaskId: number = 0;

  // todoForm: FormGroup = new FormGroup({
  //   title: new FormControl(''),
  //   description: new FormControl(''),
  //   dueDate: new FormControl(''),

  // });


  constructor(protected modalService: ModalService,
    private taskListService: TaskListService,
    private toasterService:ToastrService
  ) {

    this.taskListService.refreshTaskData$.subscribe(refresh => {
      if (refresh) {

        this.retrieveTaskListsByUserId();
      }
    })
  }

   ngOnInit() { 
    this.retrieveTaskListsByUserId();
   }

  retrieveTaskListsByUserId(): void {
    this.taskListService.getUserTaskList()
      .subscribe({
        next: (data: any) => {
          this.todo = data;
          console.log(this.todo);

        },
        error: (e) => console.error(e)
      });
  }

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
      let index: any = +event.currentIndex.toString();
      let moveditem: any = event.container.data[index];

      const taskList = moveditem as TaskList;
      taskList.isCompleted = !taskList.isCompleted;
      //this.updateTaskList(taskList);
      console.log('Recenetly moved Item' + moveditem);
      window.scroll(0, 0);

    }
  }

  onEditEventNotified(item: TaskList) {
    //this.editedTaskListItem = item;
    this.editMode = true;
    this.editTaskId = item.id;
    this.taskListService.taskUpdate(item);
    this.modalService.open('modal-1')
  }

  onAddEventNotified(event: any) {
    this.editMode = false;
    this.retrieveTaskListsByUserId();
    this.toasterService.success("Task addedd successfully")

  }

  onDeleteEventNotified(isDeleted: boolean) {


    if (isDeleted) {
      this.retrieveTaskListsByUserId();
      this.toasterService.success("Task deleted successfully")

    }
  }

  onCloseModal() {
    this.modalService.close();
    this.retrieveTaskListsByUserId();
  }

  onCancel() {
    this.modalService.close();
  }

  onModalClose() {
    this.onCloseModal();
  }

}
