import { Canvas, FabricImage, Textbox } from "fabric";
import { ITemplate } from "../components/Templates/templates.types";

type TemplateChangesParams = {
    canvasObj: Canvas,
    selectedTemplate: ITemplate
}

export const getTemplateChanges = ({ canvasObj, selectedTemplate }: TemplateChangesParams): Canvas | undefined => {
    if (canvasObj) {
        if (selectedTemplate?.backgroundImage) {
            FabricImage.fromURL(selectedTemplate?.backgroundImage).then(img => {
                img.set({
                    scaleX: (canvasObj?.width || 0) / img.width!,
                    scaleY: (canvasObj?.height || 0) / img.height!,
                    originX: 'left',
                    originY: 'top',
                });
                canvasObj?.set('backgroundImage', img)
                canvasObj?.renderAll()
            })
        }

        if (selectedTemplate.texts?.length) {
            for (const txt of selectedTemplate.texts) {
                const textBox = new Textbox(txt.title, txt)
                canvasObj.add(textBox)
                canvasObj?.renderAll()
            }
        }

        if (selectedTemplate.images?.length) {
            for (const img of selectedTemplate.images) {
                const file = document.createElement('img')
                file.src = img.src
                file.id = 'banner-image'
                file.setAttribute('object-fit', 'cover')

                file.onload = () => {
                    file.width = 100
                    file.height = 100
                    file.setAttribute('object-fit', 'cover')
                    const Img = new FabricImage(file, img)
                    canvasObj?.add(Img);
                    canvasObj?.renderAll()

                }
            }
        }
    }
    return canvasObj
}