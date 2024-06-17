import * as React from 'react'
import { ImageContextType, IImage } from '../../@types/image';
import { ImageContext } from '../../context/imageContext';

const Image: React.FC = () => {
    const { image } = React.useContext(ImageContext) as ImageContextType;
    console.log(image)
    return <div>{image[0].imageObj?.alt_description || 'hola'}</div>
}

export default Image;