import SearchBar from '../../components/searchBar/SearchBar'
import './Home.scss'
import { useState } from 'react'
import GradientBG from '../../assets/gradiend-bg@2x.png'
import axios from 'axios'
import * as React from 'react'
import { ImageContext } from '../../context/imageContext'
import { ImageContextType } from '../../@types/image'
import { Link } from 'react-router-dom'
interface Image {
    id: string;
    urls: {
        regular: string;
        small_s3: string;
    };
    alt_description: string;
    user: {
        name: string;
        profile_image: {
            medium: string;
        }
    },
    created_at: string;
    slug: string;
}

type ChunkedResults = Image[][];


const Home: React.FC = () => {
    const context = React.useContext(ImageContext)
    if (!context) {
        // Handle the case where context is null (e.g., by returning an error or fallback UI)
        throw new Error("ImageContext must be used within an ImageProvider");
    }
    const { saveImage } = context as ImageContextType;
    const [query, setQuery] = useState('');
    const [enterKey, setEnterKey] = useState(false)
    const [results, setResults] = useState<ChunkedResults>([]);

    const handleSearchChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    const onClickImage = (image: Image) => {
        saveImage({
            imageObj: {
                alt_description: image.alt_description,
                urls: { regular: image.urls.regular, small_s3: image.urls.small_s3 },
                user: {
                    name: image.user.name,
                    profile_image: {
                        medium: image.user.profile_image.medium
                    }
                },
                created_at: image.created_at,
                slug: image.slug
            }
        });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_API_ACCESS_KEY}`
                }
            })
            if (!response || response.status !== 200) return
            response.data.results = response.data.results.slice(0, 8)
            const chunkSize = 3
            const chunkResult: ChunkedResults = []
            for (let i = 0; i < response.data?.results?.length; i += chunkSize) {
                const chunk = response.data.results.slice(i, i + chunkSize);
                chunkResult.push(chunk)
            }
            console.log(chunkResult)
            setResults(chunkResult)
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setEnterKey(true)
            handleSearch();
        }
    };

    return (
        <div className={`w-full ${!enterKey ? 'h-full absoluteScreen backgroundImage' : 'relative'}`}>
            {enterKey && <section>
                <div>
                    <img className="w-screen h-28" src={GradientBG} alt='bg-gradient' />
                </div>
            </section>}
            <section className={`homeCustomWidth ${enterKey && 'homeCustomWhenClick'}`}>
                {!enterKey &&
                    <>
                        <div className="text-4xl pb-2 font-semibold">Search</div>
                        <div className="text-base font-light pb-4">Searching high-resolution images from Unsplash</div>
                    </>}
                <SearchBar onChange={handleSearchChange} onKeyDown={handleKeyDown} placeholder="Enter your keywords..." classNameProps="bg-white border-slate-100 shadow-md md:w-full w-9/12 h-16 p-5 rounded-md border-2 searchBarInputColor"/>
            </section>
            <section>
                {results && (
                    <div className="grid gap-[1.5rem] justify-center lg:grid-cols-[repeat(3,_minmax(350px,_min-content))] md:grid-cols-[repeat(2,_minmax(350px,_min-content))] sm:grid-cols-[repeat(1,_minmax(350px,_min-content))] ">
                        {results.map((chunk: Image[], index: number) => (
                            <div key={index} className='grid grid-cols-[minmax(350px, min-content)] gap-[1.5rem] h-fit rounded-[8px] sm:px-0 px-3'>
                                {chunk.map((image: Image) => (
                                    <Link to="/image" key={image.id}>
                                        <div key={image.id} className="relative w-full h-full" onClick={() => onClickImage(image)}>
                                            <img src={image.urls.regular} alt={image.alt_description} className="w-full h-full object-cover rounded-md" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home