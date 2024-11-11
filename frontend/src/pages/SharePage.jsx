import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Box, Text, Container, VStack, Icon } from "@chakra-ui/react";
import { FaFacebook, FaEnvelope, FaLink } from "react-icons/fa";

const SharePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore } = location.state || {};

  // Xác định URL file HTML tĩnh dựa trên điểm số
  const getLevelUrl = (score) => {
    if (score >= 0 && score < 2) return "/frontend/Level1.html";
    if (score >= 2 && score < 4) return "/frontend/Level2.html";
    if (score >= 4 && score < 6) return "/frontend/Level3.html";
    if (score >= 6 && score < 8) return "/frontend/Level4.html";
    if (score >= 8 && score <= 10) return "/frontend/Level5.html";
    return "/frontend/Level1.html"; // fallback URL nếu không có điểm hợp lệ
  };

  const levelUrl = getLevelUrl(totalScore);

  // Cập nhật thẻ Open Graph khi `totalScore` thay đổi
  useEffect(() => {
    if (totalScore !== undefined) {
      const metaTitle = document.querySelector('meta[property="og:title"]');
      if (metaTitle) {
        metaTitle.setAttribute("content", "Kết quả đánh giá của bạn trong việc lắng nghe và đáp ứng khách hàng.");
      }

      const metaDescription = document.querySelector('meta[property="og:description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", "Đây là kết quả đánh giá. Chia sẻ với bạn bè và đồng nghiệp để cùng cải thiện!");
      }

      let metaImage = document.querySelector('meta[property="og:image"]');
      if (metaImage) {
        metaImage.setAttribute("content", levelUrl); // Cập nhật đường dẫn tới ảnh tương ứng
      }
    }
  }, [totalScore, levelUrl]);

  // Chia sẻ qua Facebook
  const handleShareFacebook = () => {
    const message = "Đây là kết quả đánh giá của tôi!";
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(levelUrl)}&quote=${encodeURIComponent(message)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  // Chia sẻ qua Email
  const handleShareEmail = () => {
    navigate("/emailshare", { state: { totalScore } });
  };

  // Sao chép đường dẫn
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(levelUrl)
      .then(() => alert("Link copied successfully"))
      .catch((err) => alert("Failed to copy the link: " + err));
  };

  // Hủy và quay lại trang trước
  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước
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
          CHIA SẺ KẾT QUẢ ĐÁNH GIÁ
        </Text>
        <Text textAlign={"left"} fontSize="lg" color="#36414c" mb={4}>
          Đây là một số cách bạn có thể chia sẻ kết quả đánh giá với đồng nghiệp hoặc bạn bè của mình:
        </Text>
        <VStack spacing={4}>
          <Button
            leftIcon={<Icon as={FaFacebook} />}
            bg="#eaf4fe"
            color="#71b6fb"
            _hover={{ bg: "#1890ff", color: "white" }}
            _active={{ bg: "#1890ff", color: "white" }}
            onClick={handleShareFacebook}
            width="200px"
          >
            Chia sẻ qua Facebook
          </Button>
          <Button
            leftIcon={<Icon as={FaEnvelope} />}
            bg="#eaf4fe"
            color="#71b6fb"
            _hover={{ bg: "#1890ff", color: "white" }}
            _active={{ bg: "#1890ff", color: "white" }}
            onClick={handleShareEmail}
            width="200px"
          >
            Chia sẻ qua Email
          </Button>
          <Button
            leftIcon={<Icon as={FaLink} />}
            bg="#eaf4fe"
            color="#71b6fb"
            _hover={{ bg: "#1890ff", color: "white" }}
            _active={{ bg: "#1890ff", color: "white" }}
            onClick={handleCopyLink}
            width="200px"
          >
            Sao chép đường dẫn
          </Button>
          <Button color="#71b6fb" _hover={{ bg: "#1890ff", color: "white" }} _active={{ bg: "#1890ff", color: "white" }} onClick={handleCancel} width="200px">
            Hủy
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default SharePage;
