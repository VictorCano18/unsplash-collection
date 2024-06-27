import * as React from 'react'
import { ImageContextType } from '../../@types/image';
import { ImageContext } from '../../context/imageContext';
import moment from 'moment';
import axios from 'axios';
import ModalComponent from '../../components/modal/ModalComponent';
import DownArrow from '../../assets/down arrow.svg'
import Plus from '../../assets/Plus.svg'
import Remove from '../../assets/Remove.svg'

const Image: React.FC = () => {

    const [hoverItems, setHoverItems] = React.useState<{ [key: string]: boolean }>({});
    const [open, setOpen] = React.useState(false);
    const [collections, setCollections] = React.useState<any[]>([])
    const [currentImage, setCurrentImage] = React.useState<any>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    let { image } = React.useContext(ImageContext) as ImageContextType;    
    const getS3Image = async (imageUrl: string) => {
        try {
            const response = await axios.get(imageUrl, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${image[0].imageObj.slug}.jpg`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    }

    const getCollections = async () => {
        try {
            const { data } = await axios.get(`https://api.unsplash.com/collections?page=1`, {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_API_ACCESS_KEY}`
                }
            })
            const newArray = data.slice(0, 3)
            setCollections(newArray)
        } catch (error) {
            console.log(error)
        }
    }

    const onHoverCollectionIn = (id: string) => {
        setHoverItems(prev => ({ ...prev, [id]: true }));
    };

    const onHoverCollectionOut = (id: string) => {
        setHoverItems(prev => ({ ...prev, [id]: false }));
    };

    React.useEffect(() => {
        const savedImage = localStorage.getItem('current-image');
        if (image.length) {
            setCurrentImage(image[0]);
            localStorage.setItem('current-image', JSON.stringify(image[0]));
        } else if (savedImage) {
            setCurrentImage(JSON.parse(savedImage));
        }
    }, [image]);

    React.useEffect(() => {
        const callFunction = async () => {
            getCollections()
        }
        callFunction()
    }, [])

    return (
        <div className='flex flex-col lg:flex-row justify-center lg:pt-[4rem]'>
            <section className='flex justify-center m-4 mt-4 lg:mt-0 xl:m-0'>
                <img src={currentImage?.imageObj?.urls.regular} alt={currentImage?.imageObj?.alt_description} className='justify-center w-100 h-fit xl:w-[40rem] rounded-md' />
            </section>
            <section>
                <div className='flex justify-center align-center flex-col px-5 w-100 lg:w-[30rem] mt-5 lg:mt-0'>
                    <div className='flex mb-4 gap-2'>
                        <img src={currentImage?.imageObj?.user.profile_image.medium} alt='profile-image' className='rounded-full lg:w-[3rem] w-[5rem]' />
                        <p className='flex items-center justify-center font-bold'>{currentImage?.imageObj?.user.name}</p>
                    </div>
                    <p className='text-left mb-4'>Published on {moment(currentImage?.imageObj?.created_at).format('MMMM DD, YYYY')}</p>
                    <div className='flex sm:flex-row gap-4 mb-[2rem] flex-col'>
                        <a className='bg-[#E5E7EB] hover:bg-[#cecece] px-5 py-2 rounded-md cursor-pointer flex gap-2 font-bold w-fit' onClick={handleOpen}>
                            <img src={Plus} alt="plus" />Add to Collection
                        </a>
                        <a className='bg-[#E5E7EB] hover:bg-[#cecece] px-5 py-2 rounded-md cursor-pointer flex gap-2 font-bold w-fit' onClick={() => getS3Image(currentImage?.imageObj.urls.small_s3)}>
                            <img src={DownArrow} alt="down-arrow" />Download
                        </a>
                    </div>
                    <div className='text-left'>
                        <p className='text-2xl font-bold mb-2'>Collections</p>
                        <div className='flex flex-col gap-4'>
                            {collections.map(collection => (
                                <div
                                    className="flex gap-3 align-center hover:bg-[#E5E7EBCC] p-2 rounded-md justify-between"
                                    key={collection.cover_photo.id}
                                    onMouseEnter={() => onHoverCollectionIn(collection.id)}
                                    onMouseLeave={() => onHoverCollectionOut(collection.id)}
                                >
                                    <div className="flex gap-3">
                                        <img
                                            src={collection.cover_photo.urls.raw}
                                            alt={collection.cover_photo.slug}
                                            className="w-16 h-16 rounded-md"
                                        />
                                        <div>
                                            <p className="font-bold">{collection.title}</p>
                                            <p>{collection.total_photos} photos</p>
                                        </div>
                                    </div>
                                    {hoverItems[collection.id] && (
                                        <a
                                            className="flex gap-2 items-center cursor-pointer"
                                            onClick={() => console.log('remove')}
                                        >
                                            <img src={Remove} alt="remove" className="w-1/4" />
                                            <p className='text-sm'>Remove</p>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <ModalComponent open={open} handleClose={handleClose} />
            </section>
        </div>
    );
}

export default Image;