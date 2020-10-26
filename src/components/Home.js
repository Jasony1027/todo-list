import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Todo from "./Todo";
import Form from "./Form";
import FilterButton from "./FilterButton";

const DATA = [
  { id: "todo-0", name: "Eat", status : 0 },
  { id: "todo-1", name: "Sleep", status : 0 },
  { id: "todo-2", name: "Repeat", status : 0 }
];

export const FILTER_MAP = {
  All: () => true,
  NotStarted: (task) => task.status == 0,
  Started: (task) =>  task.status== 1,
  Completed: (task) => task.status == 2,
};
export const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home(props) {
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
  function clearTasks(){
    setTasks([])
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
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
      <button type="button" className="btn btn__clearAll"  onClick={() => clearTasks()}>Clear All Tasks</button>
    </div>
  );
}

export default Home;
