import Link from 'next/link'
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">Store</Link>
        </li>
        <li>
          <Link href="">Electronics</Link>
        </li>
        <li>
          <Link href="">Watches</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header