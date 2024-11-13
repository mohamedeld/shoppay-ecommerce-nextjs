
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import styles from "./style.module.scss";

const Share = () => {
  return (
    <div className={styles.share}>
      <div>
        <FacebookShareButton url={""} >
          <FacebookIcon size={38}  />
        </FacebookShareButton>
      </div>
      <div>
        <FacebookMessengerShareButton url={""}>
          <FacebookMessengerIcon size={38} />
        </FacebookMessengerShareButton>
      </div>
      <div>
        <TwitterShareButton url={""}>
          <TwitterIcon size={38} />
        </TwitterShareButton>
      </div>
      <div>
        <LinkedinShareButton url={""}>
          <LinkedinIcon size={38} />
        </LinkedinShareButton>
      </div>
      <div>
        <RedditShareButton url={""}>
          <RedditIcon size={38} />
        </RedditShareButton>
      </div>
      <div>
        <TelegramShareButton url={""}>
          <TelegramIcon size={38} />
        </TelegramShareButton>
      </div>
      <div>
        <WhatsappShareButton url={""}>
          <WhatsappIcon size={38} />
        </WhatsappShareButton>
      </div>
      <div>
        <PinterestShareButton url={""}>
          <PinterestIcon size={38} />
        </PinterestShareButton>
      </div>
      <div>
        <EmailShareButton url={""}>
          <EmailIcon size={38} />
        </EmailShareButton>
      </div>
    </div>
  )
}

export default Share