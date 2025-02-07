import { useStore } from "../../store/store"
import { templates } from "./templates.data"
import { ITemplate } from "./templates.types"

interface ITemplateProps {
    handleTemplateClick: () => void
}

const Template = ({ handleTemplateClick }: ITemplateProps) => {
    const { setSelectedTemplate } = useStore()

    const onClick = (template: ITemplate) => {
        setSelectedTemplate(template)
        handleTemplateClick()
    }

    return (
        <div className="flex flex-col p-5 gap-2">
            <div>
                Explore the existing templates for making greeting card or build your own with custom
            </div>
            <div id="template-container" className="flex wrap gap-4">
                {templates.map((template) => (
                    <div className="cursor-pointer" id={`template-${template.id}`} key={`template-${template.id}`} onClick={() => onClick(template)}>
                        {template.thumbnailUrl && <img src={template.thumbnailUrl} className="h-[350px] w-[290px] rounded-md" />}
                        <h4 className="p-1 mx-2">{template.name}</h4>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Template