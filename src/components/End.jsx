
const End = ({endGame}) => {
  return (
    <button 
    onClick={() => endGame()}
    className='custom_h_btn_px custom_h_btn_py text-black custom_h_btn_text font-bold 
     tracking-widest uppercase
     border-none outline-none bg-white rounded-2xl cursor-pointer
     transition-all duration-300 ease-in-out
     focus:text-shadow-[0_0_20px_#4ade80] focus:shadow-[0_0_20px_#4ade80]
     hover:text-shadow-[0_0_20px_#4ade80] hover:shadow-[0_0_20px_#4ade80]
     active:text-shadow-[0_0_20px_#4ade80] active:shadow-[0_0_20px_#4ade80]
     focus:text-[aliceblue] hover:text-[aliceblue]
     focus:bg-[#333] hover:bg-black/50
     '>
      End Game
    </button>
  )
}

export default End