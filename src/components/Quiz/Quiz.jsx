import React, { useRef, useState, useEffect } from 'react';
import "./Quiz.css";
import { data } from '../../data';

export default function Quiz() {
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [progress, setProgress] = useState(0); 

    useEffect(() => {
        if (result) {
            let currentProgress = 0;
            const targetProgress = (score / data.length) * 100;
            const interval = setInterval(() => {
                currentProgress += 1;
                setProgress(currentProgress);
                if (currentProgress >= targetProgress) {
                    clearInterval(interval); 
                }
            }, 20); 
            return () => clearInterval(interval);
        }
    }, [result, score]);

    const checkAns = (e, ans) => {
        if (!lock) {
            if (questions.ans === ans) {
                e.target.classList.add('correct');
                setLock(true);
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add('wrong');
                setLock(true);
                optionArray[questions.ans - 1].current.classList.add("correct");
            }
        }
    };

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const optionArray = [Option1, Option2, Option3, Option4];

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                setLock(false);
                return;
            }
            setIndex(index + 1);
            setQuestions(data[index + 1]);
            setLock(false);
            optionArray.forEach((option) => {
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
            });
        }
    };

    const resetBtn = () => {
        setResult(false);
        setLock(false);
        setIndex(0);
        setQuestions(data[0]);
        setScore(0);
        setProgress(0); 
    };

    return (
        <div className='container'>
            <div className="quiz-container">
                <h1 className="heading">QuizMaster</h1>
                <hr />

                {
                    !result ? (
                        <>
                            <h2 className="quiz-question">{index + 1}. {questions.question}</h2>

                            <ul className='options-list'>
                                <li ref={Option1} onClick={(e) => { checkAns(e, 1) }} className='options'>{questions.option1}</li>
                                <li ref={Option2} onClick={(e) => { checkAns(e, 2) }} className='options'>{questions.option2}</li>
                                <li ref={Option3} onClick={(e) => { checkAns(e, 3) }} className='options'>{questions.option3}</li>
                                <li ref={Option4} onClick={(e) => { checkAns(e, 4) }} className='options'>{questions.option4}</li>
                            </ul>

                            <div className="quiz-bottom">
                                <p className='ques-no'>{index + 1}/{data.length} Questions</p>

                                <button onClick={next} className='next-btn'>{index + 1 === data.length ? "Submit" : "Next"}</button>
                            </div>
                        </>
                    ) : (
                        <div className='result'>
                            <div className="progress-circular" style={{ background: `conic-gradient(#c40094 ${progress * 3.6}deg, #ededed 0deg)` }}>
                                <div className="value">{progress.toFixed(0)}%</div>
                            </div>
                            <h2 className='result-heading'>You Scored {score} out of {data.length}</h2>
                            <button onClick={resetBtn} className="reset-btn">Reset</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
