import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { ArchivedTodosPage } from "../archived-todos/archived-todos";
import { TodoServiceProvider } from "../../providers/todo-service/todo-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos= [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage;


  constructor(public navCtrl: NavController, private alertController: AlertController, private todoService: TodoServiceProvider,
              private toastController:ToastController) {
    this.todos= this.todoService.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoService.archivedTodo(todoIndex);
  }

  toggleReorder(){
    this.reorderIsEnabled= !this.reorderIsEnabled;
  }

  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  openTodoAlert(){

    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message:"Enter your todo",
      inputs:[{
        type:"text",
        name:"addTodoInput"
      }],
      buttons:[
        {
          text:"Cancel"
        },
        {
          text:"add Todo",
          handler:(inputData)=>{
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoService.addTodo(todoText);

            addTodoAlert.onDidDismiss(()=>{
              let addTodoToast = this.toastController.create({
                message:'Todo Added',
                duration: 2000
              });
              addTodoToast.present();
            })


          }
        }
      ]

    });
    addTodoAlert.present();

  }


  editTodo(todoIndex){

    let editTodoAlert = this.alertController.create({
      title: "edit A Todo",
      message:"edit your todo",
      inputs:[{
        type:"text",
        name:"editTodoInput",
        value:this.todos[todoIndex]
      }],
      buttons:[
        {
          text:"Cancel"
        },
        {
          text:"edit Todo",
          handler:(inputData)=>{
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoService.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(()=>{
              let editTodoToast = this.toastController.create({
                message:'Todo is edited',
                duration: 2000
              });
              editTodoToast.present();
            })


          }
        }
      ]

    });
    editTodoAlert.present();

  }

}
