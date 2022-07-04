import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Task from "../components/Task";
import context from "../context/context";
import "./Home.css";

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const {darkMode, setDarkMode} = useContext(context)

  const handleChange = ({target}) => {
    setTask(target.value);
  }

  const getTasks = async () => {
    await axios.get('http://localhost:3001/todo')
    .then((r) => setTasks(r.data))
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(() => {
    getTasks();
  }, [])
  useEffect(() => {
    getTasks();

  }, [tasks])

  const handleSubmit = async () => {
    await axios.post(`http://localhost:3001/todo`, {
      task
  });
  setTask('')
  }
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className={!darkMode ? "divFather" : "divFather-dark"}>
      <div className="title_content">
        <h1 className={darkMode ? 'h1-dark' : 'h1'}>TodoList</h1>
        <button onClick={toggleDarkMode} type="button">{darkMode ? '🌙' :'☀️' }</button>
      </div>
      <div className={darkMode ? "div-all-elements-dark": "div-all-elements"}>
      <section>
    <div className="divForm">
        <div >
          <label class="block text-gray-700 text-sm font-bold mb-2" for="todoInput">
          </label>
          <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="ex: make the bed"
          id="todoInput" value={task}
          onChange={handleChange} />
          <button
          className="button-4"
          type="button"
          disabled={task.length < 3 || task.length > 19 ? true : false}
          onClick={handleSubmit}
          >
            Add Task
          </button>
        </div>
    </div>
      </section>
      <main>
        {tasks.map((item) => 
        <Task key={item._id} props={item} />)}
      </main>
    </div>
    </div>
  )
}
