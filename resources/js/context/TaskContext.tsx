import { createContext, useReducer, useEffect } from 'react';
import { Create, Read, Update, UpdateStatus, Delete } from '../api/Tasks';
import TaskReducer from './TaskReducer';
import Swal from 'sweetalert2';

const SuccessMessage = (message: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: message
    })
}

const ErrorMessage = (message: string) => {
    Swal.fire({
        icon: 'error',
        text: message
    });
}

const initialState: any = {
    tasks: [],
    list: []
}

export const TaskContext = createContext(initialState);
export const TaskProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    useEffect(() => {
        Read().then((response) => {
            let result = response.data;
            dispatch({
                type: 'load_tasks',
                payload: result
            });
        });
    }, []);

    const searchTask = (search: any) => {
        dispatch({
            type: 'search_task',
            payload: search
        })
    }

    const deleteTask = async (id: number) => {
        try {
            let result = await Swal.fire({
                title: `Are you sure to delete #${id}?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                let response = await Delete(id);
                dispatch({
                    type: 'delete_task',
                    payload: id
                });

                SuccessMessage(response.data.message);
            }
        } catch (error) {
            ErrorMessage('Something goes wrong while creating a task!!');
        }

    }

    const addTask = async (tasks: any) => {
        try {
            let response = await Create(tasks);
            tasks.id = response.data.last_insert_id;
            dispatch({
                type: 'add_task',
                payload: tasks
            });

            SuccessMessage(response.data.message);
        } catch (error) {
            ErrorMessage('Something goes wrong while creating a task!!');
        }

    }

    const updateTask = async (tasks: any) => {
        try {
            let response = await Update(tasks);
            dispatch({
                type: 'update_task',
                payload: tasks
            });

            SuccessMessage(response.data.message);
        } catch (error) {
            ErrorMessage('Something goes wrong while creating a task!!');
        }
    }

    const updateStatus = async (id: number, status: string) => {
        try {
            let response = await UpdateStatus(id, status);
            dispatch({
                type: 'update_status',
                payload: { id: id, status: status }
            });

            SuccessMessage(response.data.message);
        } catch (error) {
            ErrorMessage('Something goes wrong while creating a task!!');
        }
    }


    return (
        <TaskContext.Provider value={{
            list: state.list,
            searchTask,
            deleteTask,
            addTask,
            updateTask,
            updateStatus
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;