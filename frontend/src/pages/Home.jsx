import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import EmailForm from "../components/EmailForm";

const Home = () => {
  const [email, setEmail] = useState(""); // Tạo state email để lưu trữ giá trị email người dùng nhập

  // Hàm xử lý khi người dùng nhập email và gửi
  const handleEmailSubmit = (email) => {
    setEmail(email); // Lưu email vào state
  };

  return (
    <Box textAlign="center" p={8} bg="#051d3f" minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Text fontSize="lg" color="gray" mb={100}>
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </Text>
      <Text fontSize="4xl" mb={100} fontWeight={"bold"} color="white">
        Công ty bạn trưởng thành như thế nào trong việc lắng nghe khách hàng?
      </Text>
      <Text fontSize="lg" mb={12} color="gray">
        Đánh giá khả năng của bạn trong việc lắng nghe, hiểu và đáp ứng các tín hiệu từ khách hàng.
      </Text>

      <EmailForm onNext={handleEmailSubmit} />

      <Link to="/instruct">
        <Button colorScheme="teal" size="lg" mt={4} onClick={() => onNext(email)}>
          Xác Nhận Email
        </Button>
      </Link>
    </Box>
  );
};

export default Home;
