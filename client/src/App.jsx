import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/routes"
import { Toaster } from "sonner";

function App() {
  return (
    <>
     <Toaster richColors position="top-right" />
    <RouterProvider router = {routes}/>
    </>
  )
}

export default App
