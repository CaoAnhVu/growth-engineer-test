// src/components/Questionnaire.jsx
import { Box, Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

function Questionnaire({ questions, onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleSubmit = () => {
    const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    onSubmit(totalScore);
  };

  return (
    <Box>
      {questions.map((question) => (
        <Box key={question.id} mb={6}>
          <Text mb={2}>{question.title}</Text>
          <RadioGroup onChange={(score) => handleOptionChange(question.id, parseFloat(score))}>
            <Stack direction="column">
              {question.options.map((option) => (
                <Radio key={option.id} value={option.score.toString()}>
                  {option.text}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      ))}
      <Button colorScheme="blue" onClick={handleSubmit} mt={4}>
        Submit
      </Button>
    </Box>
  );
}

export default Questionnaire;
