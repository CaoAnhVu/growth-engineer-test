import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Box, Text, Container, VStack, Icon } from "@chakra-ui/react";
import { FaFacebook, FaEnvelope, FaLink } from "react-icons/fa";

const SharePage = () => {
  // Hook để lấy thông tin từ URL (dùng cho React Router)
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy điểm tổng từ state khi chuyển hướng đến trang này
  const { totalScore } = location.state || {};

  // Hàm xác định ảnh thumbnail (ảnh chia sẻ) dựa trên điểm số
  const getLevelThumbnail = (score) => {
    if (score >= 0 && score < 2) return "https://i.imgur.com/li7sDL1.jpg"; // Điểm từ 0-2
    if (score >= 2 && score < 4) return "https://i.imgur.com/FmC2Kk5.jpg"; // Điểm từ 2-4
    if (score >= 4 && score < 6) return "https://i.imgur.com/9F7Tp5I.jpg"; // Điểm từ 4-6
    if (score >= 6 && score < 8) return "https://i.imgur.com/ANlNfGM.jpg"; // Điểm từ 6-8
    if (score >= 8 && score <= 10) return "https://i.imgur.com/o5FgCrx.jpg"; // Điểm từ 8-10
    return "https://i.imgur.com/li7sDL1.jpg"; // Ảnh mặc định nếu không thỏa mãn điều kiện
  };

  useEffect(() => {
    if (totalScore !== undefined) {
      const levelImage = getLevelThumbnail(totalScore); // Lấy ảnh thumbnail dựa trên điểm
      const metaTitle = document.querySelector('meta[property="og:title"]');
      const metaDescription = document.querySelector('meta[property="og:description"]');
      const metaImage = document.querySelector('meta[property="og:image"]');
      const metaUrl = document.querySelector('meta[property="og:url"]');

      if (metaTitle) {
        metaTitle.setAttribute("content", `Kết quả đánh giá của tôi: ${totalScore} điểm`);
      }

      if (metaDescription) {
        metaDescription.setAttribute("content", `Mức độ lắng nghe và phản hồi của tôi với khách hàng là: ${totalScore} điểm.`);
      }

      if (metaImage) {
        metaImage.setAttribute("content", levelImage); // Cập nhật ảnh Open Graph
      }

      if (!metaUrl) {
        // Nếu không có thẻ URL, tạo mới
        let newMetaUrl = document.createElement("meta");
        newMetaUrl.setAttribute("property", "og:url");
        newMetaUrl.setAttribute("content", window.location.href); // Cập nhật URL hiện tại
        document.head.appendChild(newMetaUrl);
      } else {
        metaUrl.setAttribute("content", window.location.href); // Cập nhật URL nếu có thẻ
      }
    }
  }, [totalScore]); // Hook này sẽ chạy lại mỗi khi totalScore thay đổi
  // Hàm chia sẻ qua Facebook
  const handleShare = () => {
    const levelImage = getLevelThumbnail(totalScore); // Lấy ảnh thumbnail theo điểm số
    const urlToShare = `https://a115-2405-4803-c7b3-be10-41b3-591c-a785-e4da.ngrok-free.app/results?scores=${totalScore}`;
    const description = `Mức độ lắng nghe và phản hồi của tôi với khách hàng là: ${totalScore} điểm.`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}&quote=${encodeURIComponent(description)}&picture=${encodeURIComponent(levelImage)}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400"); // Mở cửa sổ chia sẻ Facebook
  };

  // Hàm chia sẻ qua Email (chuyển hướng đến trang chia sẻ email)
  const handleShareEmail = () => {
    navigate("/emailshare", { state: { totalScore } });
  };

  // Hàm sao chép link vào clipboard với điểm số trong URL để hiển thị đúng ảnh khi chia sẻ
  const handleCopyLink = () => {
    const levelImage = getLevelThumbnail(totalScore); // Lấy ảnh theo cấp độ điểm số
    const urlToShare = `${window.location.origin}/results?score=${totalScore}`; // URL bao gồm điểm số trong tham số

    navigator.clipboard
      .writeText(urlToShare)
      .then(() => {
        alert("Link copied successfully");
      })
      .catch((err) => alert("Failed to copy the link: " + err));
  };

  // Hàm hủy bỏ và quay lại trang trước đó
  const handleCancel = () => {
    navigate(-1); // Trở về trang ResultsPage
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
          {/* Các nút chia sẻ: Facebook, Email, Copy Link */}
          <Button
            leftIcon={<Icon as={FaFacebook} />}
            bg="#eaf4fe"
            color="#71b6fb"
            _hover={{ bg: "#1890ff", color: "white" }}
            _active={{ bg: "#1890ff", color: "white" }}
            onClick={handleShare}
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
