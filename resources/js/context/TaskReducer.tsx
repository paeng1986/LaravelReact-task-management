export default (state: any, action: any) => {
    switch (action.type) {
        case 'delete_task':
            return {
                ...state,
                tasks: state.tasks.filter((task: any) => task.id !== action.payload),
                list: state.list.filter((list: any) => list.id !== action.payload)
            }
        case 'add_task':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                list: [...state.list, action.payload]
            }
        case 'update_task':
            const updatedTask = action.payload;

            const updatedTasks = state.tasks.map((task: any) => {
                if (task.id === updatedTask.id) return updatedTask;
                return task;
            })

            return {
                ...state,
                tasks: updatedTasks,
                list: updatedTasks
            }
        case 'update_status':
            const updateStatus = state.tasks.map((task: any) => {
                if (task.id === action.payload.id) {
                    task.status = action.payload.status;
                    return task;
                }
                return task;
            });
            return {
                ...state,
                tasks: updateStatus,
                list: updateStatus,
            }
        case 'search_task':
            return {
                ...state,
                list: state.tasks.filter((task: any) => {
                    return task.name.toLowerCase().includes(action.payload.search.toLowerCase()) ||
                        task.status.toLowerCase().includes(action.payload.search.toLowerCase());
                })
            }
        case 'load_tasks':
            return {
                ...state,
                tasks: action.payload,
                list: action.payload,
            }
        default: return state;
    }
}