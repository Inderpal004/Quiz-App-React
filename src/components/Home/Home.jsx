import React, { useState } from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loading from "../../../public/loader.json";

export default function Home() {
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate()

    const startQuiz = () => {
        setLoader(true);
        setTimeout(() => {
            navigate("/quiz");
            setLoader(false);
        }, 2000)
    }

    return (
        <div className='home-container'>
           {
            loader ? <div className='loader-container'>
                <div className='animation'>
                <Lottie  animationData={loading}/>
                </div>
            </div> : <>
             <h1 className="start-heading">QuizMaster</h1>
            <p className="summary">Challenge your mind with our exciting quizzes across various topics. Test your knowledge, compete with friends, and learn something new every day!</p>
            <button onClick={startQuiz} className='start-btn'>Start Quiz</button>
            </>
           }
        </div>
    )
}
