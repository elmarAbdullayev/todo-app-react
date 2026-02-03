import { instance } from "./api";

export function getTasks() {
    return instance.get("/api/get_all_tasks");
}

export function createTask(task: { title: string; description: string }) {
    return instance.post("/api/erstell_task", task);
}

export function updateTask(id:number,task:{title?:string,description?:string,completed?:boolean}) {
    return instance.put(`/api/put_task/${id}`, task);
}

export function deleteTask(id:number){
    return instance.delete(`/api/delete_task/${id}`)
}