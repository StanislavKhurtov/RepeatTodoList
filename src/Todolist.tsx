import React from "react";


type TodolistType = {
    title: string
}


export const Todolist = (props:TodolistType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <ul>
                    <li><input type="checkbox" checked={true}/><span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/><span>JavaScript</span></li>
                    <li><input type="checkbox" checked={false}/><span>React</span></li>
                </ul>
            </div>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Comleted</button>
            </div>
        </div>
    );
}