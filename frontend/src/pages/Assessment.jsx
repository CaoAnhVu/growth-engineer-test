import React, { useState } from "react";
import { Box, Text, Button, Container, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import assessmentData from "../data/assessment"; // Dữ liệu câu hỏi

const Assessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State để theo dõi câu hỏi hiện tại
  const [answers, setAnswers] = useState({}); // State để lưu câu trả lời của người dùng
  const [totalScore, setTotalScore] = useState(0); // State để tính tổng điểm
  const navigate = useNavigate(); // Hook để điều hướng đến trang khác

  const question = assessmentData.questions[currentQuestionIndex]; // Lấy câu hỏi hiện tại từ dữ liệu

  // Hàm xử lý khi người dùng chọn câu trả lời
  const handleAnswerSelect = (score) => {
    const previousScore = answers[question.id] || 0; // Lấy điểm trước đó của câu hỏi
    setAnswers({
      ...answers,
      [question.id]: score, // Cập nhật câu trả lời của người dùng
    });

    // Cập nhật tổng điểm
    setTotalScore((prevScore) => prevScore - previousScore + score);
  };

  // Hàm xử lý khi người dùng bấm nút "Next" hoặc "Finish"
  const handleNext = () => {
    if (currentQuestionIndex < assessmentData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Chuyển sang câu hỏi tiếp theo
    } else {
      // Khi trả lời xong 10 câu, chuyển hướng đến trang kết quả
      navigate("/results", { state: { totalScore } });
    }
  };

  // Hàm xử lý khi người dùng bấm nút "Back"
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Quay lại câu hỏi trước
    }
  };
  // Kiểm tra nếu người dùng đã chọn câu trả lời cho câu hỏi này
  const isAnswerSelected = (score) => answers[question.id] === score;

  return (
    <Box
      textAlign="center"
      p={8}
      bg="linear-gradient(24deg, rgba(12,81,148,1) 20%, rgba(5,29,63,1) 80%)"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="lg" color="gray" mb={100}>
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </Text>
      {/* Container for Question */}
      <Container p={12} bg="rgba(61, 113, 164, 0.5)" borderRadius="xl" maxW="600px" boxShadow="lg">
        {/* Question Number */}
        <Text textAlign="center" color="gray.300" fontSize="2xl" mb={8}>
          Câu Hỏi {currentQuestionIndex + 1} / {assessmentData.questions.length}
        </Text>

        {/* Question Text */}
        <Text textAlign="center" color="white" fontSize="lg" mb={12}>
          {question.title}
        </Text>

        {/* Answer Options */}
        <Flex direction="column" gap={4} mb={8}>
          {question.options.map((option) => (
            <Button
              variant="outline"
              borderColor={isAnswerSelected(option.score) ? "gray.500" : "white"} // Điều chỉnh borderColor
              color={isAnswerSelected(option.score) ? "white" : "white"} // Màu chữ
              bg={isAnswerSelected(option.score) ? "red" : "transparent"} // Màu nền khi chọn
              onClick={() => handleAnswerSelect(option.score)} // Gọi hàm với điểm của option
              size="lg"
              _focus={{ borderColor: "red" }} // Border color on focus
            >
              {option.text}
            </Button>
          ))}
        </Flex>

        {/* Navigation Buttons */}
        <Flex justifyContent="space-between">
          <Button onClick={handleBack} isDisabled={currentQuestionIndex === 0} colorScheme="gray">
            Back
          </Button>
          <Button onClick={handleNext} colorScheme="teal">
            {currentQuestionIndex === assessmentData.questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Assessment;
