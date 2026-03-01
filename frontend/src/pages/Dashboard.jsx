import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!userInfo) {
        navigate("/login");
    }
    }, []);

  const saveTask = async () => {
  if (!title) return;

  if (editId) {
    // UPDATE
    const res = await fetch(
      `http://localhost:3000/tasks/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ title })
      }
    );

    const updatedTask = await res.json();

    setTasks(
      tasks.map(task =>
        task._id === editId ? updatedTask : task
      )
    );

    setEditId(null);
  } else {
    // CREATE
    const res = await fetch(
      "http://localhost:3000/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ title })
      }
    );

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  }

  setTitle("");
};

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

  setTasks(tasks.filter(task => task._id !== id));
  };

  useEffect(() => {
    fetch("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const logoutHandler = () => {
  localStorage.removeItem("userInfo");
  navigate("/");
  };

  const toggleComplete = async (task) => {
    const res = await fetch(
      `http://localhost:3000/tasks/${task._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          completed: !task.completed
        }),
      }
    );

  const updatedTask = await res.json();

  setTasks(
    tasks.map((t) =>
      t._id === task._id ? updatedTask : t
    )
  );
};

  return (
    <div className="container">
      <button onClick={logoutHandler}>Logout</button>
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map(task => (
          <div key={task._id} className="task-item">

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

              <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task)}/>

              <span className="task-title"style={{textDecoration: task.completed ? "line-through" : "none",opacity: task.completed ? "0.6" : "1"}}>
                {task.title}
              </span>

              {/* 👇 SHOW USER NAME (only if exists) */}
              {task.user && (
                <span style={{fontSize: "12px",color: "#888",marginLeft: "10px"}}>
                  {task.user.name}
                </span>
              )}

            </div>

            <div className="task-buttons">
              <button className="update-btn" onClick={() => {
                  setTitle(task.title);
                  setEditId(task._id);
                }}>
                Update
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>

          </div>
        ))
      )}

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task"/>

        <button onClick={saveTask}>
          {editId ? "Update Task" : "Add Task"}
        </button>
    </div>
  );
}

export default Dashboard;