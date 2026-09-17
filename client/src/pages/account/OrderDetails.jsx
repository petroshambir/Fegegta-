import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
} from 'lucide-react'

import { useLanguage } from '../../context/LanguageContext'

function OrderDetails() {
  const { id } = useParams()
  const { t } = useLanguage()

  const order = null

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        <Link
          to="/account/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          {t('backToOrders') || 'Back to Orders'}
        </Link>

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            {t('order') || 'Order'}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            #{id}
          </h1>
        </div>

        {!order ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <Package
              size={42}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              {t('orderDetailsComingSoon') ||
                'Order details will appear here'}
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
              {t('orderDetailsBackendNote') ||
                'Order information will be connected to the backend when the order system is implemented.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600" />
                <span className="font-semibold">
                  {t('orderConfirmed') || 'Order Confirmed'}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Truck />
                <span>
                  {t('tracking') || 'Tracking'}
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}

export default OrderDetails