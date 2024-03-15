import { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Close, Facebook, Linkedin, Share, Whatsapp, XSocial } from "@/svg";
import styles from "./styles.module.scss";

const ShareButton = ({ url, title }: { url: string; title: string }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className={`share ${styles.shareWrapper}`}>
      {!isShareOpen && <Share onClick={() => setIsShareOpen(true)} />}
      <div
        className={`${styles.shareHidden} ${isShareOpen && styles.shareOpen}`}
      >
        <div className={styles.upper}>
          <h3>Share</h3>
          <Close
            className={styles.close}
            onClick={() => setIsShareOpen(false)}
          />
        </div>
        <div className={styles.social}>
          <FacebookShareButton title={title} url={url}>
            <div className={styles.logoWrapper}>
              <Facebook />
            </div>
          </FacebookShareButton>
          <TwitterShareButton title={title} url={url}>
            <div className={styles.logoWrapper}>
              <XSocial />
            </div>
          </TwitterShareButton>
          <LinkedinShareButton title={title} url={url}>
            <div className={styles.logoWrapper}>
              <Linkedin />
            </div>
          </LinkedinShareButton>
          <TelegramShareButton title={title} url={url}>
            <div className={styles.logoWrapper}>
              <img src="/images/telegram.svg" alt="telegram" />
            </div>
          </TelegramShareButton>
          <WhatsappShareButton title={title} url={url}>
            <div className={styles.logoWrapper}>
              <Whatsapp />
            </div>
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareButton;
