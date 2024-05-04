import Link from "next/link";
import styles from "./footer.module.scss";
import { IoLocationSharp } from "react-icons/io5";
export default function Copyright({ country }) {
  return (
    <div className={styles.footer__copyright}>
      <section>©2022 SHOPPAY All Rights Resereved.</section>
      <section>
        <ul>
          {data.map((link,i) => {
            return (
              <li key={link.name}>
                <Link href={link.link}>{link.name}</Link>
              </li>
            )
          })}
          <li>
            <Link href="">
              <IoLocationSharp /> 
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
];