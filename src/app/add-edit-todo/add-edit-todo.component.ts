import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { TaskListService } from '../services/tasklist.service';
import { TaskList } from '../models/todo';
import { first } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent {

  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  @Input() id:number | undefined ;  

  @Input() editMode:boolean = false;

  //editedTaskListItem:TaskList | undefined;
  deleteTaskId:number = 0;

  @Output() addTaskList = new EventEmitter();
  @Output() editTaskList = new EventEmitter();
  @Output() deleteTaskList = new EventEmitter();
  @Output() refreshDataEvent = new EventEmitter();
  

  todoForm: FormGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(  '',
      [
        Validators.required,
        Validators.maxLength(250)
      ]),
    dueDate: new FormControl((new Date()).toISOString().substring(0, 10))
});


  constructor(protected modalService: ModalService,
    private formBuilder: FormBuilder,
    private taskListService: TaskListService,
  ) {
    this.taskListService.updateTaskList$.subscribe((item:TaskList) => {
      if(item){
        this.todoForm.controls['title'].setValue(item.title); 
        this.todoForm.controls['description'].setValue(item.description!);  
        this.todoForm.controls['dueDate'].setValue(formatDate(item.dueDate,'yyyy-MM-dd','en'));  
        this.id = item.id;
        this.title = 'Edit User';
      }
    })
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

    this.title = 'Add User';
   
  }

  get form(): { [key: string]: AbstractControl } {
    return this.todoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.invalid) {
      return;
    }
    console.log(this.todoForm.value);
    console.info("Form Valid!")

    let taskList:any =  { title: this.form['title'].value, description: this.form['description'].value,dueDate:this.form['dueDate'].value,id:undefined}

    this.saveUser()
    .pipe(first())
    .subscribe(res=>{
      this.taskListService.refreshTaskListData();
      //this.refreshDataEvent.emit(true);
    })
    this.onCloseModal();

  }
  
  onUpdate() {
    this.submitted = true;
    if (this.todoForm.invalid) {
      return;
    }
    this.taskListService.update(this.id,this.todoForm.value)
    .pipe(first())
    .subscribe({
        next: () => {
         this.onCloseModal();
        },
        error: error => {
        }
    });
    console.log(this.todoForm.value);
  }

  handleEditClick() {
    let taskList:any =  { title: this.todoForm.controls['title'].value, description: this.todoForm.controls['description'].value
      ,dueDate:this.todoForm.controls['dueDate'].value,id:this.id}
    this.editTaskList.emit(taskList);
  }

  onCloseModal() {
    this.modalService.close();
    this.todoForm.reset();
  }

  onCancel(){
    this.modalService.close();
     this.todoForm.reset();
  }

  private saveUser() {

    // create or update user based on id param
    return this.id
        ? this.taskListService.update(this.id!, this.todoForm.value)
        : this.taskListService.create(this.todoForm.value);

}

}
