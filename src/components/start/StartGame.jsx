import {useRef} from 'react';

const StartGame = ({startGamePage}) => {
  
  const stopMultipleClick = useRef(false);
  const startGameIntervalRf = useRef(null);
  const pleaseWaitRf = useRef(null);
  const bgRf = useRef(null);
  const startGameValue = useRef(0);
  const showCountUp = useRef(0);
  const endValue = 100;
  const startGameSpeed = 100;
  const callAfterPause = 2000;

  // give please wait message during click again on button
  const pleaseWait = () => {
      clearInterval(startGameIntervalRf.current);
      clearTimeout(pleaseWaitRf.current);
      showCountUp.current.textContent = "Please Wait...";
      stopMultipleClick.current = false;
      pleaseWaitRf.current = setTimeout(() => {
        countToStartGame();
      }, callAfterPause);
  };

  // counting up start from 1 to 100 and then on 100 route to next game page
  const countToStartGame = () => {
    if(stopMultipleClick.current){
      pleaseWait();
      return;
    }
    stopMultipleClick.current = true;

    // count up interval
    startGameIntervalRf.current = setInterval(() => {
      startGameValue.current +=1;
      let newGameValue = startGameValue.current;
      let bgDegreeValue = newGameValue * 3.6;

      // show progress bar
      bgRf.current.style.background = `
      conic-gradient(green ${bgDegreeValue}deg, black ${bgDegreeValue}deg)`;

      // show count up number on button
      showCountUp.current.textContent = newGameValue;

      // the below changes the color of the progress
      if(newGameValue === 30){
        showCountUp.current.classList.add('text-shadow-[0_0_20px_#4ade80]','text-[aliceblue]');
        bgRf.current.classList.add('shadow-[0_0_20px_5px_#4ade80]');
      };
      if(newGameValue === 50){
        showCountUp.current.classList.remove('text-shadow-[0_0_20px_#4ade80]','text-[aliceblue]');
        bgRf.current.classList.remove('shadow-[0_0_20px_5px_#4ade80]');

        showCountUp.current.classList.add('text-shadow-[0_0_20px_#4ade80]','text-blue-400');
        bgRf.current.classList.add('shadow-[0_0_20px_5px_blue]');
      };
      if(newGameValue === 70){
        showCountUp.current.classList.remove('text-shadow-[0_0_20px_#4ade80]','text-blue-400');
        bgRf.current.classList.remove('shadow-[0_0_20px_5px_blue]');

        showCountUp.current.classList.add('text-shadow-[0_0_20px_#4ade80]','text-yellow-400');
        bgRf.current.classList.add('shadow-[0_0_20px_5px_orange]');
      };
      if(newGameValue === 90){
        showCountUp.current.classList.remove('text-shadow-[0_0_20px_#4ade80]','text-yellow-400');
        bgRf.current.classList.remove('shadow-[0_0_20px_5px_orange]');

        showCountUp.current.classList.add('text-shadow-[0_0_20px_#4ade80]','text-red-400');
        bgRf.current.classList.add('shadow-[0_0_20px_5px_red]');
      };

      // end the game and route to next page
      if(newGameValue === endValue){
        clearInterval(startGameIntervalRf.current);
        stopMultipleClick.current = false;
        startGameValue.current = 0;
        bgDegreeValue = newGameValue * 0;
        bgRf.current.style.background = `
        conic-gradient(green ${bgDegreeValue}deg, black ${bgDegreeValue}deg)`;
        showCountUp.current.textContent = "Start Game";
        showCountUp.current.classList.remove('text-shadow-[0_0_20px_#4ade80]','text-red-400');
        bgRf.current.classList.remove('shadow-[0_0_20px_5px_red]');
        startGamePage();
        return;
      };
    },startGameSpeed);
    
    return () => clearInterval(startGameIntervalRf.current);
  }
  return (
    <section className="w-full h-screen overflow-hidden 
    flex flex-col justify-center items-center bg-black/95
    ">
      <article className=" relative
      w-[50%] h-[80%] custom_h_w_background 
      flex justify-center items-center bg-blue-100
       rounded-2xl transition-all duration-300 ease-in-out 
       focus:bg-blue-50
        hover:bg-blue-50 
        fucus:shadow-[0_0_20px_5px_aliceblue] 
       hover:shadow-[0_0_20px_5px_aliceblue]
      ">
        <div 
        ref={bgRf}
        className={`absolute
        custom_h_w_below_btn text-white font-bold tracking-widest uppercase
        rounded-full
         bg-[conic-gradient(green_3deg, black_3deg,_black_1deg)]
        `}>

        </div>
        <button 
        className="absolute
        custom_h_w_btn text-white bg-black font-bold tracking-widest uppercase
        rounded-full cursor-pointer custom_startBtn_fs
        "
        onClick={() =>{ 
          countToStartGame();
        }}
        >
          <span ref={showCountUp}>Start Game</span>
        </button>
      </article>
    </section>
  )}

export default StartGame