import { DataContext } from "./context/DataContext";
import { useContext } from "react";

const Footer = () => {
  const {
    storePlayerName, playerScore, computerScore, 
    resultWinner, showResult
  } = useContext(DataContext);
  const today = new Date();
  const todayDate = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  return (
    <footer className="bg-blue-500 w-full h-[10%] text-white font flex rounded-bl-2xl rounded-br-2xl
    absolute bottom-0
    ">
      { resultWinner &&
        <>
      <section className="w-full h-full grid grid-cols-3 place-items-center">
        <article className="w-full h-full grid place-content-center
        font-semibold tracking-widest
        ">
          <p className="whitespace-nowrap custom_F_text capitalize">{storePlayerName}</p>
          <span className="custom_F_text">Score:{playerScore || '---'}</span>
        </article>
        <article className="w-full h-full grid place-content-center 
        ">
           <p className="custom_F_text">{today.toLocaleDateString('en-US', todayDate)}</p>
        </article>
        <article className="w-full h-full grid place-content-center
        font-semibold tracking-widest 
        ">
           <p className="whitespace-nowrap custom_F_text">Computer</p>
          <span className="custom_F_text">Score:{computerScore || '---'}</span>
        </article>
      </section>
      </>
      }

      { !resultWinner &&
        <>
          <article className="w-full h-full flex justify-center items-center">
            <h3 className="font-semibold tracking-widest uppercase custom_h_text
            text-shadow-[0_0_10px_#4ade80] custom_anime_footer
            ">
              {showResult}
            </h3>
          </article>
        </>
      }
    </footer>
  )
}

export default Footer