import * as fabric from "fabric";
import {  useRef } from "react";
import { createPortal } from "react-dom";
import useCanvasElementSelection from "../../../hooks/useCanvasElementSelection";

interface IAddImageProps {
    canvasObj?: fabric.Canvas,
    canvasRef: React.RefObject<HTMLCanvasElement>

}

const AddImage = ({ canvasObj, canvasRef }: IAddImageProps) => {

    const imageInputRef = useRef<HTMLInputElement>(null)

    const {selectedElement, setSelectedElement} = useCanvasElementSelection({canvasObj})


    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files
        const file = document.createElement('img')
        if (files?.[0]) {
            file.src = URL.createObjectURL(files?.[0])
            file.id = 'banner-image'
            file.setAttribute('object-fit', 'cover')

            file.onload = () => {
                file.width = 100
                file.height = 100
                file.setAttribute('object-fit', 'cover')
                const Img = new fabric.FabricImage(file, {
                    left: 100,
                    top: 100,
                    // width: 50,
                    // height: 50
                })
                canvasObj?.add(Img);
                canvasObj?.renderAll()
            }
        }
    }

    const handleDelete = () => {
        setSelectedElement(null)
        if(imageInputRef.current) {
            imageInputRef.current.value = ''
        }
        canvasObj?.remove(selectedElement as fabric.FabricObject)
        canvasObj?.renderAll()
    }

    const handleClick = () => {
        if (canvasRef?.current) {
            canvasRef.current?.click()
            imageInputRef.current?.click()
        }
    }

    return (
        <div>
            {selectedElement?.type === 'image' && createPortal(
                <div className="flex flex-col gap-2 px-2 ">
                    <button onClick={handleDelete}>Delete</button>
                </div>,
                document.getElementById('image-toolbar') as Element
            )}
            <input ref={imageInputRef} type="file" className="hidden" onChange={handleAddImage} multiple={false} accept="img*" />
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleClick}>
                <h4>Add Image</h4>
            </div>
        </div>
    )
}

export default AddImage;