// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'

// function MainLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <Navbar />

//       <main>
//         {children}
//       </main>

//       <Footer />
//     </div>
//   )
// }

// export default MainLayout

// import { useLocation } from 'react-router-dom'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'

// function MainLayout({ children }) {
//   const { pathname } = useLocation()
//   const isSellerStorePage = /^\/store\/[^/]+\/?$/.test(pathname)

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       {!isSellerStorePage && <Navbar />}

//       <main>
//         {children}
//       </main>

//       <Footer />
//     </div>
//   )
// }

// export default MainLayout


import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout({ children }) {
  const { pathname, search } = useLocation()
  const isSellerStorePage = /^\/store\/[^/]+\/?$/.test(pathname)
  const isSellerStoreCart =
    pathname === '/cart' &&
    Boolean(new URLSearchParams(search).get('store'))
  const hideMarketplaceNavbar =
    isSellerStorePage || isSellerStoreCart

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {!hideMarketplaceNavbar && <Navbar />}

      <main>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
