import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/routes"
import { Toaster } from "sonner";
import Loader from "./components/Loader";
import useLoadingStore from "./store/loadingStore";

function App() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <>
     <Toaster richColors position="top-right" />
    <RouterProvider router = {routes}/>
    {isLoading && <Loader />}
    </>
  )
}

export default App
