import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'

const getInitialValue = () => {
  if (window.localStorage.getItem('initial')) {
    return JSON.parse(window.localStorage.getItem('initial'));
  }

  return {
    categories: [],
    term: '',
    Modal: false,
    temporaryId: null,
    taskLength: 0,
    doneElments: 0,
    showUpdateModal: false,
    updateValue: '',
    showDone: false,
    TaskUpdate: '',
    TaskCheck: '',
    taskDescr:'',
    updatePage: false,
    temporaryContainer:'',
  }
}

const initialValue = getInitialValue();

const AddCategory = createSlice({
  name: 'ADD_CATEGORY',
  initialState: initialValue,
  reducers: {
    addTemporaryId: (state, action) => {
      state.temporaryId = action.payload
    },
    addCategory: (state, action) => {
      state.categories.unshift({
        id: action.payload.id,
        title: action.payload.title,
        tasks: [],
        tasksLength: 0,
        nestedCategory: [],
        showNestedCategory: true,
      })
    },
    deleteCategory: (state, action) => {
      state.categories.map((item) => {
        if (item.id === action.payload) {
          item.tasks.map((task) => {
            if (task.done) {
              state.doneElments -= 1
            }
          })
          state.taskLength -= item.tasksLength

          item.nestedCategory.map((nest) => {
            nest.nestedtasks.map((nestTask) => {
              if (nestTask.done) {
                state.doneElments -= 1
              }
              state.taskLength -= 1;
            })
          })
        }
      })
      state.categories = state.categories.filter(
        (item) => item.id !== action.payload
      )
      state.temporaryId = null
      state.TaskUpdate = ''
    },
    addNestedCategory: (state, action) =>
      void state.categories.map((item) => {
        if (item.id === action.payload.categoryId) {
          item.nestedCategory.push({
            id: action.payload.id,
            title: action.payload.title,
            nesttaskLengt: 0,
            nestedtasks: [],
          })
        }
      }),
    deleteNestedCategory: (state, action) =>
      void state.categories.map((item) => {
        if (item.id === state.temporaryId) {
          item.nestedCategory.map((item) => {
            state.taskLength -= 1
            item.nestedtasks.map((nest) => {
              if (nest.done) {
                state.doneElments -= 1
              }
            })
          })
          item.nestedCategory = item.nestedCategory.filter(
            (c) => c.id !== action.payload
          )
        }
      }),
    showModal: (state) => void (state.Modal = !state.Modal),
    expandableList: (state, action) =>
      void state.categories.map((item) => {
        if (item.id === action.payload) {
          item.showNestedCategory = !item.showNestedCategory
        }
      }),
    addTasks: (state, action) =>
      void state.categories.map((item) => {
        if (item.id === state.temporaryId) {
          item.tasks.unshift({
            id: uuidv4(),
            title: action.payload,
            done: false,
            description: '',
          })
          state.taskLength += 1
          item.tasksLength += 1
        } else {
          item.nestedCategory.map((nestCategory) => {
            if (nestCategory.id === state.temporaryId) {
              nestCategory.nestedtasks.unshift({
                id: uuidv4(),
                title: action.payload,
                done: false,
                description: '',
              })
              state.taskLength += 1
              nestCategory.nesttaskLengt += 1
            }
          })
        }
      }),
    done: (state, action) => {
      state.categories.map((item) => {
        if (item.id === state.temporaryId) {
          item.tasks.map((el) => {
            if (el.id === action.payload) {
              el.done = !el.done
              if (el.done === true) {
                state.doneElments += 1
              } else if (state.doneElments > 0) {
                state.doneElments -= 1
              }
            }
          })
        } else {
          item.nestedCategory.map((c) => {
            if (c.id === state.temporaryId) {
              c.nestedtasks.map((nestedTask) => {
                if (nestedTask.id === action.payload) {
                  nestedTask.done = !nestedTask.done
                  if (nestedTask.done === true) {
                    state.doneElments += 1
                  } else if (state.doneElments > 0) {
                    state.doneElments -= 1
                  }
                }
              })
            }
          })
        }
      })
    },
    setTerm: (state, action) => void (state.term = action.payload),
    setShowUpdateModal: (state) =>
      void (state.showUpdateModal = !state.showUpdateModal),
    getOldValue: (state) =>
      void state.categories.map((category) => {
        if (category.id === state.temporaryId) {
          state.updateValue = category.title
        } else {
          category.nestedCategory.map((nestItem) => {
            if (nestItem.id === state.temporaryId) {
              state.updateValue = nestItem.title
            }
          })
        }
      }),
    setUpdateValue: (state, action) =>
      void state.categories.map((category) => {
        if (category.id === state.temporaryId) {
          category.title = action.payload
        } else {
          category.nestedCategory.map((nestItem) => {
            if (nestItem.id === state.temporaryId) {
              nestItem.title = action.payload
            }
          })
        }
      }),
    setShowDone: (state) => void (state.showDone = !state.showDone),
    setTaskUpdate: (state, action) => void (state.TaskUpdate = action.payload),
    setTaskCheck: (state, action) => void (state.TaskCheck = action.payload),
    setTaskDescr: (state, action) => void (state.taskDescr = action.payload),
    setTemporaryContainer: (state, action) =>
      void (state.temporaryContainer = action.payload),
    saveChanges: (state, action) => {
      state.categories.map((item) => {
        if (item.id === state.temporaryId) {
          item.tasks.map((el) => {
            if (el.id === state.temporaryContainer) {
              el.done = action.payload.done
              el.title = state.TaskUpdate
              el.description = action.payload.description
            }
          })
        } else {
          item.nestedCategory.map((c) => {
            if (c.id === state.temporaryId) {
              c.nestedtasks.map((nestedTask) => {
                if (nestedTask.id === state.temporaryContainer) {
                  nestedTask.done = action.payload.done
                  nestedTask.title = state.TaskUpdate
                  nestedTask.description = action.payload.description
                }
              })
            }
          })
        }
      })
    },
    incrementDoneTask: (state) => void(state.doneElments += 1),
    decrementDoneTask: (state) => void(state.doneElments -= 1),
  },
})

export const {
  addCategory,
  deleteCategory,
  addNestedCategory,
  deleteNestedCategory,
  addTemporaryId,
  showModal,
  expandableList,
  addTasks,
  setTasks,
  done,
  setTerm,
  setShowUpdateModal,
  getOldValue,
  setUpdateValue,
  setShowDone,
  setTaskUpdate,
  setTemporaryContainer,
  setTaskCheck,
  setTaskDescr,
  saveChanges,
  incrementDoneTask,
  decrementDoneTask
} = AddCategory.actions
export default AddCategory.reducer;