import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import NestedCategory from '../nestedCategory/nestedCategory';
import {
  addTemporaryId,
  deleteCategory,
  expandableList,
  getOldValue,
  setShowUpdateModal,
  showModal
} from '../reducer/addCategorySlice';
import { Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Aside() {
  const state = useSelector(state => state.addCategory)
  const categories = state.categories;
  const dispatch = useDispatch();

  const setModal = (itemId) => {
    dispatch(addTemporaryId(itemId));
    dispatch(showModal());
  }

  const setId = (id) => {
    dispatch(addTemporaryId(id));
  }

  const deleteHandler = (categoryId) => {
    dispatch(deleteCategory(categoryId));
    toast.success('Category deleted successfully');
  }

  const editHandler = () => {
    dispatch(setShowUpdateModal());
    dispatch(getOldValue());
  }

  return (
    <section id='aside'>
      {categories.length > 0 ? (
        <ul className='categories'>
          {categories.map((category, index) => (
            <Fragment key={uuidv4()}>
              <li key={uuidv4()} className='category-item'>
                <div className='category text-primary'>
                  <p className='category__text'>
                    <i
                      className={`fa-solid fa-chevron-down${
                        category.nestedCategory.length > 0 ? '' : 'hideen'
                      }`}
                      onClick={() => dispatch(expandableList(category.id))}
                      style={{
                        rotate: `${category.showNestedCategory ? 0 : -90}deg`,
                      }}
                    ></i>
                    <span
                      className='category-title'
                      onClick={(e) => setId(category.id)}
                    >
                      {category.title}
                    </span>
                    #{index + 1}
                    <i
                      className='fa-solid fa-pen-to-square'
                      onClick={() => editHandler()}
                    ></i>
                  </p>
                  <div className='icons'>
                    <span
                      className='plus-mark'
                      onClick={() => setModal(category.id)}
                    >
                      +
                    </span>
                    {categories.length == 1 ? (
                      <Link to={'/'}>
                        <i
                          className='fa-regular fa-trash-can'
                          onClick={() => deleteHandler(category.id)}
                        ></i>
                      </Link>
                    ) : (
                      <i
                        className='fa-regular fa-trash-can'
                        onClick={() => deleteHandler(category.id)}
                      ></i>
                    )}
                  </div>
                </div>
              </li>
              {category.showNestedCategory ? (
                <NestedCategory
                  category={category}
                  index={index}
                  setId={setId}
                />
              ) : null}
            </Fragment>
          ))}
        </ul>
      ) : (
        <h1 className='not-element'>There are not categories</h1>
      )}
    </section>
  )
}

export default Aside
