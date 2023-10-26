import { useDispatch, useSelector } from 'react-redux';
import './modal.scss';
import {useState} from 'react'
import { addNestedCategory, addTemporaryId, showModal } from '../reducer/addCategorySlice';
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast';

function Overlay() {

  const modal = useSelector(state => state.addCategory.Modal)
  const categoryId = useSelector((state) => state.addCategory.temporaryId);
  const dispatch = useDispatch()
  const [nestValue, setNestValue] = useState('');


  const setNestedCategory = () => {
    const id = uuidv4();
    if (nestValue.length > 0) {
      dispatch(addNestedCategory({ categoryId, title: nestValue, id }))
      toast.success('Nested category added successfully');
      setNestValue('');
      dispatch(addTemporaryId(id));
      dispatch(showModal());
    } else {
      toast.error("Nested category shouldn't be empty");
    }
  }

  return (
    <div className={`overlay ${modal ? null : 'hidden'}`}>
      <div className='todo-modal '>
        <div className='modal-header'>
          <p>Add new nested category</p>
          <i className='fas fa-xmark' onClick={() => dispatch(showModal())}></i>
        </div>
        <div className='modal-body'>
          <input
            type='text'
            className='form-control'
            placeholder='Type nested category'
            onChange={(e) => setNestValue(e.target.value)}
            value={nestValue}
          />
          <button
            className='btn btn-outline-primary'
            onClick={() => setNestedCategory()}
          >
            Add nested category
          </button>
        </div>
      </div>
    </div>
  )
}

export default Overlay