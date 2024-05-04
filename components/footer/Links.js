import Link from "next/link";
import styles from "./footer.module.scss";

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => {
        return (
          <ul key={link.heading}>
            {i === 0 ? (
              <img src="/logo.png" alt="" />
            ) : (
              <b>{link.heading}</b>
            )}
            {link.links.map((item,i) => {
              return (
                <li key={item.name}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              )
            })}
          </ul>
        )
      })}
    </div>
  );
}
const links = [
  {
    heading: "SHOPPAY",
    links: [
      {
        name: "About us",
        link: "",
      },
      {
        name: "Contact us",
        link: "",
      },
      {
        name: "Social Responsibility",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
      {
        name: "How To Order",
        link: "",
      },
      {
        name: "How To Track",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
    ],
  },
  {
    heading: "Customer service",
    links: [
      {
        name: "Customer service",
        link: "",
      },
      {
        name: "Terms and Conditions",
        link: "",
      },
      {
        name: "Consumers (Transactions)",
        link: "",
      },
      {
        name: "Take our feedback survey",
        link: "",
      },
    ],
  },
];