import React, { Fragment, useState } from 'react';
import Question from './components/Question';
import { fetchQuizQuestions } from './API';
import { Difficulty, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.style';

function App() {

  type questionAnswers = {
    question: string,
    answers: string,
    correct: boolean,
    correctAnswer: string
  }

  const [loading, isLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<questionAnswers[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    isLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(5, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0)
    isLoading(false)
  }

  const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!gameOver) {
      const answers = e.currentTarget.value;
      const correct = questions[number].correct_answer === answers;

      if (correct) {
        setScore(prev => prev + 1);
        const answerObject = {
          question: questions[number].question,
          answers,
          correct,
          correctAnswer: questions[number].correct_answer,
        };
        setUserAnswer((prev) => [...prev, answerObject]);
      }
    }

  }

  const nextQuestion = () => {
    const nextQ = number + 1;

    if (nextQ === 5) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>React Quiz</h1>
      { gameOver || userAnswer.length === 5 ? (
        <button className='start' onClick={startTrivia}>Start</button>
      ) : null
      }
      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <Question
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          questionNr={number + 1}
          totalQuestions={5}
          callback={checkAnswers}
        />
      )}
      {!gameOver && score < 5 ?
        (<button className='next' onClick={nextQuestion}>Next Question</button>) : null
      }
    </Wrapper>
    </>
  );
}

export default App;
