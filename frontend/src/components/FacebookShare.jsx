import { FacebookShareButton, FacebookIcon } from "react-share";

const FacebookShare = ({ level, description }) => {
  const resultLink = `${window.location.href}?level=${level}&description=${description}`;

  return (
    <div>
      <FacebookShareButton url={resultLink}>
        <FacebookIcon size={32} round />
        Share Results
      </FacebookShareButton>
    </div>
  );
};

export default FacebookShare;
