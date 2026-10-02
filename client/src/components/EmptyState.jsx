function EmptyState({
  title = 'Nothing here yet',
  description = '',
  action = null,
  icon = '📭',
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      
      {/* Icon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}

export default EmptyState