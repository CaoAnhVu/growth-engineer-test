import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Button, Icon } from "@chakra-ui/react";

const FacebookShare = ({ score }) => {
  const getLevelThumbnail = (score) => {
    if (score >= 0 && score < 2) return "https://i.imgur.com/li7sDL1.jpg";
    if (score >= 2 && score < 4) return "https://i.imgur.com/FmC2Kk5.jpg";
    if (score >= 4 && score < 6) return "https://i.imgur.com/9F7Tp5I.jpg";
    if (score >= 6 && score < 8) return "https://i.imgur.com/ANlNfGM.jpg";
    if (score >= 8 && score <= 10) return "https://i.imgur.com/o5FgCrx.jpg";
    return "https://i.imgur.com/li7sDL1.jpg"; // fallback image
  };

  const handleShare = () => {
    const levelImage = getLevelThumbnail(score); // Lấy ảnh thumbnail theo điểm số
    const urlToShare = `http://yourwebsite.com/result?score=${score}`;
    const description = `Mức độ lắng nghe và phản hồi của tôi với khách hàng là: ${score} điểm.`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}&quote=${encodeURIComponent(description)}&picture=${encodeURIComponent(levelImage)}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  };

  return (
    <Button leftIcon={<Icon as={FaFacebook} />} bg="#eaf4fe" color="#71b6fb" _hover={{ bg: "#1890ff", color: "white" }} _active={{ bg: "#1890ff", color: "white" }} onClick={handleShare} width="200px">
      Chia sẻ qua Facebook
    </Button>
  );
};

export default FacebookShare;
