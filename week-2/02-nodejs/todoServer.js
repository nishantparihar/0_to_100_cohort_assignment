/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  const fs = require('fs');
  
  const app = express();
  
  app.use(bodyParser.json());

  
  let todoList = []


  app.get("/todos", (req, res) => {

      res.status(200).json(todoList);
  });



  app.get("/todos/:id", (req, res) => {
      const requestedTodo = req.params.id;

      for(let i = 0; i < todoList.length; i++){
        const curTodo = todoList[i];
        const curId = curTodo["id"];

        if(curId == requestedTodo){
          res.json(curTodo);
        }
      }

      res.status(404).send();
      
  })




  app.post("/todos", (req, res) => {
      const createTodo = req.body;
      const createId = Math.floor(Math.random() * 1000000);
      const newTodo = {
        id : createId,
        title : createTodo.title,
        description: createTodo.description
      }

      todoList.push(newTodo);
      
      res.status(201).json({id : newTodo.id});
  })



  app.put("/todos/:id", (req, res) => {
    const updateId = req.params.id;
    const updateTodo = req.body;

    let flag = false;

    for(let i = 0; i < todoList.length; i++){
      const curTodo = todoList[i];
      const curId = curTodo["id"];

      if(curId == updateId){
        todoList[i].title = updateTodo.title;
        todoList[i].description = updateTodo.description;

        res.status(200).send();
        flag = true;
        break;
      }

    }

    if(!flag){
      res.status(404).send();
    }

  })




  app.delete("/todos/:id", (req, res) => {
    const deleteId = req.params.id;

    let flag = false;

    for(let i = 0; i < todoList.length; i++){
      const curTodo = todoList[i];
      const curId = curTodo["id"];

      if(curId == deleteId){
        todoList = todoList.filter(obj => obj.id !== curId);

        res.status(200).send();
        flag = true;
        break;
      }

    }

    if(!flag){
      res.status(404).send();
    }

  })


  app.all("*", (req, res)=>{
    res.status(404).send();
  })



  module.exports = app;