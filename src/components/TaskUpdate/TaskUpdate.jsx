import { Link} from 'react-router-dom'
import Aside from '../aside/Aside'
import { useDispatch, useSelector } from 'react-redux'
import {decrementDoneTask, incrementDoneTask, saveChanges, setTaskUpdate, setUpdateValue } from '../reducer/addCategorySlice';
import { useEffect, useState } from 'react';
import { toast,Toaster } from 'react-hot-toast';
function TaskUpdate() {

  const dispatch = useDispatch();
  const state = useSelector(state => state.addCategory);

  const closeEdit = () => {
    dispatch(setTaskUpdate(''));
  }

  useEffect(() => {
    window.localStorage.setItem('initial', JSON.stringify(state))
  }, [state]);

  const [checked, setChecked] = useState(state.TaskCheck);
  const [descr, setDescr] = useState(state.taskDescr);
  const [title, setTitle] = useState(state.TaskUpdate);

  const sendData = () => {
    if (state.TaskCheck !== checked || state.taskDescr !== descr || state.TaskUpdate !== title) {
      if (title) {

        if (state.TaskCheck !== checked) {
          if (checked) {
            dispatch(incrementDoneTask());
          } else {
            dispatch(decrementDoneTask());
          }
        }

        dispatch(setTaskUpdate(title))
        dispatch(saveChanges({ done: checked, description: descr }));
        toast.success('changes saved successfully');
      } else {
        toast.error("Task shouldn't be empty");
      }
    }
  }


  return (
    <div className='task-container'>
      <h1 className='todoName text-primary'>To Do Items</h1>
      <Aside />
      <div className='task-description'>
        <div className='btns'>
          <Link to={`${title ? '/' : ''}`}>
            <button
              type='button'
              className='btn btn-light'
              onClick={(e) => sendData(e)}
            >
              Save changes
            </button>
          </Link>
          <Link to={'/'}>
            <button
              type='button'
              className='btn btn-light mx-2'
              onClick={() => closeEdit()}
            >
              Cancel
            </button>
          </Link>
        </div>
        <div className='clearfix'></div>
        <div className='description'>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='done mt-3'>
            <input
              type='checkbox'
              id='checkbox'
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor='checkbox'>Done</label>
          </div>
          <textarea
            name=''
            id=''
            cols='85'
            rows='20'
            className='texarea'
            placeholder='Description'
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
          ></textarea>
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            fontSize: '1rem',
          },
        }}
      />
    </div>
  )
}

export default TaskUpdate