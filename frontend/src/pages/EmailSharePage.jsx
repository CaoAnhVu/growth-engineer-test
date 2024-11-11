import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Text, Container, Input, VStack, HStack, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const EmailSharePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore, maturityLevel } = location.state || {}; // Lấy totalScore và maturityLevel từ state của location

  const [email, setEmail] = useState(""); // Lưu trữ giá trị email nhập vào
  const [emailList, setEmailList] = useState([]); // Lưu trữ danh sách email đã thêm

  const getLevelThumbnail = (score) => {
    if (score >= 0 && score < 2) return "https://i.imgur.com/li7sDL1.jpg";
    if (score >= 2 && score < 4) return "https://i.imgur.com/FmC2Kk5.jpg";
    if (score >= 4 && score < 6) return "https://i.imgur.com/9F7Tp5I.jpg";
    if (score >= 6 && score < 8) return "https://i.imgur.com/ANlNfGM.jpg";
    if (score >= 8 && score <= 10) return "https://i.imgur.com/o5FgCrx.jpg";
    return "https://i.imgur.com/li7sDL1.jpg"; // fallback nếu không có điểm hợp lệ
  };

  // Lấy thumbnail tương ứng với cấp độ hiện tại
  const levelImage = getLevelThumbnail(totalScore);
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Cập nhật giá trị email khi người dùng nhập vào
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      setEmailList([...emailList, email]); // Thêm email vào danh sách
      setEmail(""); // Xóa giá trị trong ô input sau khi thêm email
    } else {
      alert("Vui lòng nhập một địa chỉ email hợp lệ!"); // Thông báo nếu email không hợp lệ
    }
  };

  const handleSendEmail = () => {
    let emailContent = `Kết quả đánh giá khả năng của mình trong việc lắng nghe, hiểu và đáp ứng các tín hiệu từ khách hàng: ${totalScore} điểm.\n\n`;
    emailContent += `Để tham khảo kết quả của tôi, bạn có thể xem thumbnail dưới đây: ${levelImage}\n\n`;
    emailContent += `Chia sẻ kết quả này với đồng nghiệp hoặc bạn bè của mình!`;

    const subject = "Kết quả đánh giá của tôi về khả năng lắng nghe và đáp ứng tín hiệu khách hàng";

    const mailtoLink = `mailto:${emailList.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;

    window.location.href = mailtoLink;
  };

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmailList(emailList.filter((email) => email !== emailToRemove)); // Xóa email khỏi danh sách
  };

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
      <Container p={12} bg="white" borderRadius="xl" maxW="600px" boxShadow="lg">
        <Text fontSize="lg" color="black" mb={6} fontWeight={"bold"}>
          CHIA SẺ KẾT QUẢ QUA EMAIL
        </Text>
        <Text textAlign="left" fontSize="lg" color="#36414c" mb={4}>
          Vui lòng cung cấp địa chỉ email mà bạn muốn chia sẻ kết quả:
        </Text>

        <form onSubmit={handleEmailSubmit}>
          <VStack spacing={4} align="stretch">
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Địa chỉ email nhận kết quả"
              isRequired
              border="1px"
              borderColor="gray.300"
              placeholderColor="#36414c"
              _focus={{ borderColor: "#36414c" }}
              color="black"
            />
            <Text color="#36414c" textAlign="left">
              Nhấn Enter để thêm email
            </Text>
            <Button type="submit" bg="#1890ff" color="white" _hover={{ bg: "#1d63d0" }} width="auto">
              Thêm email
            </Button>
          </VStack>
        </form>

        <Text color="#36414c" textAlign="left" mt={4}>
          Các email đã thêm:
        </Text>
        <VStack spacing={2} align="start" mt={2}>
          {emailList.map((email, index) => (
            <HStack key={index} spacing={4} align="center">
              <Text color="#36414c">{email}</Text>
              <IconButton icon={<CloseIcon />} aria-label="Remove email" size="sm" color="black" onClick={() => handleRemoveEmail(email)} />
            </HStack>
          ))}
        </VStack>

        {/* Buttons: Thêm email and Gửi email are horizontally aligned */}
        <HStack spacing={4} mt={6} justify="center">
          <Button bg="#1890ff" color="white" _hover={{ bg: "#1d63d0" }} width="200px" onClick={handleSendEmail}>
            Gửi email
          </Button>
          <Button color="#1890ff" _hover={{ bg: "#f0f0f0" }} width="200px" onClick={handleBack}>
            Quay lại
          </Button>
        </HStack>
      </Container>
    </Box>
  );
};

export default EmailSharePage;
