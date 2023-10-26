import {useDispatch, useSelector} from 'react-redux'
import { setShowUpdateModal, setUpdateValue } from '../reducer/addCategorySlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';


function UpdateModal() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.addCategory);
  const showUpdateModal = state.showUpdateModal;
  const [newValue, setNewValue] = useState(state.updateValue);
  
  useEffect(() => {
    setNewValue(state.updateValue)
  }, [state.updateValue])

  const sendUpdate = (value) => {
   if (state.updateValue === value) {
     toast.error('No changes made');
     dispatch(setShowUpdateModal());
   } else {
     if (value.trim().length > 0) {
       dispatch(setUpdateValue(value))
       dispatch(setShowUpdateModal())
       toast.success('Category updated successfully')
     } else {
       toast.error("Update value shuldn't be empty")
     }
   }
  }

  return (
    <div className={`overlay ${showUpdateModal ? '' : 'hidden'}`}>
      <div className='todo-modal '>
        <div className='modal-header'>
          <p>Update category</p>
          <i
            className='fas fa-xmark'
            onClick={() => dispatch(setShowUpdateModal())}
          ></i>
        </div>
        <div className='modal-body'>
          <input
            type='text'
            className='form-control'
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button
            className='btn btn-secondary mx-1'
            onClick={() => dispatch(setShowUpdateModal())}
          >
            Cancel
          </button>
          <button className='btn btn-outline-primary' onClick={()=>sendUpdate(newValue)}>Update category</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateModal;