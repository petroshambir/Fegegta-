import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ShieldCheck,
  ShieldOff,
  Store,
  Mail,
  Phone,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  getSellerApplicationById,
  getAllSellerStores,
  setSellerVerification,
  setSellerStoreStatus,
} from '../../utils/adminStorage'

function AdminSellerDetails() {
  const { id } = useParams()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [seller, setSeller] = useState(null)
  const [store, setStore] = useState(null)

  const load = () => {
    const application = getSellerApplicationById(id)

    setSeller(application)

    if (application) {
      const stores = getAllSellerStores()

      const found = stores.find(
        (item) =>
          item.sellerId ===
            (application.sellerId ||
              application.userId ||
              application.id) ||
          item.id === application.storeId
      )

      setStore(found || null)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  if (!seller) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          Seller not found.
        </p>
      </div>
    )
  }

  const toggleVerification = () => {
    if (!store) return

    setSellerVerification(
      store.id,
      !store.verified
    )

    load()
  }

  const changeStatus = (status) => {
    if (!store) return

    setSellerStoreStatus(
      store.id,
      status
    )

    load()
  }

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
          <Link
            to="/admin/sellers"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={17} />
            Back to Sellers
          </Link>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                  <Store size={28} className="text-gray-500" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {seller.storeName ||
                      store?.storeName ||
                      'Seller Store'}
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    {seller.name ||
                      seller.fullName ||
                      'Seller'}
                  </p>
                </div>
              </div>

              {store && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={toggleVerification}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    {store.verified ? (
                      <>
                        <ShieldOff size={17} />
                        Unverify
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={17} />
                        Verify Seller
                      </>
                    )}
                  </button>

                  <select
                    value={store.status || 'pending'}
                    onChange={(e) =>
                      changeStatus(e.target.value)
                    }
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none"
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="approved">
                      Approved
                    </option>

                    <option value="suspended">
                      Suspended
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InfoCard title="Seller Information">
              <InfoRow
                icon={Mail}
                label="Email"
                value={seller.email}
              />

              <InfoRow
                icon={Phone}
                label="Phone"
                value={
                  seller.phone ||
                  seller.businessPhone
                }
              />

              <InfoRow
                icon={Store}
                label="Store"
                value={
                  seller.storeName ||
                  store?.storeName
                }
              />
            </InfoCard>

            <InfoCard title="Application Information">
              <Detail
                label="Application Status"
                value={seller.status}
              />

              <Detail
                label="Application Date"
                value={formatDate(
                  seller.createdAt ||
                    seller.submittedAt
                )}
              />

              <Detail
                label="Category"
                value={
                  seller.category ||
                  seller.productCategory
                }
              />

              <Detail
                label="Product Type"
                value={seller.productType}
              />
            </InfoCard>

            <InfoCard
              title="Store Verification"
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatusBox
                  label="Seller Application"
                  value={seller.status}
                />

                <StatusBox
                  label="Store Status"
                  value={
                    store?.status || 'pending'
                  }
                />

                <StatusBox
                  label="Verification"
                  value={
                    store?.verified
                      ? 'verified'
                      : 'unverified'
                  }
                />
              </div>
            </InfoCard>
          </div>
        </main>
      </div>
    </div>
  )
}

function InfoCard({
  title,
  children,
  className = '',
}) {
  return (
    <section
      className={`rounded-2xl border border-gray-200 bg-white p-6 ${className}`}
    >
      <h2 className="text-lg font-bold text-gray-900">
        {title}
      </h2>

      <div className="mt-5 space-y-4">
        {children}
      </div>
    </section>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-gray-100 p-2">
        <Icon size={17} />
      </div>

      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="text-sm font-medium text-gray-900">
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-gray-900">
        {value || '—'}
      </span>
    </div>
  )
}

function StatusBox({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-5">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold capitalize text-gray-900">
        {value}
      </p>
    </div>
  )
}

function formatDate(date) {
  if (!date) return '—'

  return new Date(date).toLocaleDateString()
}

export default AdminSellerDetails