import { useState } from "react"
import { themeColor } from "../data"
import { Canvas } from "fabric"

interface IThemeProps {
    canvasRef: React.RefObject<HTMLCanvasElement>,
    canvasObj?: Canvas
}

const Theme = ({canvasObj}: IThemeProps) => {
    const [currentTheme, setCurrentTheme] = useState<string>(themeColor[0])

    const handleThemeChange = (color: string) => {
        if(canvasObj) {
            canvasObj.set('backgroundColor', color)
            canvasObj.renderAll()
            setCurrentTheme(color);
        }
    }

    return (
        <div id="theme-palate" className=''>
            <h4>Theme</h4>
            <div className='flex gap-1 my-1'>
            {themeColor.map((color) => (
                <div className={`rounded-full p-1 ${color === currentTheme && "border"}`} key={`${color}-theme`}>
                    <div key={`theme-color-${color}`} className={`h-5 w-5 rounded-full cursor-pointer`} style={{background: color}} onClick={() => handleThemeChange(color)}/>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Theme;
