import AppRouter from "./router/AppRouter";
import SmoothScroll from "./components/Website/common/SmoothScroll";
import CookieConsent from "./components/Website/common/CookieConsent";

function App() {
  return (
    <>
      <SmoothScroll />
      <AppRouter />
      <CookieConsent />
    </>
  );
}

export default App;