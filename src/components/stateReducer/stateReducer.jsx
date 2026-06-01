const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };

    case 'PLAYERSCORE':
      return { ...state, playerScore: state.playerScore + 1 };

    case 'COMPUTERSCORE':
      return { ...state, computerScore: state.computerScore + 1 };

    case 'RESET_PLAYER_SCORE':
      return { ...state, playerScore: 0 };

    case 'RESET_COMPUTER_SCORE':
      return { ...state, computerScore: 0 };

    case 'RESULT_WINNER':
      return { ...state, resultWinner: action.payload };

    case 'ALLOW_CLICK_ROCK':
      return { ...state, allowClickRock: action.payload };

    case 'ALLOW_CLICK_PAPER':
      return { ...state, allowClickPaper: action.payload };

    case 'ALLOW_CLICK_SCISSOR':
      return { ...state, allowClickScissor: action.payload };

    case 'CLICK_ROCK':
      return { ...state, clickRock: action.payload };

    case 'CLICK_PAPER':
      return { ...state, clickPaper: action.payload };

    case 'CLICK_SCISSOR':
      return { ...state, clickScissor: action.payload };

    case 'ROCK_SELECTED':
      return { ...state, rockSelected: action.payload };

    case 'PAPER_SELECTED':
      return { ...state, paperSelected: action.payload };

    case 'SCISSOR_SELECTED':
      return { ...state, scissorSelected: action.payload };

    case 'CURRENT_PLAYER':
      return { ...state, currentPlayer: action.payload };

    case 'CURRENT_TEXT':
      return { ...state, currentText: action.payload };

    case 'STORE_PLAYER_NAME':
      return {
        ...state, storePlayerName: action.payload
      };

    default:
      throw new Error();
  }
};

export default gameReducer;