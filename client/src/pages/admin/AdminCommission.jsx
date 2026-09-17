import React, { useEffect, useState } from 'react'
import {
  DollarSign,
  Save,
  Percent,
} from 'lucide-react'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  getCommissionRate,
  setCommissionRate,
  getAdminStatistics,
} from '../../utils/adminStorage'

function AdminCommission() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [rate, setRate] = useState(10)
  const [stats, setStats] = useState({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    setRate(getCommissionRate())
    setStats(getAdminStatistics())
  }, [])

  const handleSave = () => {
    const success = setCommissionRate(rate)

    if (!success) {
      setMessage('Commission rate must be between 0 and 100.')
      return
    }

    setStats(getAdminStatistics())
    setMessage('Commission rate updated successfully.')

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const exampleSale = 100
  const exampleCommission =
    exampleSale * (Number(rate) / 100)

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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Commission
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage the platform commission charged to sellers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gray-100 p-3">
                  <Percent size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Commission Rate
                  </h2>

                  <p className="text-sm text-gray-500">
                    This rate is used to calculate seller earnings.
                  </p>
                </div>
              </div>

              <div className="mt-6 max-w-md">
                <label className="text-sm font-semibold text-gray-700">
                  Commission percentage
                </label>

                <div className="mt-2 flex">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={rate}
                    onChange={(e) =>
                      setRate(e.target.value)
                    }
                    className="w-full rounded-l-xl border border-gray-200 px-4 py-3 outline-none"
                  />

                  <div className="flex items-center rounded-r-xl border border-l-0 border-gray-200 bg-gray-50 px-5 font-semibold">
                    %
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
                >
                  <Save size={17} />
                  Save Commission
                </button>

                {message && (
                  <p className="mt-3 text-sm text-gray-600">
                    {message}
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="font-bold text-gray-900">
                Example
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                For a €100 seller sale:
              </p>

              <div className="mt-5 space-y-4">
                <Value
                  label="Sale"
                  value="€100.00"
                />

                <Value
                  label="Platform commission"
                  value={`€${exampleCommission.toFixed(2)}`}
                />

                <Value
                  label="Seller receives"
                  value={`€${(
                    exampleSale -
                    exampleCommission
                  ).toFixed(2)}`}
                />
              </div>
            </section>
          </div>

          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat
              icon={DollarSign}
              label="Gross Sales"
              value={`€${Number(
                stats.totalSales || 0
              ).toFixed(2)}`}
            />

            <Stat
              icon={Percent}
              label="Commission"
              value={`€${Number(
                stats.commission || 0
              ).toFixed(2)}`}
            />

            <Stat
              icon={DollarSign}
              label="Seller Earnings"
              value={`€${Number(
                stats.sellerEarnings || 0
              ).toFixed(2)}`}
            />
          </section>
        </main>
      </div>
    </div>
  )
}

function Value({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="font-bold text-gray-900">
        {value}
      </span>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <Icon size={20} className="text-gray-500" />

      <p className="mt-4 text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>
    </div>
  )
}

export default AdminCommission