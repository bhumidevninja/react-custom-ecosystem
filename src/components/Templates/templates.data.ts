import bg1 from '../../assets/background/bg1.jpeg'
import bg2 from '../../assets/background/bg2.jpeg'
import bg3 from '../../assets/background/bg3.jpeg'
import custom from '../../assets/background/custom.png'

import { ITemplate } from './templates.types'
import { ETemplateTypes } from '../../enums/templates.enum'

export const templates: ITemplate[] = [
    {
        id: '1',
        name: 'Flowers Frame',
        category: ETemplateTypes.Birthday,
        backgroundImage: bg1,
        thumbnailUrl: bg1,
        texts: [
            {
                left: 100,
                top: 280,
                fontSize: 22,
                fontFamily: "Cambria",
                fill: "#000",
                fontStyle: "italic",
                width: 290,
                opacity: 1,
                textAlign: "center",
                title: 'Happy Birthday'
            }
        ]
    },
    {
        id: '2',
        name: 'Spring leaves',
        category: ETemplateTypes.Birthday,
        backgroundImage: bg2,
        thumbnailUrl: bg2,
        images: [
            {
                src: bg3,
                left: 150,
                top: 100,
            }
        ]
    },
    {
        id: '3',
        name: 'Wedding Ganesha',
        category: ETemplateTypes.Wedding,
        backgroundImage: bg3,
        thumbnailUrl: bg3,
    },
    {
        id: '4',
        name: 'Custom',
        category: ETemplateTypes.Custom,
        thumbnailUrl: custom,
    }
]