import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

interface Props {
    task?: any
}

const TaskForm: React.FC<Props> = ({ task }: Props): any => {

    const { addTask, updateTask } = useContext(TaskContext);

    const [formTask, setFormTask] = useState({
        id: 0, name: "", description: "", priority: false, status: "To do"
    });

    const onInputChange = (e: any) => {
        setFormTask({ ...formTask, [e.target.name]: e.target.value });
    };

    const Close = () => {
        document.querySelector('.modal')?.classList.remove('is-active')
    }

    const onSetForm = (form: any) => {
        setFormTask(form);
    }

    const SubmitForm = async (e: React.FormEvent<HTMLFormElement>, task: any) => {
        e.preventDefault();
        try {
            if (task.id === 0) {
                await addTask(task);
            } else {
                await updateTask(task);
            }

            document.querySelector('.modal')?.classList.remove('is-active');
        } finally { }
    }

    useEffect(() => {
        if (task != null) onSetForm(task);
        else onSetForm({ id: 0, name: "", description: "", priority: false, status: "To do" });
    }, [task]);

    return (
        <div className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">New Task</p>
                    <button className="delete" aria-label="close" onClick={Close}></button>
                </header>

                <form onSubmit={(e) => SubmitForm(e, formTask)}>
                    <section className="modal-card-body">
                        <div className="columns is-mobile">
                            <div className="column is-two-thirds">
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Task name" value={formTask.name} name="name" onChange={(e) => onInputChange(e)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="select is-fullwidth">
                                    <select name="status" value={formTask.status} onChange={(e) => onInputChange(e)} required>
                                        <option value="To do">To do</option>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="columns is-mobile">
                            <div className="column">
                                <div className="field">
                                    <div className="control">
                                        <textarea className="textarea" placeholder="Description" value={formTask.description} name="description" onChange={(e) => onInputChange(e)}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" type="submit"> Save </button>
                    </footer>

                </form>
            </div>
        </div >
    );

}

export default TaskForm;