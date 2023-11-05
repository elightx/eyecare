import tokenAtom from '@/store/token'
import { useAtom } from 'jotai'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Wishlist({
  selected,
  productId,
  onClick,
}: {
  selected: boolean
  productId: string
  onClick: () => void
}) {
  const [selectedState, setSelectedState] = useState(selected)

  useEffect(() => {
    setSelectedState(selected)
  }, [selected])

  const [token] = useAtom(tokenAtom)
  return (
    <button
      onClick={(e) => {
        onClick()
        e.stopPropagation()
        fetch('/api/wishlist/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: productId,
          }),
        })
        setSelectedState(!selectedState)
      }}
    >
      <Heart
        stroke="#DC2626"
        fill={selectedState ? '#DC2626' : 'transparent'}
        className="hover:scale-125 transition ease-in-out h-8 w-8 absolute top-8 right-2 z-10"
      />
    </button>
  )
}
