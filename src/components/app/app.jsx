// Styles
import './app.scss'
// Components
import Header from '../header/Header'
import Aside from '../aside/Aside'
import Section from '../section/Section'
import Navbar from '../navbar/Navbar'
import Overlay from '../modal/Modal';
import UpdateModal from '../updateModal/updateModal';

//HOOKS
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';


function App() {

  const state = useSelector((state) => state.addCategory)

  useEffect(() => {
    window.localStorage.setItem('initial', JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Overlay />
      <UpdateModal />
      <div className='container'>
        <div className='content'>
          <Header />
          <Navbar />
          <Aside />
          <Section />
          <Toaster
            position='bottom-right'
            toastOptions={{
              style: {
                fontSize: '1rem',
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default App
