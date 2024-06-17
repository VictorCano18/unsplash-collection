export interface IImage {
    imageObj: {
        alt_description: string
    }
}

export type ImageContextType = {
    image: IImage[];
    saveImage: (image: IImage) => void;
}