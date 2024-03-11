import { useState } from "react";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { Share } from "@/svg";
import styles from "./styles.module.scss";

const ShareButton = ({ url, title }: { url: string; title: string }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className={styles.shareWrapper}>
      <Share onClick={() => setIsShareOpen(true)} />
      <div
        className={`${styles.shareHidden} ${isShareOpen && styles.shareOpen}`}
      >
        <FacebookShareButton title={title} url={url}>
          <FacebookIcon />
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default ShareButton;
