import End from './End';
import Reset from './Reset';
import { DataContext } from './context/DataContext';
import { useContext } from 'react';

const Header = ({endGame}) => {

  const {
    startValue, currentPlayer, currentText, 
    playerName, createPlayerName, resetFunc, 
    dispatch, ACTION
  } = useContext(DataContext);
  
  return (
      <section className="w-full h-[10%] rounded-tr-2xl rounded-tl-2xl
      flex flex-col absolute top-0
      ">
        <article className="w-full h-[80%]">
          <form className="w-full h-full" onSubmit={(e) => e.preventDefault()}>
            <input
            className="w-[90%] h-full bg-slate-300 border-none outline-none font-bold text-lg
              tracking-widest capitalize text-black text-shadow-[0_0_20px_#4ade80] custom_h_p
              placeholder:text-shadow-[0_0_20px_#4ade80] placeholder:text-[#333]
              placeholder:text-center placeholder:tracking-widest
               rounded-tl-2xl
            "
            type="text" 
            placeholder="Enter Player Name"
            value={playerName}
            onChange={(e) => {
              dispatch({
                type: ACTION.SET_PLAYER_NAME, 
                payload: e.target.value})
            }
            }
            />
            <button 
            onClick={() => createPlayerName()}
            className='w-[10%] h-full rounded-tr-2xl bg-green-600 font-bold
            tracking-widest custom_header_btn
            '>
              Enter
            </button>
          </form>
        </article>
        <article className="flex items-center justify-between w-full h-[80%] custom_h_p bg-blue-500">
          <div className="flex items-center custom_h_p custom_h_text custom_h_p2 text-center tracking-widest
          text-white text-shadow-[0_0_20px_#4ade80] font-bold uppercase">
            Turn:<span>{currentText}--{currentPlayer}</span><span className='font-medium'>[{startValue}]</span>
          </div>
          <Reset resetFunc={resetFunc} />
          <End endGame={endGame} />
        </article>
      </section>
        
  )
}

export default Header