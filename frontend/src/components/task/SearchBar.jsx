import { FiSearch } from 'react-icons/fi'
import { useDebounce } from '../../hooks/useDebounce'

const SearchBar = ({ value, onChange, placeholder = 'Search tasks...' }) => {
  const debouncedValue = useDebounce(value, 300)

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="input-field pl-10"
        placeholder={placeholder}
      />
    </div>
  )
}

export default SearchBar
