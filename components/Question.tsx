import { IQuestion } from '@/utils/types';
import React, { useState, useTransition } from 'react'
interface Props {
    question: IQuestion;
    withId: boolean;
    checkEnabled: boolean;
    getAnswer?: (answer: boolean) => void;
  }
  
  const Question = ({ question, withId, checkEnabled, getAnswer }: Props) => {
    const [answer, setAnswer] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isTrue, setIsTrue] = useState(false);
  
    const transitions = useTransition(isAnswered, {
      from: { opacity: 0, height: 0 },
      enter: { opacity: 1, height: 40 },
      leave: { opacity: 0, height: 0 },
      config: {
        duration: 200,
      },
    });
}
export default Question