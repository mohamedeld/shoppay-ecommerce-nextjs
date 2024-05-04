import Image from "next/image";
import styles from "./footer.module.scss";

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCPET</h3>
      <div className={styles.footer__flexwrap}>
        <Image src="/images/payment/visa.webp" alt="visa payment logo image"  width={60} height={36}/>
        <Image src="/images/payment/mastercard.webp" alt="mastercard payment logo image" width={60} height={36} />
        <Image src="/images/payment/paypal.webp" alt="paypal payment logo image" width={60} height={36} />
      </div>
    </div>
  );
}