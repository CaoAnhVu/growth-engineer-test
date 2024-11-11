import React from "react";

const Question = ({ question, onAnswer }) => {
  return (
    <div>
      <h3>{question.title}</h3>
      {question.options.map((option) => (
        <div key={option.id}>
          <label>
            <input type="radio" name={`question-${question.id}`} onClick={() => onAnswer(option.score)} />
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Question;
