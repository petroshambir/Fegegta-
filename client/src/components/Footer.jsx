
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-block text-xl font-bold transition hover:text-gray-300"
            >
              ፈገግታ
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-400">
              {t('footerDescription')}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold">
              {t('shop')}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">

              <Link
                to="/products"
                className="block transition hover:text-white"
              >
                {t('products')}
              </Link>

              <Link
                to="/categories"
                className="block transition hover:text-white"
              >
                {t('categories')}
              </Link>

            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold">
              {t('account')}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">

              <Link
                to="/login"
                className="block transition hover:text-white"
              >
                {t('login')}
              </Link>

              <Link
                to="/register"
                className="block transition hover:text-white"
              >
                {t('register')}
              </Link>

              <Link
                to="/account/orders"
                className="block transition hover:text-white"
              >
                {t('myOrders')}
              </Link>

              <Link
                to="/account"
                className="block transition hover:text-white"
              >
                {t('account')}
              </Link>

            </div>
          </div>

          {/* Sell With Us */}
          <div>
            <h3 className="font-semibold">
              {t('sellWithUs') || 'Sell With Us'}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">

              <Link
                to="/seller/apply"
                className="block transition hover:text-white"
              >
                {t('becomeSeller') || 'Become a Seller'}
              </Link>

              <Link
                to="/seller/application-status"
                className="block transition hover:text-white"
              >
                {t('sellerApplicationStatus') || 'Application Status'}
              </Link>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          {t('copyright')}
        </div>

      </div>
    </footer>
  )
}

export default Footer