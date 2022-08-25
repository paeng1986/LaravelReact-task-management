import { useContext, useState, useEffect, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskForm from './TaskForm';
import DropDown from './DropDown';
import Pagination from './Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

let PageSize = 10;

const TasksList = () => {
    const [form, setForm] = useState(null);
    const [isShowDropDown, setShowDropDown] = useState<boolean>(false);
    const { list, searchTask, deleteTask } = useContext(TaskContext);
    const [btnName, setBtnName] = useState<string>("New Task");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return list.slice(firstPageIndex, lastPageIndex);
    }, [list, currentPage])

    const onInputChange = (e: any) => {
        searchTask({ [e.target.name]: e.target.value });
    }

    const OpenForm = (action: string, task?: any) => {
        if (action === 'new') setForm(null);
        else setForm(task);
        document.querySelector('.modal')?.classList.add('is-active');
    }

    const Delete = (id: number) => {
        deleteTask(id);
    }

    const toggleDropDown = () => {
        setShowDropDown(!isShowDropDown);
    }

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setBtnName("+");
        }
        else setBtnName("New Task");
    }, [currentPage]);


    return (
        <>
            <div className="columns is-mobile">
                <div className="column">
                    <div className="columns">
                        <div className="column is-two-fifths">
                            <input type="text" className="input" name="search" placeholder="Search" onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="column" id="new-task">
                            <button className="button is-link is-pulled-right" onClick={() => OpenForm('new')}>{btnName}</button>
                        </div>
                    </div>
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                {/* <th>No</th> */}
                                <th>Task</th>
                                <th>Status</th>
                                <th style={{ width: "135px" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (currentData.length > 0) ? currentData.map((task: any, i: number) => {
                                    return <tr key={i}>
                                        {/* <td> {(i + 1) + ((currentPage - 1) * 10)} </td> */}
                                        <td><div>{task.name} </div> </td>
                                        <td>
                                            <DropDown listName={task.status} taskId={task.id} showDropDown={false} onClick={() => toggleDropDown()} />
                                        </td>
                                        <td>
                                            <button className="button is-white" onClick={() => OpenForm('edit', task)}><FontAwesomeIcon icon={faEdit as IconProp} /></button>
                                            <button className="button is-white" onClick={() => Delete(task.id)}><FontAwesomeIcon icon={faTrashAlt as IconProp} /></button>
                                        </td>
                                    </tr>
                                }) : (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: "center" }}> No data to display </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <TaskForm task={form} />
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={list.length}
                pageSize={PageSize}
                onPageChange={(page: any) => setCurrentPage(page)}
            />
        </>


    )
}

export default TasksList;