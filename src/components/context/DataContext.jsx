import gameReducer from '../stateReducer/stateReducer';
import initialState from '../stateReducer/InitialStates';
import ACTION from '../stateReducer/Actions';
import { createContext, useReducer, useState, useEffect, useRef } from "react";

export const DataContext = createContext({});

export const DataProvider = ({children}) => {

      // useReduer
      const [state, dispatch] = useReducer(gameReducer, initialState);
    
      // useStates
      const [gameStarted, setGameStarted] = useState(false);
      const [showFinalResult, setShowFinalResult] = useState(false);
      const [startValue, setStartValue] = useState(5);
      const [finalResult, setFinalResult] = useState('');
      const [showResult, setShowResult] = useState('');
      const speed1 = 1000;
      const speed4 = 4000;
      const setIntervalRf = useRef(null);

  // not allowed to click........................
  const notAllowed = () => {
    setShowResult('Not Allowed!😭 Please Wait...')
    dispatch({type:ACTION.RESULT_WINNER, payload: false});
  };

  // Prevent from multiple click........................
  const alreadySelected = () => {
    setShowResult(`${state.storePlayerName} Please Wait! You have Already Selected!🙏🙏🙏🙏`);
    dispatch({type:ACTION.RESULT_WINNER, payload: false});
  };

  // setting player selection...........................
  const showRock = () => {
    dispatch({type:ACTION.ROCK_SELECTED, payload: true});
    dispatch({type:ACTION.CURRENT_PLAYER, payload: '👊'});
    dispatch({type:ACTION.CURRENT_TEXT, payload: 'Rock'});

    dispatch({type:ACTION.CLICK_ROCK, payload: false});
    dispatch({type:ACTION.CLICK_PAPER, payload: true});
    dispatch({type:ACTION.CLICK_SCISSOR, payload: true});

    dispatch({type:ACTION.ALLOW_CLICK_ROCK, payload: true});
    dispatch({type:ACTION.ALLOW_CLICK_PAPER, payload: false});
    dispatch({type:ACTION.ALLOW_CLICK_SCISSOR, payload: false});
  };
  const showPaper = () => {
    dispatch({type:ACTION.PAPER_SELECTED, payload: true});
    dispatch({type:ACTION.CURRENT_PLAYER, payload: '✋'});
    dispatch({type:ACTION.CURRENT_TEXT, payload: 'Paper'});

    dispatch({type:ACTION.CLICK_PAPER, payload: false});
    dispatch({type:ACTION.CLICK_ROCK, payload: true});
    dispatch({type:ACTION.CLICK_SCISSOR, payload: true});

    dispatch({type:ACTION.ALLOW_CLICK_PAPER, payload: true});
    dispatch({type:ACTION.ALLOW_CLICK_ROCK, payload: false});
    dispatch({type:ACTION.ALLOW_CLICK_SCISSOR, payload: false});
  };
  const showScissor = () => {
    dispatch({type:ACTION.SCISSOR_SELECTED, payload: true});
    dispatch({type:ACTION.CURRENT_PLAYER, payload: '✌'});
    dispatch({type:ACTION.CURRENT_TEXT, payload: 'Scissor'});

    dispatch({type:ACTION.CLICK_SCISSOR, payload: false});
    dispatch({type:ACTION.CLICK_PAPER, payload: true});
    dispatch({type:ACTION.CLICK_ROCK, payload: true});

    dispatch({type:ACTION.ALLOW_CLICK_SCISSOR, payload: true});
    dispatch({type:ACTION.ALLOW_CLICK_PAPER, payload: false});
    dispatch({type:ACTION.ALLOW_CLICK_ROCK, payload: false});
  };

  // predect the winner
  const predectWinner = () => {
    // computer selection
    const computerChoice = ['👊', '✋', '✌'];
    const computerRandomValue = Math.floor(Math.random()*computerChoice.length);
    let  computerSelection= computerChoice[computerRandomValue];

    if(state.currentPlayer === computerSelection){
      setShowResult("It's a Draw! Try Again! 😒😒😒");
      dispatch({type:ACTION.RESULT_WINNER, payload: false});
    }
    else if(state.currentPlayer === "👊" && computerSelection === "✌" || state.currentPlayer === "✋"
      && computerSelection === "👊" || state.currentPlayer === "✌" && computerSelection === "✋"
    ) {

      // player winnes
      if(state.playerScore === 0)
        {
        setShowResult(`${state.storePlayerName} wins! 🎉🎇`);
        dispatch({type:ACTION.RESULT_WINNER, payload: false});
        };

        if(state.playerScore === 1){
          setShowResult(`Last Round for ${state.storePlayerName} to win!`);
          dispatch({type:ACTION.RESULT_WINNER, payload: false});
        };

        if(state.playerScore === 2){
          setShowFinalResult(true);
          dispatch({type:ACTION.RESULT_WINNER, payload: false});
          setFinalResult(`Final winner is ${state.storePlayerName} 🎉🎇`);
          setShowResult(`${state.storePlayerName} wins! 🎉🎇 with score ${state.playerScore}`);
          setTimeout(() => {
            resetFunc();
          }, speed4);
        };
         
      dispatch({type: ACTION.PLAYERSCORE});

    }
     else {

      // computer winnes
      if(state.computerScore === 0)
        {
          setShowResult(`Computer wins! 🎉🎇`);
          dispatch({type:ACTION.RESULT_WINNER, payload: false});
        };
        if(state.computerScore === 1){
          setShowResult(`Last Round for Computer win!`);
          dispatch({type:ACTION.RESULT_WINNER, payload: false});
        };
          if(state.computerScore === 2){
            setShowFinalResult(true);
            dispatch({type:ACTION.RESULT_WINNER, payload: false});
            setFinalResult(`Final winner is Computer 🎉🎇`);
            setShowResult(`Computer wins! 🎉🎇 with score ${state.computerScore}`);
            setTimeout(() => {
              resetFunc();
            }, speed4);
          };

      dispatch({type:ACTION.COMPUTERSCORE})
    }
  }

  // start the game containing time Interval
const startGame = () => {

  // time interval
  setStartValue(5);
  clearInterval(setIntervalRf.current);
  setIntervalRf.current = setInterval(() => {
    setStartValue(prev => {
      if(prev <= 0){
        clearInterval(setIntervalRf.current);
        return 0;
      }     
      return prev - 1
    });
  }, speed1);
  return () => clearInterval(setIntervalRf.current);
};

// UseEffect for the startValue.................
useEffect(() => {
  if(startValue === 0) {
    setStartValue(5);
    clearInterval(setIntervalRf.current);
    predectWinner();

    setTimeout(() => {
      tryAgain();
    }, speed4);

   setTimeout(() => {
     if(finalResult !== ''){
      resetFunc();
    };
   }, speed4);
  };
},[startValue, finalResult]);

// useEffect for the footer result resetting.........
useEffect(() => {
  if(!state.resultWinner){
    setTimeout(() => {
      setShowResult('');
      dispatch({type:ACTION.RESULT_WINNER, payload: true});
    }, speed4);
    return;
  }
},[state.resultWinner]);

// set player name.............
const createPlayerName = () => {
  if(!gameStarted){
  dispatch({type: ACTION.STORE_PLAYER_NAME, payload: state.playerName});

  // game Locked
  setGameStarted(true);
  }
 
  // remove the name
  dispatch({type: ACTION.SET_PLAYER_NAME, payload:''});
};

// tryAgain
const tryAgain = () => {
  dispatch({type:ACTION.ALLOW_CLICK_PAPER, payload: true});
  dispatch({type:ACTION.ALLOW_CLICK_ROCK, payload: true});
  dispatch({type:ACTION.ALLOW_CLICK_SCISSOR, payload: true});

  dispatch({type:ACTION.CLICK_PAPER, payload: true});
  dispatch({type:ACTION.CLICK_ROCK, payload: true});
  dispatch({type:ACTION.CLICK_SCISSOR, payload: true});

  dispatch({type:ACTION.ROCK_SELECTED, payload: false});
  dispatch({type:ACTION.SCISSOR_SELECTED, payload: false});
  dispatch({type:ACTION.PAPER_SELECTED, payload: false});

  setShowFinalResult(false);
  setFinalResult('');
}

// reset 
const resetFunc = () => {
  dispatch({type:ACTION.ALLOW_CLICK_PAPER, payload: true});
  dispatch({type:ACTION.ALLOW_CLICK_ROCK, payload: true});
  dispatch({type:ACTION.ALLOW_CLICK_SCISSOR, payload: true});

  dispatch({type:ACTION.CLICK_PAPER, payload: true});
  dispatch({type:ACTION.CLICK_ROCK, payload: true});
  dispatch({type:ACTION.CLICK_SCISSOR, payload: true});

  dispatch({type:ACTION.SET_PLAYER_NAME, payload:''});
  dispatch({type:ACTION.RESET_PLAYER_SCORE});
  dispatch({type:ACTION.RESET_COMPUTER_SCORE});
  dispatch({type:ACTION.RESULT_WINNER, payload: true});

  dispatch({type:ACTION.CURRENT_PLAYER, payload: ''});
  dispatch({type:ACTION.CURRENT_TEXT, payload: ''});
  dispatch({type:ACTION.STORE_PLAYER_NAME, payload: ''});

  dispatch({type:ACTION.ROCK_SELECTED, payload:false});
  dispatch({type:ACTION.PAPER_SELECTED, payload:false});
  dispatch({type:ACTION.SCISSOR_SELECTED, payload:false});

  setStartValue(5);
  setGameStarted(false);
  setShowResult('');
  setShowFinalResult(false);
  setFinalResult('');
  clearInterval(setIntervalRf.current);
};

    return (
        <DataContext.Provider value={{

          // For Header and can be for all
          startValue,
          currentPlayer: state.currentPlayer,
          currentText: state.currentText,
          playerName: state.playerName,
          createPlayerName,
          resetFunc,

          // for all
          dispatch,
          ACTION,

          // For Main and can be for all
          allowClickRock: state.allowClickRock,
          allowClickPaper: state.allowClickPaper,
          allowClickScissor: state.allowClickScissor,
          clickRock: state.clickRock,
          clickPaper: state.clickPaper,
          clickScissor: state.clickScissor,
          storePlayerName: state.storePlayerName,
          rockSelected: state.rockSelected,
          paperSelected: state.paperSelected,
          scissorSelected: state.scissorSelected,
          resultWinner: state.resultWinner,
          startGame,
          notAllowed,
          showRock,
          showPaper,
          showScissor,
          finalResult,
          showFinalResult,
          alreadySelected,
          setShowResult,

          // for footer but can be for all
          playerScore: state.playerScore,
          computerScore: state.computerScore,
          showResult

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;