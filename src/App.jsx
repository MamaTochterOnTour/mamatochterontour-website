
import AppRouter from "./router/AppRouter";
import SmoothScroll from "./components/Website/common/SmoothScroll";
import CookieConsent from "./components/Website/common/CookieConsent";
import SEOManager from "./components/Website/common/SEOManager";

function App() {
  return (
    <>
      <SEOManager />
      <SmoothScroll />
      <AppRouter />
      <CookieConsent />
    </>
  );
}

export default App;
