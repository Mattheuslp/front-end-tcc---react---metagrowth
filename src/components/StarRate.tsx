import { useState } from "react";
import { FaStar } from "react-icons/fa";

type StarRateProps = {
    value: number | null;
    onChange: (value: number) => void;
    disabled?: boolean; 
};

export function StarRate({ value, onChange, disabled = false }: StarRateProps) {
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div className="flex">
            {[...Array(5)].map((_, index: number) => {
                const currentRate = index + 1;

                return (
                    <label key={currentRate}>
                        <input
                            type="radio"
                            name="rate"
                            value={currentRate}
                            onClick={() => !disabled && onChange(currentRate)} 
                            className="hidden"
                            disabled={disabled} 
                        />
                        <FaStar
                            size={50}
                            className={`${
                                disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer"
                            } hover:text-primary-yellowNeon ${
                                currentRate <= (hover ?? value ?? 0)
                                    ? "text-primary-yellowNeon"
                                    : "text-white"
                            }`}
                            onMouseEnter={() => !disabled && setHover(currentRate)} 
                            onMouseLeave={() => !disabled && setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}
