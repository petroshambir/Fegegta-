import React from 'react'
import {
  Menu,
  Bell,
  LogOut,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminHeader({
  onMenuClick,
}) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Admin Dashboard
            </h2>

            <p className="hidden text-xs text-gray-500 sm:block">
              Manage your Fegegta marketplace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/admin/notifications"
            className="relative rounded-xl p-2.5 text-gray-600 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </Link>

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-900">
              {user?.name || 'Admin'}
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50 hover:text-red-600"
            aria-label="Logout"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader