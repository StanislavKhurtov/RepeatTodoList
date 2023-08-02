//***********************************************************//

Lesson#1 

Установка приложения
yarn create react-app my-app --template typescript

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


 let tasks1 = [
 {id: 1, title: 'HTML&CSS', isDone: true},
 {id: 1, title: 'JavaScript', isDone: true},
 {id: 1, title: 'React', isDone: false},
 {id: 1, title: 'TypeScript', isDone: false},
 {id: 1, title: 'Angular', isDone: false},
  ]

let tasks2 = [
{id: 1, title: 'Terminator', isDone: true},
{id: 1, title: 'XXX', isDone: false},
{id: 1, title: 'John Weak', isDone: false},
 ]


Вопросы(компонента,props, debbuger )

//***********************************************************//

Lesson#2

 - "map"
 - удаление задач
 - функция для удаления задачи
 - фильтрация массива с task'ами
 - Local State (useState)
 - фильтрация задач (all | active | completed)



//***********************************************************//

Lesson#3

 - uuid :  yarn add uuid @types/uuid
 - про key
 - addTask
 - чтение значения из input
 - очистка поля input (onChange)
 - добавление task при нажатии на enter (onKeyPress)
 - рефакторинг кода
 - рефакторинг функции удаления

//***********************************************************//


Lesson#4

 - начало. активный чекбокс
 - trim()
 - title is required
 - подсветка кнопок

//***********************************************************//

Lesson#5

- массив Todolists
- фильтрация тасок для каждого todolist
- где хранить таски
- debugger
- удаление todolists
- удаление todolist tasks из стейта


//***********************************************************//

Lesson#6

 – пере использование input
 – обертка addTask
 – добавляем новый todolist
 – типизация tasksObj
 – редактирование span
 – EditableSpan
 – редактирование todolist name
 – debugger (как работает editable span)
 – резюме (рисовалка)

//***********************************************************//

Lesson#7

 - кнопки
 - инпут
 - чекбокс
 - AppBar
 - Container, grid



//***********************************************************//

Lesson#8

– как работает reducer –
– начало. игрушечные тесты
– тесты для reducer
– иммутабельность для редьюсера
– TDD (test-driven development)
– reducers for todolists
– тесты для todolist reducers
– типизация actions
– action creators
– debugger

//***********************************************************//

Lesson#9
- tasks reducer
– тесты
– white board

//***********************************************************//


Lesson#10 - Todolist for student (useReducer, redux)

1:31 - Reducers - React
28:35 - Redux
33:56 - createStore
37:12 - combineReducers
39:48 - AppRootStateType
43:46 - Provider from react-redux
45:55 - return state default
50:03 - initialState
55:49 - useDispatch react-redux
57:05 - useSelector react-redux
1:15:03 - задание for Advanced Level


//***********************************************************//

Lesson#11


//***********************************************************//

Lesson#12


//***********************************************************//
