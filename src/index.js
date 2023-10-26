import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import store from './components/store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskUpdate from './components/TaskUpdate/TaskUpdate'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/update' element={<TaskUpdate />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)
