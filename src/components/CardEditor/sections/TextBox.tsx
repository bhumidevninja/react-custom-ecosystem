import { useState } from "react";
import { createPortal } from "react-dom";

import { Canvas, FabricObject, Textbox } from "fabric";
import { ChromePicker } from 'react-color'

import AddTextIcon from "../../../assets/icons/add-photo.svg"
import useCanvasElementSelection from "../../../hooks/useCanvasElementSelection";

interface ITextBoxProps {
    canvasObj?: Canvas,
}

const TextBox = (props: ITextBoxProps) => {
    const { canvasObj } = props;
    const [positions, setPositions] = useState<number[]>([1])

    const { selectedElement, selectedElementColor, setSelectedElement, setSelectedElementColor } = useCanvasElementSelection({ canvasObj })

    const handleAddTextBox = () => {
        const previousPosition = positions[positions.length - 1]
        const txtBox = new Textbox('Text here', {
            left: previousPosition * 20 + 100,
            top: previousPosition * 20 + 280,
            fontSize: 22,
            fontFamily: "Cambria",
            fill: "#000",
            fontStyle: "italic",
            width: 290,
            opacity: 1,
            textAlign: "center",
            key: `textbox-${previousPosition}`,
        })

        setPositions(prev => [...prev, prev[prev.length - 1] + 1])
        canvasObj?.add(txtBox)
    }

    const handleDelete = () => {
        if (selectedElement) {
            canvasObj?.remove(selectedElement as FabricObject)
        }
    }

    const handleFontSizeChange = (type: string) => {
        const currentFontSize = (selectedElement as any)?.fontSize
        if (type === 'increment') {
            canvasObj?.getActiveObject()?.set('fontSize', currentFontSize + 1)
        }

        if (type === 'decrement') {
            canvasObj?.getActiveObject()?.set('fontSize', currentFontSize - 1)
        }

        setSelectedElement({ ...canvasObj?.getActiveObject() })
        canvasObj?.renderAll()
    }

    const handleFontColorChange = (event: any) => {
        canvasObj?.getActiveObject()?.set('fill', event.hex)
        setSelectedElementColor(event.hex)
        setSelectedElement(canvasObj?.getActiveObject())
        canvasObj?.renderAll()
    }

    return (
        <div id="add-text-box-container" className="flex items-center gap-1 my-1">
            {selectedElement?.type === 'textbox' &&
                createPortal(<div className="flex flex-col gap-2 px-2 ">
                    <h4>Toolbar options</h4>
                    <div className="flex gap-1 items-center">
                        {<button disabled={(selectedElement as any)?.fontSize < 21} onClick={() => handleFontSizeChange('decrement')}>-</button>}
                        <h4>{(selectedElement as any)?.fontSize}</h4>
                        <button onClick={() => handleFontSizeChange('increment')}>+</button>
                    </div>

                    <ChromePicker color={selectedElementColor} onChangeComplete={handleFontColorChange} />
                    <button onClick={handleDelete}>Delete</button>
                </div>, document.getElementById('textbox-toolbar') as Element)
            }
            <div className="flex items-center justify-center cursor-pointer gap-1">
                <img src={AddTextIcon} className="w-5 h-5 fill-white" />
                <h4 className="text-white" onClick={handleAddTextBox}>Add textbox</h4>
            </div>
        </div>
    )
}

export default TextBox;