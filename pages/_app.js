import "../styles/globals.css";
import ThemeToggle from "../components/Shared/ThemeToggle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ThemeToggle />
    </>
  );
}

export default MyApp;
