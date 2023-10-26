import { useDispatch, useSelector } from "react-redux"
import { setShowDone, setTerm } from "../reducer/addCategorySlice";


function Header() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.addCategory);

  return (
    <header id='header'>
      <h3 className='logo text-secondary'>To-Do List</h3>
      <div className='search-panel'>
        <div className='show__done'>
          <input
            type='checkbox'
            id='checkbox'
            value={state.showDone}
            onChange={() => dispatch(setShowDone())}
          />
          <label htmlFor='checkbox'>Show done</label>
        </div>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Search...'
            value={state.term}
            onChange={(e) => dispatch(setTerm(e.target.value))}
          />
          <i className='fas fa-xmark' onClick={() => dispatch(setTerm(''))}></i>
        </div>
      </div>
    </header>
  )
}

export default Header