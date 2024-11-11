import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, Button, Container } from "@chakra-ui/react";

const Instruct = () => {
  const [email, setEmail] = useState(""); // Khai báo state để lưu email

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
      {/* Main Title */}
      <Text fontSize="lg" color="gray" mb={100}>
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </Text>

      {/* Instruction Container */}
      <Container p={12} bg="rgba(61, 113, 164, 0.5)" borderRadius="xl" maxW="600px" boxShadow="lg">
        <Text textAlign="center" color="gray.300" fontSize="2xl" mb={12}>
          Hướng Dẫn Trả Lời
        </Text>
        <Text textAlign="left" color="white" fontSize="lg" mb={12}>
          Hãy dựa vào hướng dẫn sau đây để trả lời các câu hỏi:
        </Text>
        <Text textAlign="left" color="white" fontSize="md" mb={2}>
          • Chọn "Có" nếu câu đó phản ánh hiện trạng đang có VÀ được thực hiện một cách nhất quán ít nhất 80% thời gian.
        </Text>
        <Text textAlign="left" color="white" fontSize="md" mb={2}>
          • Chọn "Không" nếu hoàn toàn chưa từng thực hiện.
        </Text>
        <Text textAlign="left" color="white" fontSize="md">
          • Chọn "Không rõ về vấn đề này" nếu không chắc chắn đã thực hiện hay chưa.
        </Text>
        <Link to="/assessment">
          <Button colorScheme="teal" size="lg" mt={6}>
            Bắt đầu bài đánh giá
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Instruct;
