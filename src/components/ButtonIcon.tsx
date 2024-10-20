import { ElementType } from "react"

interface ButtonIconProps {
    icon: ElementType,
    text: string
}

export function ButtonIcon({icon: Icon, text}: ButtonIconProps) {
    return <button className="flex items-center  justify-center gap-1 c-yellowNeonBtn px-10 p-2 rounded-full" ><Icon />{text}</button>
}