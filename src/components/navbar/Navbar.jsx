import { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { addCategory, addTasks, addTemporaryId, done } from '../reducer/addCategorySlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';


function Navbar() {
  const [category, setCategory] = useState('');
  const Categoryid = uuidv4();
  const state = useSelector(state => state.addCategory)
  const[task,setTask] = useState('')
  const dispatch = useDispatch();

  const sendCategory = () => {
    if (category.trim()) {
      dispatch(addCategory({ title: category, id: Categoryid }))
      dispatch(addTemporaryId(Categoryid));
      setCategory('')
      toast.success('Category added succesfully')
    } else {
      toast.error("Category shouldn't be empty")
      setCategory('');
    }
  }

  const sendTask = () => {
    if (state.temporaryId) {
      if (task.trim()) {
        dispatch(addTasks(task))
        toast.success('Task added successfully')
        setTask('')
      } else {
        toast.error("Task shouldn't  be empty")
        setTask('')
      }
    } else {
      toast.error('Please select the category you want to add a task to')
    }
  }

  const doneTasks = state.doneElments;
  const tasksLength = state.taskLength;
  
  const setProgressValue = () => {
    if (tasksLength) {
      return Math.floor((doneTasks * 100) / tasksLength);
    } else {
      return 0;
    }
  }

  const progressValue = setProgressValue();

  return (
    <nav id='navbar'>
      <div className='progress__bar'>
        <div className='progress__bar-value' style={{
          transition: 'all .5s ease-out',
          width:`${progressValue}%`
        }}></div>
      </div>
      <div className='navbar-item'>
        <div className='add-category add'>
          <input
            type='text'
            placeholder='Enter category title'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className='btn btn-light' onClick={sendCategory}>
            Add
          </button>
        </div>
        <div className='add-task add'>
          <input
            type='text'
            placeholder='Enter task title'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className='btn btn-light' onClick={sendTask}>
            Add
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
