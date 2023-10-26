import { useSelector } from "react-redux"
import {useDispatch}from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { addTemporaryId, done, setTaskCheck, setTaskDescr, setTaskUpdate, setTemporaryContainer } from "../reducer/addCategorySlice";
import { Link } from 'react-router-dom';
import { useEffect } from "react";



function Section() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.addCategory);
  const term = state.term;
  const showDone = state.showDone;

  const setTasks = () => {
    let arr = [];
    state.categories.map(item => {
      if (item.id === state.temporaryId) {
        arr = item.tasks;
      } else {
        item.nestedCategory.map(nestCategory => {
          if (nestCategory.id === state.temporaryId) {
            arr = nestCategory.nestedtasks;
          }
        })
      }
    })
    return arr;
  }

  const doneTasks = (arr) => {
    return arr.filter(item => item.done === true);
  }

  const searchHandler = (arr, term)=>{
    if (term.length === 0) {
      return arr;
    }
    return arr.filter(item => item.title.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  const sendTask = (id,element,description) => {
    dispatch(setTaskUpdate(element.parentElement.previousElementSibling.textContent));
    dispatch(setTaskCheck(element.parentElement.previousElementSibling.children[0].checked))
    dispatch(setTaskDescr(description));
    dispatch(setTemporaryContainer(id));
  }

  
  const tasks = showDone?doneTasks(searchHandler(setTasks(), term)):searchHandler(setTasks(), term);

  return (
    <section id='main_section'>
      <ul className='tasks'>
        {tasks.length ? (
          tasks.map((item) => (
            <li className='task-item' key={uuidv4()}>
              <p className='task-title'>
                <input
                  type='checkbox'
                  checked={item.done}
                  onChange={() => dispatch(done(item.id))}
                />
                {item.title}
              </p>
              <Link to={'/update'}>
                <i
                  className='fa-solid fa-pen-to-square'
                  onClick={(e) => sendTask(item.id,e.target,item.description)}
                ></i>
              </Link>
            </li>
          ))
        ) : (
          <h1 className='not-element'>There are not tasks</h1>
        )}
      </ul>
    </section>
  )
}

export default Section