import React, { Fragment } from 'react';
import { Wrapper, ButtonWrapper } from './QuestionCard.style';

type Props = {
    question: string,
    answers: any[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: any,
    questionNr: number,
    totalQuestions: number
}

const Question: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => {
    return (
        <Fragment>
            <Wrapper>
                <p className='number'>Questions: {questionNr} / {totalQuestions}</p>
                <div className='question'>{question}</div>
                {answers.map(answer => (
                    <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}>
                        <button value={answer} disabled={userAnswer} onClick={callback}>
                            <span>{answer}</span>
                        </button>
                    </ButtonWrapper>
                ))}
            </Wrapper>
        </Fragment>
    );
}


export default Question;