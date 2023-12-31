"use client";
import { IQuestion } from "@/utils/types";
import React, { useState } from "react";
import SelectState from "./SelectState";
import {
  getQuizQuestions,
  getStates,
} from "@/utils/functions";
import Question from "./Question";

const QuizForm = () => {
  const [state, setState] = useState(1);
  const [quizStarted, setQuizStarted] =
    useState(false);
  const [quizEnded, setQuizEnded] =
    useState(false);
  const [currentQuestion, setCurrentQuestion] =
    useState(0);
  const [questions, setQuestions] = useState<
    IQuestion[]
  >([]);
  const [answers, setAnswers] = useState<
    boolean[]
  >([]);
  const [currentAnswer, setCurrentAnswer] =
    useState(false);
  const [answered, setAnswered] = useState(false);

  const startQuiz = () => {
    setQuestions(getQuizQuestions(state));
    setQuizStarted(true);
  };

  const quizEnd = () => {
    setQuizEnded(true);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setAnswers([...answers, currentAnswer]);
    setAnswered(false);
  };

  const passed = () =>
    answers.filter((a) => a).length >= 2;
  const newStart = () => {
    setQuizStarted(false);
    setAnswered(false);
    setCurrentAnswer(false);
    setQuizEnded(false);
    setState(1);
    setCurrentQuestion(0);
    setQuestions([]);
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-8 p-4 lg:p-8">
      <h1 className="text-4xl font-semibold pb-4 mb-4 border-b border-gray-300">
        Test
      </h1>
      {!quizStarted && (
        <div className="bg-slate-50 p-6 rounded-xl shadow">
          <h2 className="text-lg">
            select state
          </h2>
          <SelectState
            states={getStates()}
            state={(stateValue) =>
              setState(stateValue)
            }
          />
          <button
            className="my-4 px-4 py-2 text-white rounded-lg shadow bg-blue-600 hover:bg-blue-500"
            onClick={startQuiz}
          >
            Test start
          </button>
        </div>
      )}

      {quizStarted && !quizEnded && (
        <div>
          <Question
            question={questions[currentQuestion]}
            getAnswer={(answer) => {
              setCurrentAnswer(answer);
              setAnswered(true);
            }}
            withId={false}
            checkEnabled={false}
          />
          <div>
            <div>
              문제 {currentQuestion + 1} /{" "}
              {questions.length}
            </div>

            {answered && (
              <button
                className="my-4 px-8 py-2 text-white float-right rounded-lg shadow bg-blue-600 hover:bg-blue-500"
                onClick={() =>
                  currentQuestion >=
                  questions.length - 1
                    ? quizEnd()
                    : nextQuestion()
                }
              >
                {currentQuestion >=
                questions.length - 1
                  ? "완료"
                  : "다음"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default QuizForm;
