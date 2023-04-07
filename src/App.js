import { useState, useEffect, useRef } from 'react';
import './App.css';
import QuizCardList from './QuizCardList';
import axios from 'axios'

function App() {

  const categoryEl = useRef();
  const amountEl = useRef();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
         .then(res => {
          setCategories(res.data.trivia_categories);
         })
  })

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
      .then(res => {
       setQuizQuestions(res.data.results.map((questionItem, index) => {
         const answer = decodeString(questionItem.correct_answer);
         const options = [
           ...questionItem.incorrect_answers.map((a) => decodeString(a)),
           answer];
         return {
           id: `${index}-${Date.now()}`,
           question: decodeString(questionItem.question),
           answer: answer,
           options: options.sort(() => Math.random() -0.5)
         }
       }))
      })
  }, [])

  function decodeString (str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    axios.get('https://opentdb.com/api.php?', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
      .then(res => {
       setQuizQuestions(res.data.results.map((questionItem, index) => {
         const answer = decodeString(questionItem.correct_answer);
         const options = [
           ...questionItem.incorrect_answers.map((a) => decodeString(a)),
           answer];
         return {
           id: `${index}-${Date.now()}`,
           question: decodeString(questionItem.question),
           answer: answer,
           options: options.sort(() => Math.random() -0.5)
         }
       }))
      })
  }

  return (
    <>
      <form action="" className='form' onSubmit={handleFormSubmit}>
        <div className='form-label question-type'>
          <label htmlFor="questions-topics">Category</label>
          <select name="languages" id="questions-topics" ref={categoryEl}>
            {categories.map((category, index) => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className='form-label number-of-questions'>
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" defaultValue={10} min={1} step={1} ref={amountEl} />
        </div>
        <div className='form-label generate-btn-container'>
          <button type='submit'>Generate</button>
        </div>
      </form>
      <QuizCardList quizQuestions={quizQuestions} />
    </>
  );
}

export default App;
