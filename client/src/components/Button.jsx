function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) {
  const variants = {
    primary:
      'bg-black text-white hover:bg-gray-800',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline:
      'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
    danger:
      'bg-red-600 text-white hover:bg-red-700',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        rounded-lg
        font-medium
        transition
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-gray-300
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}

export default Button