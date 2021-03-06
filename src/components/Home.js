import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Todo from "./Todo";
import Form from "./Form";
import FilterButton from "./FilterButton";

const DATA = [
  { id: "todo-0", name: "Code", completed: false },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

export const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
export const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home() {
  //hooks
  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    const data = localStorage.getItem("listOfTasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("listOfTasks", JSON.stringify(tasks));
  });
  //lists
  const taskList = tasks
    .filter((task) => FILTER_MAP[filter](task))
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  //functions
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
    return name;
  }
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  function clearTasks() {
    setTasks([]);
  }
  //constants
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large" data-testid="app">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 data-testid="headingText" id="list-heading">
        {headingText}
      </h2>
      <button
        type="button"
        className="btn btn__clearAll"
        onClick={() => clearTasks()}
      >
        Clear All Tasks
      </button>

      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default Home;
