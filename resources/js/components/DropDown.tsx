import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

interface Props {
    taskId: number;
    listName: string;
    showDropDown: boolean;
    onClick: (event: any) => void

}

const dropDownList: any = ['To do', 'Pending', 'In Progress', 'Completed'];

const DropDown: React.FC<Props> = ({ taskId, listName }: Props): JSX.Element => {

    const { updateStatus } = useContext(TaskContext);

    const handleClick = (e: any) => {
        let elem = e.target.closest('.dropdown');
        if (elem.classList.contains('is-active')) elem.classList.remove('is-active');
        else elem.classList.add('is-active');
    }

    const dismissHandler = (e: React.FocusEvent): void => {
        if (e.relatedTarget?.id != 'dropdown-menu') e.target.closest('.dropdown')?.classList.remove('is-active');
    }

    const listClick = (e: any, name: string) => {
        updateStatus(taskId, name);
        let elem = e.target.closest('.dropdown');
        elem.classList.remove('is-active');
    }

    return (
        <div className="dropdown" onBlur={(e) => dismissHandler(e)}>
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={(e) => handleClick(e)}>
                    <span>{listName}</span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu" tabIndex={0}>
                <div className="dropdown-content">
                    {
                        dropDownList.map((list: any, i: number) => {
                            return <a className={`dropdown-item ${list == listName && 'is-active'}`} key={i} onClick={(e) => listClick(e, list)} >
                                {list}
                            </a>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DropDown;