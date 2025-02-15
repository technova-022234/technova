import React, {useState} from "react"
const Level1 = () => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [hint,setHint] = useState("")

    const handleHint = () => {
        setHint("hint:think carefully")
      }
    
      const handleQuestionClick = (q) => {
        console.log('Question', q ,'selected');
        setQuestion(`Question ${q}`);
        setAnswer("");
        setHint("");
      };
    
      const handleSubmit = () => {
        console.log(`Answer submitted: ${answer}`);
      };

  return (
    <div>
      <div className="flex justify-evenly items-center w-full h-screen relative">
        <div className="absolute top-[20%] w-full flex justify-evenly">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-xl" 
        onClick={() =>handleQuestionClick(1)}>1</button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-xl" 
        onClick={() => handleQuestionClick(2)}>2</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xl" 
        onClick={() =>handleQuestionClick(3)}>3</button>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-xl" 
        onClick={() => handleQuestionClick(4)}>4</button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-xl" 
        onClick={() => handleQuestionClick(5)}>5</button>  
      </div>
      {question && (
        <div className="mt-20 text-center">
          <p className="text-2xl">{question}</p>
          <input 
            type="text" 
            className="mt-4 px-4 py-2 border rounded-lg text-xl" 
            placeholder="Enter your answer..." 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="mt-4 flex justify-center gap-4">
            <button 
              className="px-4 py-2 bg-gray-500 text-white rounded-lg text-xl"
              onClick={handleHint}
            >
              Hint
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xl" onclick={handleSubmit}
            >
              Submit
            </button>
            {hint && <p className="mt-4 text-lg text-gray-700">{hint}</p>}
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Level1