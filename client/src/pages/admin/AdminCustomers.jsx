import React, { useEffect, useState } from 'react'
import {
  Search,
  Users,
  Mail,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { getAllCustomers } from '../../utils/adminStorage'

function AdminCustomers() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setCustomers(getAllCustomers())
  }, [])

  const filtered = customers.filter((customer) =>
    `${customer.name || ''} ${
      customer.email || ''
    } ${customer.phone || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-72">
        <AdminHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Customers
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage registered Fegegta customers.
            </p>
          </div>

          <div className="mb-5 relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search customers..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <Users
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-sm text-gray-500">
                  No customers found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[800px] w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Email
                      </th>

                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Phone
                      </th>

                      <th className="px-5 py-4 text-left text-xs uppercase text-gray-500">
                        Registered
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-900">
                            {customer.name ||
                              customer.fullName ||
                              'Customer'}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={15} />
                            {customer.email || '—'}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {customer.phone || '—'}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-500">
                          {formatDate(
                            customer.createdAt ||
                              customer.registeredAt
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function formatDate(date) {
  if (!date) return '—'

  return new Date(date).toLocaleDateString()
}

export default AdminCustomers