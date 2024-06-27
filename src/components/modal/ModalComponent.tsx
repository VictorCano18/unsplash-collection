import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import SearchBar from '../searchBar/SearchBar';
import * as React from 'react';
import Plus from '../../assets/Plus.svg'
import axios from 'axios';
import './ModalComponent.scss'

interface Props {
    open: boolean,
    handleClose: (open: boolean) => void;
}

export default function ModalComponent(props: Props) {

    const [collections, setCollections] = React.useState<any[]>([])
    const [hoverItems, setHoverItems] = React.useState<{ [key: string]: boolean }>({});
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState<any>({})

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        height: 600
    };

    const handleSearchChange = (newQuery: string) => {
        setQuery(newQuery)
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.unsplash.com/search/collections?page=1&query=${query}`, {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_API_ACCESS_KEY}`
                }
            })
            if (!response || response.status !== 200) return
            setCollections(response.data.results)
            setResults(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const onHoverCollectionIn = (id: string) => {
        setHoverItems(prev => ({ ...prev, [id]: true }));
    };

    const onHoverCollectionOut = (id: string) => {
        setHoverItems(prev => ({ ...prev, [id]: false }));
    };

    return (
        <section>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.open}>
                    <Box sx={style} className='rounded-md customWidthModal'>
                        <p className='text-xl font-bold mb-3'>Add to Collections</p>
                        <SearchBar onChange={handleSearchChange} onKeyDown={handleKeyDown} placeholder='' classNameProps="bg-white border-slate-100 shadow-md w-full h-16 p-5 rounded-md border-2 searchBarInputColor"/>
                        <div className='mt-4 text-sm ps-1'>{results.total || 0} results</div>
                        <div className='flex flex-col gap-4 mt-4 max-h-[400px] overflow-y-auto'>
                            {collections.map(collection => {
                                return (
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
                                                className="w-16 h-16"
                                            />
                                            <div>
                                                <p className="font-bold">{collection.title}</p>
                                                <p>{collection.total_photos} photos</p>
                                            </div>
                                        </div>
                                        {hoverItems[collection.id] && (
                                            <a
                                                className="flex gap-2 items-center cursor-pointer"
                                                onClick={() => console.log('add')}
                                            >
                                                <img src={Plus} alt="add" className="w-4" />
                                                <p className='text-sm'>Add to collection</p>
                                            </a>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </section>
    );
}
