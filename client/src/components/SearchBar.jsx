import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function SearchBar() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const value = searchTerm.trim()

    if (!value) return

    console.log('Search:', value)

    // Backend search functionality will be added later.
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="relative flex w-full items-center">

        {/* Search Icon */}
        <Search
          size={20}
          className="pointer-events-none absolute left-4 text-gray-400"
        />

        {/* Input */}
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('search')}
          className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-24 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          aria-label={t('search')}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-1.5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          {t('search')}
        </button>

      </div>
    </form>
  )
}

export default SearchBar