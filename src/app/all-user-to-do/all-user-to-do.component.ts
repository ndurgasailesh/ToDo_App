import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import {  FormBuilder } from '@angular/forms';
import { TaskListService } from '../services/tasklist.service';
import { TaskList } from '../models/todo';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-all-user-to-do',
  templateUrl: './all-user-to-do.component.html',
  styleUrls: ['./all-user-to-do.component.css']
})
export class AllUserToDoComponent implements OnInit {


  searchText: string = "";
  editMode: boolean = false;
  editTaskId: number | undefined = 0;

  //editedTaskListItem: TaskList | undefined;
  deleteTaskId: number = 0;

  allUserTodoList:any[] = [];

  constructor(protected modalService: ModalService,
    private formBuilder: FormBuilder,
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
    this.taskListService.getAll()
      .subscribe({
        next: (data: any) => {
          this.allUserTodoList = data;
        },
        error: (e) => console.error(e)
      });
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
    this.toasterService.success("Task addedd successfully")
    this.retrieveTaskListsByUserId();
  }

  onDeleteEventNotified(isDeleted: boolean) {
    if (isDeleted) {
      this.toasterService.success("Task addedd successfully")
      this.retrieveTaskListsByUserId();
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

  usrs(index : number, user: any){
    return user ? user.id : undefined;
  }
  userTasklists(index : number, usertask: any){
    return usertask ? usertask.id : undefined;
  }
}

