import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiCheckCircle, BiTrash, BiPencil } from 'react-icons/bi';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: 'cover',
      }}
    >
      <div className="card p-4 text-center" style={{ width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <h1 className="mb-4">To-Do List</h1>
        <ul className="list-group mb-4" style={{ borderTop: '2px solid #007BFF', borderBottom: '2px solid #007BFF' }}>
          {}
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                index % 2 === 0 ? 'list-group-item-light' : 'list-group-item-dark'
              } ${task.completed ? 'list-group-item-success' : ''}`}
            >
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  flex: '1',
                }}
              >
                {task.text}
              </span>
              <div>
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className={`btn btn-outline-success me-2 ${
                    task.completed ? 'active' : ''
                  }`}
                >
                  <BiCheckCircle />
                </button>
                <button
                  onClick={() => handleEditTask(task.id, prompt('Yeni metin:'))}
                  className="btn btn-outline-warning me-2"
                >
                  <BiPencil />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn btn-outline-danger"
                >
                  <BiTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <textarea
          rows="3"
          className="form-control mb-3"
          placeholder="Yeni görev ekle..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleAddTask}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default App;
