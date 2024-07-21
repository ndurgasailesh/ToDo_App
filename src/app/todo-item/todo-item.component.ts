import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskListService } from '../services/tasklist.service';
import { first } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { AlertService } from 'ngx-alerts';



@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input() title! : string ;
  @Input() description: string = '';
  @Input() dueDate!: Date; 
  @Input() status: boolean = false;
  @Input() id! : number ;

  @Output() editTaskList = new EventEmitter();
  @Output() deleteTaskList = new EventEmitter();


  constructor(protected modalService: ModalService,
    private taskListService: TaskListService
  ) { 

  }

  
  handleEditClick() {
    let taskList:any =  { title: this.title, description: this.description,dueDate:this.dueDate,id:this.id}
    this.editTaskList.emit(taskList);
  }
  handleDeleteClick() {
    if(window.confirm('Are sure you want to delete this item ?')){
      this.onDelete();
     }
  }
  onDelete() {
    this.taskListService.delete(this.id)
    .pipe(first())
    .subscribe({
      next: () => {
        this.deleteTaskList.emit(true);
      },
      error: error => {
        this.deleteTaskList.emit(false);
      }
    });
  }

   onDeleteEventNotified(itemId:number) {
    this.modalService.open('modal-delete')
   }

  onCloseModal() {
    this.modalService.close();
  }

  onCancel(){
    this.modalService.close();
  }
  
}
