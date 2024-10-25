import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export function StarRate() {
    const [rating, setRating] = useState<number | null>(null)
    const [rateColor, setColor] = useState<number | null>(null)

    console.log('rating', rating)

    return (
        <div className='flex'>
            {[...Array(5)].map((_, index: number) => {
                const currentRate = index + 1

                return (
                    <label key={currentRate}>

                        <input
                            type="radio"
                            name="rate"
                            value={currentRate}
                            onClick={() => setRating(currentRate)}
                            className="hidden"
                        />
                        <FaStar
                            size={50}
                            className={`cursor-pointer  hover:text-primary-yellowNeon ${currentRate <= ((rateColor ?? rating) ?? 0) ? 'text-primary-yellowNeon' : 'text-white'}`}
                        />
                    </label>
                )
            })}
        </div>
    )
}
