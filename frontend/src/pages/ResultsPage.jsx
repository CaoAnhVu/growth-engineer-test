import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Text, Container, Image, VStack, Button } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";

// Đăng ký các thành phần của Chart.js để sử dụng trong biểu đồ Line
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const ResultsPage = () => {
  const { state } = useLocation(); // Lấy state từ URL (được gửi từ trang trước đó)
  const navigate = useNavigate(); // Dùng để điều hướng đến trang khác
  const { totalScore } = state || {}; // Lấy điểm tổng từ state, nếu không có thì mặc định là undefined

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const score = parseInt(queryParams.get("score"), 10);

  //   if (!isNaN(score)) {
  //     const levelImage = getLevelThumbnail(score); // Chọn ảnh theo điểm

  //     // Cập nhật thẻ Open Graph cho ảnh
  //     document.querySelector('meta[property="og:image"]').setAttribute("content", levelImage);
  //     document.querySelector('meta[property="og:title"]').setAttribute("content", `Kết quả đánh giá: ${score} điểm`);
  //     document.querySelector('meta[property="og:description"]').setAttribute("content", `Mức độ lắng nghe và phản hồi với khách hàng của tôi là: ${score} điểm.`);
  //   }
  // }, []);
  // Kiểm tra nếu không có điểm tổng, sẽ trả về thông báo "Không có kết quả"
  if (totalScore === undefined) {
    return <Text color="white">No results available</Text>;
  }

  // Hàm xử lý chia sẻ kết quả, điều hướng đến trang chia sẻ
  const handleShareResults = () => {
    navigate("/share", { state: { totalScore } });
  };

  // Hàm lấy cấp độ trưởng thành dựa trên điểm số
  const getMaturityLevel = (score) => {
    const levels = [
      // Các cấp độ trưởng thành với điểm số và thông tin mô tả
      {
        name: "Level 1",
        range: [0, 2],
        description: "PRIMITIVE",
        details:
          "Nguồn dữ liệu chính về phản hồi khách hàng đến từ các khảo sát theo năm hoặc không đều đặn. Các cuộc khảo sát được thực hiện độc lập bởi các phòng ban khác nhau mà không có sự chia sẻ kết quả và không lưu trữ tập trung. Hiếm khi thu thập phản hồi gián tiếp (từ bản ghi cuộc gọi, tin nhắn, bình luận v.v) hoặc phản hồi được suy luận từ hành vi, tần suất hay thói quen mua hàng của khách. Các quyết định từ đó kém hiệu quả khi dựa nhiều vào phản hồi đã cũ và không đáng tin cậy.",
        icon: "https://assets.filum.ai/assessments/voc-level1.svg",
      },
      {
        name: "Level 2",
        range: [2, 4],
        description: "ESTABLISHING",
        details:
          "Có đội nhóm liên phòng ban để đánh giá và điều phối việc thu thập phản hồi, phân tích nguyên nhân gốc rễ và thông báo kết quả đến các đại diện. Bước đầu quản trị năng lực Lắng nghe khách hàng để giải quyết vấn đề phân mảnh và thiếu phối hợp, tuy nhiên vấn đề thực thi còn yếu. Băt đầu có các cuộc khảo sát tại điểm chạm nhưng chưa phải tất cả các điểm chạm quan trọng.",
        icon: "https://assets.filum.ai/assessments/voc-level2.svg",
      },
      {
        name: "Level 3",
        range: [4, 6],
        description: "PERFORMING",
        details:
          "Quản trị năng lực Lắng nghe khách hàng đã hình thành và đem lại hiệu quả. Dữ liệu phản hồi trực tiếp từ khách hàng được kết hợp với dữ liệu từ các nguồn khác (Ví dụ: từ điểm chạm web, cửa hàng, v.v.) và phản hồi gián tiếp (Ví dụ: bản ghi cuộc gọi, tin nhắn, bình luận mạng xã hội v.v). Quy trình đóng vòng phản hồi giúp xác định và giải quyết các khiếu nại hoặc vấn đề khách hàng gặp phải. Phản hồi được thu thập trong nhiều giai đoạn của hành trình khách hàng.",
        icon: "https://assets.filum.ai/assessments/voc-level3.svg",
      },
      {
        name: "Level 4",
        range: [6, 8],
        description: "OPTIMIZING",
        details:
          "Năng lực Lắng nghe khách hàng hoạt động đầy đủ trên một nền tảng duy nhất với quy định về trách nhiệm và thực thi rõ ràng. Các quy trình làm việc, báo cáo và phân tích được thông báo đầy đủ và tường minh, cung cấp dữ liệu thời gian thực, phù hợp cho từng nhân viên và phòng ban. Thông tin về phản hồi được tích hợp vào các ứng dụng quan trọng và phổ biến như CRM.",
        icon: "https://assets.filum.ai/assessments/voc-level4.svg",
      },
      {
        name: "Level 5",
        range: [8, 10],
        description: "EMBEDDED",
        details:
          "Hiệu quả của Lắng nghe khách hàng được định lượng bằng việc kết nối các hành động đề xuất với kết quả thu được lên các chỉ số liên quan đến vận hành và khách hàng. Có cơ chế liên tục để thu thập ý kiến phản hồi từ nhân viên nhằm cải thiện trải nghiệm khách hàng.",
        icon: "https://assets.filum.ai/assessments/voc-level5.svg",
      },
    ];

    // Trả về cấp độ trưởng thành phù hợp với điểm số, nếu không tìm thấy trả về đối tượng mặc định
    return (
      levels.find((level) => score >= level.range[0] && score <= level.range[1]) || {
        name: "Unknown",
        description: "No description available.",
        icon: "",
        details: "",
      }
    );
  };

  // Lấy cấp độ trưởng thành của người dùng dựa trên điểm số
  const maturity = getMaturityLevel(totalScore);

  // Dữ liệu cho biểu đồ Line
  const data = {
    labels: ["PRIMITIVE", "ESTABLISHING", "PERFORMING", "OPTIMIZING", "EMBEDDED"],
    datasets: [
      {
        label: "Total Score", // Điểm tổng
        data: [0, 2, 4, 6, 8, 10], // Mảng điểm số để hiển thị các cấp độ
        borderColor: "#888", // Màu sắc của đường biểu đồ
        backgroundColor: "#888",
        fill: false,
        tension: 0.4, // Độ cong của đường
        pointRadius: 5, // Kích thước điểm trên đường biểu đồ
      },
      {
        label: "Your Score", // Điểm của người dùng
        data: [totalScore], // Điểm số của người dùng
        fill: false,
        borderColor: "#f6e05f", // Màu sắc đường của người dùng
        backgroundColor: "#f6e05f",
        pointRadius: 8,
        pointHoverRadius: 12, // Kích thước điểm khi hover
        pointBackgroundColor: "#f6e05f",
        pointStyle: "circle",
      },
    ],
  };

  // Các thiết lập cho biểu đồ Line
  const options = {
    responsive: true, // Đảm bảo biểu đồ sẽ tự động điều chỉnh theo kích thước màn hình
    plugins: {
      legend: { display: false }, // Tắt hiển thị legend
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Score: ${totalScore}`; // Hiển thị điểm số khi hover
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Bắt đầu từ 0 trên trục y
        max: 10, // Điểm max là 10
        ticks: {
          color: "#f6e05f", // Màu sắc của các tick trên trục y
          stepSize: 2, // Khoảng cách giữa các tick
          callback: function (value) {
            return value === totalScore ? `Score: ${totalScore}` : value; // Hiển thị điểm của người dùng ở vị trí thích hợp
          },
        },
        title: { display: true, text: "Scores", color: "#f6e05f" }, // Tiêu đề cho trục y
      },
      x: {
        title: { display: true, text: "Maturity Level", color: "#f6e05f" }, // Tiêu đề cho trục x
        ticks: {
          color: (context) => {
            // Đổi màu các ticks trục x tương ứng với cấp độ hiện tại của người dùng
            const levelIndex = data.labels.indexOf(maturity?.description || "");
            return context.index === levelIndex ? "#f6e05f" : "#888"; // Làm nổi bật cấp độ hiện tại
          },
        },
      },
    },
    hover: {
      onHover: function (event, chartElement) {
        // Xử lý sự kiện hover trên biểu đồ
        if (chartElement.length) {
          const datasetIndex = chartElement[0].datasetIndex; // Lấy index của dataset
          const index = chartElement[0].index; // Lấy index của phần tử trong dataset
          this.options.scales.x.ticks.color = (context) => {
            return context.index === index ? "#f6e05f" : "#888"; // Làm nổi bật cấp độ khi hover
          };
          this.update(); // Cập nhật lại biểu đồ sau khi thay đổi
        }
      },
    },
  };

  return (
    <Box textAlign="center" p={8} bg="linear-gradient(24deg, rgba(12,81,148,1) 20%, rgba(5,29,63,1) 80%)" minH="100vh">
      <Text fontSize="lg" color="gray" mb={100}>
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </Text>
      <Container p={6} bg="rgba(61, 113, 164, 0.5)" borderRadius="xl" maxW="600px" boxShadow="lg">
        <VStack spacing={4}>
          <Image src={maturity.icon} alt="Level Icon" boxSize="40px" />
          <Text fontSize="md" fontWeight="bold">
            VOICE OF THE CUSTOMER - CẤP ĐỘ {maturity.name}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="yellow.300">
            {maturity.description}
          </Text>
          <Text color="white" fontSize="sm" textAlign="center" px={4}>
            {maturity.details}
          </Text>
          <Box width="100%" maxW="500px" mt={6}>
            <Line data={data} options={options} />
          </Box>
          <Text fontSize="2xl" fontWeight="bold" color="white" mt={4}>
            Số điểm: {totalScore}
          </Text>
        </VStack>
        <Button mt="20px" mb="20px" colorScheme="blue" onClick={handleShareResults}>
          Chia sẻ kết quả
        </Button>
      </Container>
    </Box>
  );
};

export default ResultsPage;
