import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {createTask,getTasks,deleteTask,updateTask} from "../services/taskService";
import type { TaskResponse } from "../types/task";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Tasks() {



const [tasks, setTasks] = useState<TaskResponse[]>([]);
const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
const [editingTaskValues, setEditingTaskValues] = useState<{ title: string; description: string }>({ title: "", description: "" });

const { isAuthenticated, logout,loading  } = useContext(AuthContext)!;

const fetchTasks = async () => {
  try {
    const response = await getTasks();
    setTasks(response.data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

useEffect(() => {
  fetchTasks();
}, []);


  const [task, setTask] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });
  const [filterType, setFilterType] = useState<"all" | "completed" | "active">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  // Derived State - wird automatisch berechnet
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "completed" && task.completed) ||
      (filterType === "active" && !task.completed);
    return matchesSearch && matchesFilter;
  });


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!task.title.trim() || !task.description.trim()) return;

  await createTask({ title: task.title, description: task.description });
  setTask({ title: "", description: "" });
  fetchTasks();
};

const handleDelete = async (id: number) => {
  await deleteTask(id);
  fetchTasks(); 
};

  const toggleCheckbox = async (id: number) => {
    setTasks(
      tasks.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
    const toggledTask = tasks.find(item => item.id === id);
    if (!toggledTask) return;

    try {
        await updateTask(id, { completed: !toggledTask.completed });  // Erst API Call
        fetchTasks();  // Dann State aktualisieren
    } catch (error) {
        console.error("Error updating task:", error);
    }
  };

  const startEditing = (task: TaskResponse) => {
setEditingTaskId(task.id!);
setEditingTaskValues({ title: task.title, description: task.description });
};

  const handleClickLogOut = () => {
    logout();
    navigate("/");
    
  }

useEffect(() => {
  if (!loading && !isAuthenticated) {
    navigate("/");
  }
}, [loading, isAuthenticated, navigate]);


    let token = localStorage.getItem("token");

  useEffect(() => {
     token = localStorage.getItem("token");
  },[navigate])

    const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskValues({ title: "", description: "" });
  };

const saveEditing = async (id: number) => {
  try {
    await updateTask(id, editingTaskValues);
    cancelEditing();
    fetchTasks(); // 🔥 State wieder synchron
  } catch (error) {
    console.error("Error updating task:", error);
  }
};


  return (

    (token && token !== null) &&
    <div>
      
      <div className="d-flex justify-content-end">
        <button className="btn btn-outline-danger" onClick={() => handleClickLogOut()}>Logout</button>
      </div>
      <div className="d-flex flex-column mt-5 w-75 mx-auto">
        <label className="text-center mb-2 fs-4 text-primary">Filter!</label>
        <input
          type="text"
          title="filter"
          className="form-control w-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Task suchen..."
        />
      </div>

      <div className="d-flex align-items-center justify-content-center gap-5 mt-2">
        <button
          className={`btn ${filterType === "completed" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilterType("completed")}
        >
          Erledigt
        </button>
        <button
          className={`btn ${filterType === "active" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilterType("active")}
        >
          Nicht erledigt
        </button>
        <button
          className={`btn ${filterType === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilterType("all")}
        >
          Alle
        </button>
      </div>

      <hr />

      <form className="d-flex flex-column mt-5 w-75 mx-auto" onSubmit={handleClick}>

<div className="d-flex gap-3 mx-auto text-center">
  <div>
  <label className="text-center mb-2 fs-4 text-primary">Title</label>
        <input
          type="text"
          title="add"
          className="form-control w-100"
          value={task.title}
          onChange={handleInput}
          name="title"
          required
        />
  </div>

<div>
          <label className="text-center mb-2 fs-4 text-primary">Description</label>
        <input
          type="text"
          title="add"
          className="form-control w-100"
          name="description"
          value={task.description}
          onChange={handleInput}
          required
        />
</div>

</div>
      


        <button className="btn btn-success mt-3 w-25 mx-auto" type="submit">
          Add
        </button>
      </form>

      {filteredTasks.length === 0 ? (
        <p className="text-center mt-5 text-muted">Keine Tasks gefunden</p>
      ) : (
        filteredTasks.map((taskItem) => (
          <div
            className="d-flex flex-row mt-5 w-75 mx-auto justify-content-between"
            key={taskItem.id}
          >
            <ul>
              <li
                style={{
                  textDecoration: taskItem.completed ? "line-through" : "none",
                  color: taskItem.completed ? "#999" : "#000",
                }}
              >
                  {editingTaskId === taskItem.id ? (
                    <>
                      <input type="text" title="Edit Title" value={editingTaskValues.title} onChange={e => setEditingTaskValues(prev => ({ ...prev, title: e.target.value }))} />
                      <input type="text" title="Edit Description" value={editingTaskValues.description} onChange={e => setEditingTaskValues(prev => ({ ...prev, description: e.target.value }))} />
                      <button className="btn btn-primary mx-2" onClick={() => saveEditing(taskItem.id!)}>Save</button>
                      <button className="btn btn-secondary mx-2" onClick={cancelEditing}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {taskItem.title} - {taskItem.description}
                    </>
                  )}
              </li>
            </ul>
            <div>
              <label htmlFor="checkbox">-erledigt-</label>
              <input
                type="checkbox"
                title="checkbox"
                checked={taskItem.completed}
                onChange={() => toggleCheckbox(taskItem.id!)}
              />
              <button className="btn btn-danger mx-2" onClick={() => handleDelete(taskItem.id!)}>
                Delete
              </button>
                <button className="btn btn-warning mx-2" onClick={() => startEditing(taskItem)}>
                Edit
              </button>
            </div>
          </div>
        ))
      )}

      <div className="text-center mt-4">
        <p className="text-muted">
          Zeige {filteredTasks.length} von {tasks.length} Tasks
        </p>
      </div>
    </div>
  );
}

export default Tasks;