'use client' // This allows hooks

import { useRouter, useSearchParams } from 'next/navigation'
type InputProps = {
    query: string;
}
export default function SearchInput({query}:InputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClear = () => {
    // This physically clears the URL and the input
    router.push('/hotels')
  }

  return (
    <div className="relative">
      <input 
        onChange={(e) => {
          // You could even do real-time search here!
          if (!e.target.value) handleClear()
        }}
        name = {query}
        defaultValue={query}
        placeholder="Search..." 
        className="p-3 border rounded-lg w-full max-w-md shadow-sm text-white"
      />
      <button onClick={handleClear} className="absolute right-2 top-2">✕</button>
    </div>
  )
}