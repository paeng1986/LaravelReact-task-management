import Axios from 'axios';

const Headers: any = {
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
    }
}

console.log(Headers);


const BASE_URL = 'http://127.0.0.1:8000/api/tasks';

export const
    Create = (task: any) => { return Axios.post(BASE_URL, task, Headers); },
    Read = async () => { return await Axios.get(BASE_URL); },
    Update = async (task: any) => { return await Axios.put(BASE_URL + `/${task.id}`, task) },
    UpdateStatus = async (id: number, status: string) => { return await Axios.put(BASE_URL + `/${id}`, { id, status }); },
    Delete = async (id: number) => { return await Axios.delete(BASE_URL + `/${id}`); };
