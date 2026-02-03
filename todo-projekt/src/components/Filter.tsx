import "../css/Filter.css";


type FilterProps = {
 task: {
    name: string;
    erledigt: boolean;
}[];
setFilter: React.Dispatch<React.SetStateAction<{name: string, erledigt: boolean}[]>>;
}

 function Filter({task, setFilter}: FilterProps) {



const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(_ => {
        const filteredTasks = task.filter(task => task.name.toLowerCase().includes(value.toLowerCase()));
        console.log(filteredTasks);   
        setFilter(filteredTasks);
        return filteredTasks;
    });

};

const erledigt = () => {
  const filteredTasks = task.filter(task => task.erledigt === true);
  setFilter(filteredTasks);
  console.log(filteredTasks);
}

const unerledigt = () => {
  const filteredTasks = task.filter(task => task.erledigt === false);
  setFilter(filteredTasks);
   console.log(filteredTasks);
}

const alle = () => {
     const filteredTasks = task.filter(task => task);
  setFilter(filteredTasks);

}

  return (
    <>
        
    <div className="d-flex flex-column mt-5 w-75 mx-auto">
  <label htmlFor="todo-input" className="text-center mb-2 fs-4  text-primary">
    Filter!
  </label>
  <input
    type="text"
    title="filter"
    className="form-control w-100"
    onChange={handleChange}
  />
</div>

<div className="d-flex align-items-center justify-content-center gap-5 mt-2">
<button className="btn btn-primary" onClick={erledigt}>Erledigt</button>
<button className="btn btn-primary" onClick={unerledigt}>Nicht erledigt</button>
<button className="btn btn-primary" onClick={alle}>Alle</button>
</div>



    </>
  )
}

export default Filter;

