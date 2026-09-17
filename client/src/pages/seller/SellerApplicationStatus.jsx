import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  XCircle,
  Store,
} from 'lucide-react'

import {
  getSellerApplication,
  getSellerStore,
} from '../../services/sellerStorage'

function SellerApplicationStatus() {
  const [application, setApplication] =
    useState(null)

  const [store, setStore] = useState(null)

  useEffect(() => {
    setApplication(getSellerApplication())
    setStore(getSellerStore())
  }, [])

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-8 text-center shadow-sm">
          <Store className="mx-auto h-12 w-12 text-gray-400" />

          <h1 className="mt-5 text-2xl font-bold">
            No application found
          </h1>

          <p className="mt-2 text-gray-500">
            You have not submitted a seller application yet.
          </p>

          <Link
            to="/seller/apply"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Apply to Sell
          </Link>
        </div>
      </div>
    )
  }

  const status =
    application.sellerStatus || 'pending'

  const statusConfig = {
    pending: {
      title: 'Application Pending',
      description:
        'Your application has been submitted and is waiting for admin review.',
      icon: Clock3,
      box: 'border-yellow-200 bg-yellow-50',
      text: 'text-yellow-700',
    },

    approved: {
      title: 'Application Approved',
      description:
        'Congratulations. Your seller account and store have been approved.',
      icon: CheckCircle2,
      box: 'border-green-200 bg-green-50',
      text: 'text-green-700',
    },

    rejected: {
      title: 'Application Rejected',
      description:
        'Your seller application was not approved.',
      icon: XCircle,
      box: 'border-red-200 bg-red-50',
      text: 'text-red-700',
    },
  }

  const config =
    statusConfig[status] ||
    statusConfig.pending

  const Icon = config.icon

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <div
            className={`rounded-2xl border p-6 ${config.box}`}
          >
            <div className="flex items-start gap-4">
              <Icon
                className={`mt-0.5 h-7 w-7 ${config.text}`}
              />

              <div>
                <h1
                  className={`text-xl font-bold ${config.text}`}
                >
                  {config.title}
                </h1>

                <p className="mt-2 text-sm text-gray-700">
                  {config.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Info
              label="Store Name"
              value={application.storeName}
            />

            <Info
              label="Business Name"
              value={application.businessName}
            />

            <Info
              label="Category"
              value={application.productCategory}
            />

            <Info
              label="Submitted"
              value={
                application.submittedAt
                  ? new Date(
                      application.submittedAt
                    ).toLocaleDateString()
                  : '—'
              }
            />
          </div>

          {status === 'rejected' &&
            application.rejectionReason && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-800">
                  Rejection Reason
                </p>

                <p className="mt-2 text-sm text-red-700">
                  {application.rejectionReason}
                </p>
              </div>
            )}

          {status === 'approved' && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link
                to="/seller"
                className="rounded-xl bg-black px-5 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
              >
                Seller Dashboard
              </Link>

              <Link
                to="/seller/store"
                className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-semibold hover:bg-gray-50"
              >
                Manage Store
              </Link>

              {store?.slug && (
                <Link
                  to={`/store/${store.slug}`}
                  className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-semibold hover:bg-gray-50"
                >
                  View My Store
                </Link>
              )}
            </div>
          )}

          {status === 'rejected' && (
            <Link
              to="/seller/apply"
              className="mt-8 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Submit New Application
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-semibold text-gray-900">
        {value || '—'}
      </p>
    </div>
  )
}

export default SellerApplicationStatus