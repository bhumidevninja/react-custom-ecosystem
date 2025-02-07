import React, { useRef, useState } from "react";
import { Canvas, FabricImage } from "fabric";

interface IBackgroundImageProps {
    canvasObj?: Canvas
}

const BackgroundImage = ({ canvasObj }: IBackgroundImageProps) => {
    const [backdropImage, setBackgroundImage] = useState<FileList | null>()

    const imageInputRef = useRef<HTMLInputElement>(null)

    const handleAddBackgroundImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files
        const file = document.createElement('img')
        if (files?.[0]) {
            setBackgroundImage(files)
            file.src = URL.createObjectURL(files?.[0])
            file.id = 'banner-image'
            file.setAttribute('object-fit', 'cover')

            file.onload = () => {
                file.width = 100
                file.height = 100
                file.setAttribute('object-fit', 'cover')

                FabricImage.fromURL(file.src).then(img => {
                    img.set({
                        scaleX: (canvasObj?.width || 0) / img.width!,
                        scaleY: (canvasObj?.height || 0) / img.height!,
                        originX: 'left',
                        originY: 'top',
                    });
                    canvasObj?.set('backgroundImage', img)
                    canvasObj?.renderAll();
                })
            }
        }

    }

    const handleClick = () => {
        imageInputRef.current?.click()
    }

    const handleReset = () => {
        if (imageInputRef.current) {
            setBackgroundImage(null)
            canvasObj?.set('backgroundImage', '')
            canvasObj?.renderAll();
            imageInputRef.current.value = ''
        }
    }

    return (
        <div id="theme-palate" className=''>
            <input ref={imageInputRef} type="file" className="hidden" onChange={handleAddBackgroundImage} multiple={false} accept="img*" />
            <div className="flex gap-1">
                <h4 className="cursor-pointer" onClick={handleClick}>{backdropImage?.length ? 'Change Background' : 'Set Background'}</h4>
                <h4 className="cursor-pointer" onClick={handleReset}>{backdropImage?.length && 'Reset Background'}</h4>
            </div>

        </div>
    )
}

export default BackgroundImage;