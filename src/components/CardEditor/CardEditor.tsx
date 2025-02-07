import { useEffect, useRef, useState } from 'react'
import { Canvas, Textbox } from 'fabric'
import Theme from './sections/Theme'
import TextBox from './sections/TextBox'
import AddImage from './sections/Image'
import BackgroundImage from './sections/Background'
import { useStore } from '../../store/store'
import { getTemplateChanges } from '../../helpers/Template.helpers'
import { ETemplateTypes } from '../../enums/templates.enum'

interface ICardEditorProps {
    handleShowTemplates: () => void
}

const CardEditor = ({ handleShowTemplates }: ICardEditorProps) => {
    const [canvasObj, setCanvasObj] = useState<Canvas>()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const { state: { selectedTemplate } } = useStore()

    useEffect(() => {
        if (canvasObj && selectedTemplate) {
            setCanvasObj(getTemplateChanges({ canvasObj, selectedTemplate }))
            canvasObj?.renderAll()
        }
    }, [selectedTemplate, canvasObj])

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current as HTMLCanvasElement, {
                width: 500,
                height: 600,
                backgroundVpt: true,
                backgroundColor: 'white'
            })

            if (selectedTemplate?.category === ETemplateTypes.Custom) {
                const txtBox = new Textbox('Text', {
                    left: 100,
                    top: 280,
                    fontSize: 22,
                    fontFamily: "Cambria",
                    fill: "#000",
                    fontStyle: "italic",
                    width: 290,
                    opacity: 1,
                    textAlign: "center",

                })
                initCanvas.add(txtBox)
            }
            initCanvas.renderAll();
            setCanvasObj(initCanvas);

            return () => {
                initCanvas.dispose()
            }

        }
    }, [])

    const handleCardDownload = () => {
        canvasRef.current?.click()
        const canvas = document.getElementById("card-canvas") as HTMLCanvasElement;
        if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = url;
            link.download = 'card-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Canvas element not found");
        }
    };


    return (
        <div className='p-5 flex flex-col gap-2'>
            <div className='cursor-pointer flex justify-between' onClick={handleShowTemplates}>
                <strong>Show Templates</strong>
                <div>
                    <button onClick={handleCardDownload}>Download</button>
                </div>
            </div>

            <div className='flex'>
                <div className='flex-2 p-2 border rounded-xl min-w-[30%] flex flex-col gap-3'>
                    <h2>Editor Panel</h2>
                    <Theme canvasRef={canvasRef} canvasObj={canvasObj}/>
                    <TextBox canvasObj={canvasObj} />
                    <AddImage canvasObj={canvasObj} canvasRef={canvasRef} />
                    <BackgroundImage canvasObj={canvasObj} />
                </div>
                <div className='flex flex-1 p-2 justify-center w-full my-2'>
                    <div id="textbox-toolbar" />
                    <div id="image-toolbar" />

                    <canvas id="card-canvas" ref={canvasRef} className='border rounded' />
                </div>
            </div>
        </div>
    )
}

export default CardEditor;