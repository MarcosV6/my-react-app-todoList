import React, { useState, useRef , useEffect } from "react";
import TodoList from "./TodoList";
const { v4: uuidv4 } = require('uuid');


const LOCAL_STORAGE_KEY = 'todoApp.tools'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  //store todo Data

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
    

  }, [])

// get todo info Data
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)

     
  }

  function handleAddTodo(e){
    const name =todoNameRef.current.value
    if( name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4() , name: name, complete:false}]
    })
    todoNameRef.current.value = null

  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type='text'  />
    <button onClick={handleAddTodo}> add todo</button>
    <button onClick={handleClearTodos}> clear completed todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
