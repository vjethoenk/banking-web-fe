import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout