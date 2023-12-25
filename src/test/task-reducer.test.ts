import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from '../state/task-reducer'
import {TasksStateType} from '../app/App'
import {addTodolistAC, removeTodolistAC} from "../state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '2',
                order: 0
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '3',
                order: 0
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '2',
                order: 0
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '3',
                order: 0
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '2',
                order: 0
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '3',
                order: 0
            }
        ],
        'todolistId2': [
            {
                id: '1', title:
                    'bread',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '2',
                order: 0
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                addedDate: '',
                deadline: '',
                todoListId: '2',
                order: 0
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const task = {
        id: '1',
        title: 'juce',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        addedDate: '',
        deadline: '',
        todoListId: '1',
        order: 0
    };
    const endState = tasksReducer(startState, addTaskAC(task))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', TaskStatuses.New))

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC('todolistId2', '2', 'Sugar'))

    expect(endState['todolistId2'][1].title).toBe('Sugar')
    expect(endState['todolistId1'][1].title).toBe('JS')
})
test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})





