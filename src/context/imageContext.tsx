import * as React from 'react'
import { ImageContextType, IImage } from '../@types/image'

export const ImageContext = React.createContext<ImageContextType | null>(null);

const ImageProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [image, setImage] = React.useState<IImage[]>([])

    const saveImage = (img: IImage) => {
        const newImage: IImage = {
          imageObj: img.imageObj
        }
        setImage([...image, newImage])
    }

    return <ImageContext.Provider value={{ image, saveImage }}>{children}</ImageContext.Provider>;
}

export default ImageProvider;