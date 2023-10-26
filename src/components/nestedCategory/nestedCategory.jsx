import { v4 as uuidv4 } from 'uuid'
import {useDispatch, useSelector} from 'react-redux'
import { addTemporaryId, deleteNestedCategory, getOldValue, setShowUpdateModal } from '../reducer/addCategorySlice';
import { toast } from 'react-hot-toast';


function NestedCategory({ category, index,setId}) {

  const removeCategory = (itemId, categoryId) => {
    dispatch(addTemporaryId(categoryId));
    dispatch(deleteNestedCategory(itemId));
    toast.success('Nested category deleted successfully');
  }

  const editHandler = (id) => {
    dispatch(addTemporaryId(id))
    dispatch(setShowUpdateModal())
    dispatch(getOldValue())
  }

  const dispatch = useDispatch();
  const length = category.nestedCategory.length;
  return (
    <ul className={`nested-category ${length > 0 ? '' : 'hidden'}`}>
      {category.nestedCategory.map((item, indx) => (
        <li key={uuidv4()} className={`nested__category-item`}>
          <div className='category text-primary'>
            <p className='category__text'>
              <span
                className='nested__category-title'
                onClick={(e) => setId(item.id)}
              >
                {item.title}
              </span>
              #{index + 1} {indx + 1}
              <i
                className='fa-solid fa-pen-to-square'
                onClick={() => editHandler(item.id)}
              ></i>
            </p>
            <div className='icons'>
              <i
                className='fa-regular fa-trash-can'
                onClick={() => removeCategory(item.id, category.id)}
              ></i>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
  

export default NestedCategory