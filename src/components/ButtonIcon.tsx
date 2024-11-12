import { ElementType, ButtonHTMLAttributes } from "react";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ElementType;
    text: string;
}

export function ButtonIcon({ icon: Icon, text, ...props }: ButtonIconProps) {
    return (
        <button
            className="flex items-center justify-center gap-1 c-yellowNeonBtn px-10 p-2 rounded-full text-nowrap"
            {...props}
        >
            <Icon />
            {text}
        </button>
    );
}
