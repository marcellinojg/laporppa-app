import { BrowserRouter } from "react-router-dom"
import RoutesComponents from "./components/routes"
import { AlertProvider } from "./context/AlertContext"
import { AuthProvider } from "react-auth-kit";
import { LoaderProvider } from "./context/LoaderContext"
import Navbar from "./components/external/Navbar";
function App() {

  return (
    <>
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "http:"}
      >
        <LoaderProvider>
          <AlertProvider>
            <BrowserRouter>
              <Navbar />
              <RoutesComponents />
            </BrowserRouter>
          </AlertProvider>
        </LoaderProvider>
      </AuthProvider>
    </>
  )
}

export default App
