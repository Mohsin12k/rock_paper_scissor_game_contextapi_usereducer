import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import StartGame from './components/start/StartGame';
import { useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { DataContext } from './components/context/DataContext';
import { useContext } from 'react';

function App() {

const {resetFunc} = useContext(DataContext);
const navigate = useNavigate();

  // useEffect for start game jsx file in the start file........................
  useEffect(() => {
    navigate('/startGame');
    resetFunc();
},[]);

  // function going back to the start game page........................
const startGamePage = () => {
  navigate('/');
  // reset the game does not need but for safety it is called
  resetFunc();
};

// function End Game........................
const endGame = () => {
  navigate('/startGame');
  resetFunc();
};

  return (
  
      <Routes>
      <Route path='/' element={<section className='w-full min-h-screen bg-slate-900 flex items-center
        justify-center
        '>
          <article className='text-white w-[80%] h-[90%] max-[1000px]:w-full max-[1000px]:min-h-screen
          custom_App_w_h custom_App_w_h_1024 relative
          bg-slate-50 rounded-2xl 
          grid grid-cols-1 overflow-hidden
          '>
            <Header endGame={endGame} />
            <Main />
            <Footer />
          </article>
        </section>
      }/>
        <Route path='/startGame' element={<StartGame startGamePage={startGamePage} />} />
      </Routes>
    
  )
}

export default App
