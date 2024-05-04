import { SessionProvider } from "next-auth/react"
import 'react-toastify/dist/ReactToastify.css';


import "@/styles/globals.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
      <Header />
        <Component {...pageProps} />
        <Footer country={""}/>
      </SessionProvider>
    </>);
}
