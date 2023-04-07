import React, { useEffect, useState } from 'react'

export default function QuizCard({quizQuestion}) {

  const [answerQuizQuestion, setAnswerQuizQuestion] = useState('');
  const [correctOrWrong, setCorrectOrWrong] = useState({
    correct: false,
    wrong: false,
    neutral: true
  })

  useEffect(() => {
    setAnswerQuizQuestion(quizQuestion.answer);
  }, [quizQuestion.answer])

  function handleAnswerCheck(e) {
    // console.log(e.target.innerText)
    if (answerQuizQuestion === e.target.innerText){
      setCorrectOrWrong({
        correct: true,
        wrong: false,
        neutral: false
      })
    }
    else {
      setCorrectOrWrong({
        correct: false,
        wrong: true,
        neutral: false
      })
    }
  }

  function handleResetBtnClick() {
    setCorrectOrWrong({
      correct: false,
      wrong: false,
      neutral: true
    })
  }

  return (
    <div 
      className={`single-question 
                  ${correctOrWrong.correct ? 'correct' : ''} 
                  ${correctOrWrong.wrong ? 'wrong' : ''}
                  ${correctOrWrong.neutral ? 'neutral' : ''}
      `}
    >
      <div className='question-container'>
        <p>{quizQuestion.question}</p>
      </div>
      <div className='options-container'>
        {quizQuestion.options.map((option, index) => {
            return <p onClick={handleAnswerCheck} key={index}>{option}</p>
        })}
      </div>
      <div className="btn-container">
        <button onClick={handleResetBtnClick}>Reset</button>
      </div>
    </div>
  )
}
