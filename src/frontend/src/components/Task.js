import axios from "axios";
import { useContext, useState } from "react";
import context from "../context/context";
import "./Task.css";

export default function Task({props}) {
  const [state, setState] = useState({
    editing: false,
    _id: props._id,
    value: props.task,
    complete: false
  });
  const {darkMode} = useContext(context)

  const handleChange = ({target}) => {
    setState({...state, value: target.value});
  }
  const handleEdit = () => {
    setState({...state, editing: !state.editing});
    console.log(state.editing);
  }
  const submitChange = async () => {
    handleEdit();
    await axios.put(`http://localhost:3001/todo/${state._id}`, {
      task: state.value
  });
  }
  const deleteTask = async () => {
    console.log(state);
    await axios.delete(`http://localhost:3001/todo/${state._id}`);
  }
  const toggleComplete = () => {
    setState({...state, complete: !state.complete})
  }
  return (
    <div className={darkMode ? "taskFather-dark" : "taskFather"}>
    <div onDoubleClick={toggleComplete}>
    <span className="emojiBall">{state.complete ? '🔴' : '⚫'}</span>
    {state.editing ? <input className="task_btns_input" type='text' value={state.value} onChange={handleChange}></input> : <span className={state.complete ? 'editing': ''} key={state._id}>{state.value}</span>}
    </div>
    <div className="task_btns">
    <button
    type="button"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    onClick={deleteTask}>🗑️</button>
    {state.editing ? <button disabled={state.value.length < 3 || state.value.length > 19 ? true : false} type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={submitChange}>✅</button> : <button     class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleEdit}>📖</button>}
    </div>
  </div>
  )
}
