import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './styles/index.scss';
import {store} from "./state/store";
import {App} from "./app/App";



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

