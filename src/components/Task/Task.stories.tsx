import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

const meta: Meta<typeof Task> = {
    title: 'Components/UI/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {
            id: '12',
            title: 'JS',
            status: TaskStatuses.New,
            description:'',
            priority: TaskPriorities.Low,
            startDate:'',
            addedDate:'',
            deadline:'',
            todoListId:'12',
            order: 0},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    args: {
        task: {
            id: '12',
            title: 'CSS',
            status: TaskStatuses.Completed,
            description:'',
            priority: TaskPriorities.Low,
            startDate:'',
            addedDate:'',
            deadline:'',
            todoListId:'12',
            order: 0
        },
    },
};
