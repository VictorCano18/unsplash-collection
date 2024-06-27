export interface IImage {
    imageObj: {
        alt_description: string,
        urls: {
            regular: string,
            small_s3: string
        },
        user: {
            name: string,
            profile_image: {
                medium: string
            }
        },
        created_at: string,
        slug: string
    }
}

export type ImageContextType = {
    image: IImage[];
    saveImage: (image: IImage) => void;
}