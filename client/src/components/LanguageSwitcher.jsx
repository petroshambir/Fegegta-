import { useLanguage } from '../context/LanguageContext'

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-gray-400"
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="ti">ትግርኛ</option>
      <option value="am">አማርኛ</option>
    </select>
  )
}

export default LanguageSwitcher