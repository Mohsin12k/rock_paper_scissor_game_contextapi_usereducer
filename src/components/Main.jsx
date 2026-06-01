import {useState} from 'react';
import { DataContext } from './context/DataContext';
import { useContext } from 'react';

const Main = () => {

  const {
  startGame, allowClickRock, allowClickPaper, allowClickScissor,
  clickRock, clickPaper, clickScissor, notAllowed, showRock, showPaper, 
  showScissor,storePlayerName, rockSelected, paperSelected, scissorSelected, 
  finalResult, showFinalResult, alreadySelected, setShowResult, 
  dispatch, ACTION
  } = useContext(DataContext);
  
  const [hoverRock, setHoverRock] = useState(false);
  const [hoverPaper, setHoverPaper] = useState(false);
  const [hoverScissors, setHoverScissors] = useState(false);
  
  return (
    <main className='w-full h-screen rounded-2xl text-center text-white 
    grid grid-cols-1 place-items-center bg-slate-500
    '>
      { !showFinalResult &&
        <>
          <section className=" grid grid-cols-3 place-items-center w-full h-[60%]
          max-[769px]:grid-cols-1 max-[769px]:w-full max-[769px]:h-[75%] 
          ">
            {/* rock */}
            <article className="w-[50%] h-full relative flex flex-col items-center justify-center
            max-[769px]:flex-row max-[769px]:w-full max-[769px]:justify-between max-[769px]:pl-25
            customCenter
            ">
              <h2 className="absolute top-0 w-full max-[769px]:inline-block max-[769px]:mt-10
              max-[769px]:ml-25
              "><span className={`border-b-2 w-[50%] max-[769px]:border-none
              absolute left-1/2 -translate-x-1/2 custom_img_h2 transition-all duration-300 ease-in-out
              ${hoverRock ? "text-cyan-300":""}
              ${hoverRock ? "text-shadow-[0_0_20px_#4ade80]":""}
              ${rockSelected ? "text-red-500":""}
              `}>Rock</span></h2>

              <span 
              onMouseEnter={() => setHoverRock(true)}
              onMouseLeave={() => setHoverRock(false)}
                onClick={() => {
                  if(storePlayerName === ''){
                    setShowResult('Please Enter Player Name!🙏🙏🙏🙏');
                    dispatch({type:ACTION.RESULT_WINNER, payload: false});
                    return;
                  }
                  else if(storePlayerName !== ''){
                    if(!allowClickRock){
                      notAllowed();
                      return;
                    } else if(!clickRock){
                        alreadySelected();
                        return;
                    }
                    setHoverRock(prev => !prev);
                    showRock();
                    startGame();
                    return;
                }}}
              className={`custom_img_fs bg-cyan-400 rounded-full border-none outline-none
              transition-all duration-300 ease-in-out cursor-pointer custom_img_rock_p
              focus:bg-cyan-300 hover:bg-cyan-300 ml-3
              ${rockSelected ? " bg-red-500":""}
              `}>
                👊
              </span>
            </article>

            {/* paper */}
            <article className="w-[50%] h-full relative flex flex-col items-center justify-center
            max-[769px]:flex-row max-[769px]:w-full max-[769px]:justify-between max-[769px]:pl-25
            customCenter
            ">
              <h2 className="absolute top-0 w-full  max-[769px]:inline-block max-[769px]:mt-10
              max-[769px]:ml-25
              "><span className={`border-b-2 w-[50%] max-[769px]:border-none
              absolute left-1/2 -translate-x-1/2 custom_img_h2 transition-all duration-300 ease-in-out
              ${hoverPaper ? "text-cyan-300":""}
              ${hoverPaper ? "text-shadow-[0_0_20px_#4ade80]":""}
              ${paperSelected ? "text-red-500":""}
              `}>Paper</span></h2>

              <span 
              onMouseEnter={() => setHoverPaper(true)}
              onMouseLeave={() => setHoverPaper(false)}
              onClick={() => {
                  if(storePlayerName === ''){
                      setShowResult('Please Enter Player Name!🙏🙏🙏🙏');
                      dispatch({type:ACTION.RESULT_WINNER, payload: false});
                    return;
                  } 
                  else if(storePlayerName !== ''){
                    if(!allowClickPaper){
                      notAllowed();
                      return;
                    } else if(!clickPaper){
                      alreadySelected();
                      return;
                    }

                    setHoverPaper(prev => !prev);
                    startGame();
                    showPaper();
                    return;
                  }}}
              className={`custom_img_fs bg-cyan-400 rounded-full custom_img_rock_p border-none outline-none
              transition-all duration-300 ease-in-out cursor-pointer custom_img_paper_p 
              focus:bg-cyan-300 hover:bg-cyan-300 ml-3
              ${paperSelected ? "bg-red-500":""}
              `}>
                ✋
              </span>
            </article>

            {/* scissors */}
            <article className="w-[50%] h-full relative flex flex-col items-center justify-center mr-3
            max-[769px]:flex-row max-[769px]:w-full max-[769px]:justify-between max-[769px]:pl-25
            customCenter
            ">
              <h2 className="absolute top-0 w-full max-[769px]:inline-block max-[769px]:mt-10
              max-[769px]:ml-25
              "><span className={`border-b-2 w-[50%] max-[769px]:border-none
              absolute left-1/2 -translate-x-1/2 custom_img_h2 transition-all duration-300 ease-in-out
              ${hoverScissors ? "text-cyan-300":""}
              ${hoverScissors ? "text-shadow-[0_0_20px_#4ade80]":""}
              ${scissorSelected ? "text-red-500":""}
              `}>Scissor</span></h2>

              <span 
              onMouseEnter={() => setHoverScissors(true)}
              onMouseLeave={() => setHoverScissors(false)}
              onClick={() => {
                if(storePlayerName === ''){
                setShowResult("Please Enter Player Name!🙏🙏🙏🙏");
                dispatch({type:ACTION.RESULT_WINNER, payload: false});
                return;
                  } 
                else if (storePlayerName !== ''){
                  if(!allowClickScissor){
                    notAllowed();
                    return;
                  } else if(!clickScissor){
                    alreadySelected();
                    return;
                  }

                  setHoverScissors(prev => !prev);
                  startGame();
                  showScissor();
                  return;
              }}}
              className={`custom_img_fs bg-cyan-400 rounded-full border-none outline-none
              transition-all duration-300 ease-in-out cursor-pointer custom_img_scissor_p
              focus:bg-cyan-300 hover:bg-cyan-300 ml-3
              ${scissorSelected ? "bg-red-500":""}
              `}>
                ✌️
              </span>
            </article>
          </section>
      </>
      }

      {/* Announcement for the final winner */}
      { showFinalResult &&
        <>
          <section className='w-full h-full flex flex-col items-center justify-center'>
            <h3 className="font-semibold tracking-widest uppercase custom_h_text
            text-shadow-[0_0_10px_#4ade80] custom_anime_footer
            ">
              {finalResult}
            </h3>
          </section>
        </>
      }
    </main>
  )
}

export default Main