export type Data = Record<string, any>
export type OnChangeInput = (newPath: string) => void
export type Property = keyof Data
export type PropertyValue = Data[Property]