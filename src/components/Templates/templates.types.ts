import { ImageProps, TextboxProps } from "fabric"
import { ETemplateTypes } from "../../enums/templates.enum"

export interface ITemplate {
    backgroundImage?: string
    thumbnailUrl?: string
    name: string
    id: string
    backgroundColor?: string
    texts?: IText[]
    category: ETemplateTypes
    images?: IImage[]
}

export type IText = {
    title: string
} & Partial<TextboxProps>

export type IImage = {
    src: string
} & Partial<ImageProps>
