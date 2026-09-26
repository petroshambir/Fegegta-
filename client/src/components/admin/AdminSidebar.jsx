import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  PackageCheck,
  ShoppingCart,
  Users,
  WalletCards,
  Bell,
  Settings,
  X,
} from 'lucide-react'

const menuItems = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'My Products',
    path: '/admin/my-products/add',
    icon: ShoppingBag,
  },
  {
    label: 'Sellers',
    path: '/admin/sellers',
    icon: Store,
  },
  {
    label: 'Seller Products',
    path: '/admin/seller-products',
    icon: PackageCheck,
  },
  {
    label: 'Orders',
    path: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    label: 'Customers',
    path: '/admin/customers',
    icon: Users,
  },
  {
    label: 'Commission',
    path: '/admin/commission',
    icon: WalletCards,
  },
  {
    label: 'Notifications',
    path: '/admin/notifications',
    icon: Bell,
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: Settings,
  },
]

function AdminSidebar({
  mobileOpen = false,
  onClose,
}) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Fegegta
            </h1>

            <p className="text-xs text-gray-500">
              Admin Panel
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-medium text-gray-500">
              Platform Owner
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              Fegegta Admin
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar