/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {

      todoList = [];

      add(todo){
        if(todo !== undefined)
          this.todoList.push(todo)
      }


      remove(indexOfTodo){

        if (indexOfTodo >= 0 && indexOfTodo < this.todoList.length) {
           this.todoList.splice(indexOfTodo, 1); // Removes one element at the specified index
        } 

      }


      update(index, updatedTodo){
        if (index >= 0 && index < this.todoList.length) {
          this.todoList[index] = updatedTodo;
       } 
      }


      getAll(){
        return this.todoList;
      }


      get(indexOfTodo){

        if (indexOfTodo >= 0 && indexOfTodo < this.todoList.length) {
          return this.todoList[indexOfTodo];
       } else {
           return null;
       }

      }


      clear(){
        this.todoList = [];
      }      

}

module.exports = Todo;