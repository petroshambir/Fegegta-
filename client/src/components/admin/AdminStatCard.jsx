import React from 'react'

function AdminStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition ${
        onClick
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
          : 'cursor-default'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </p>

          {subtitle && (
            <p className="mt-1 text-xs text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
            <Icon size={21} />
          </div>
        )}
      </div>
    </button>
  )
}

export default AdminStatCard