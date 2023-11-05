import Home from "@/pages/home"
import Shop from "@/pages/shop"
import { useLayoutEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

const AllRoutes = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  )
}

export default AllRoutes
