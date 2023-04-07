import React from 'react'
import QuizCard from './QuizCard'

export default function QuizCardList({quizQuestions}) {
  return (
    <div className='questions-list'>
      {quizQuestions.map((quizQuestion, index) => {
        return <QuizCard quizQuestion={quizQuestion} key={quizQuestion.id} />
      })}
    </div>
  )
}
