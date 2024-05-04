import styles from "./styles.module.scss"
import HomeSwiper from "./HomeSwiper";
import Offers from "./Offers";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import Header from "./Header"
const Main = () => {
  return (
    <div className={styles.main}>
      <Header/>
      <Menu/>
      <HomeSwiper/>
      <Offers/>
      <UserMenu/>
    </div>
  )
}

export default Main