import SearchBar from '../../components/searchBar/SearchBar'
import './Home.scss'
import { useState } from 'react'
import GradientBG from '../../assets/gradiend-bg@2x.png'
import axios from 'axios'
import * as React from 'react'
import { ImageContext } from '../../context/imageContext'
import { ImageContextType, IImage } from '../../@types/image'
import { Link } from 'react-router-dom'
interface Image {
    id: string;
    urls: {
        regular: string;
    };
    alt_description: string;
}

interface Results {
    results: Image[];
}

const Home: React.FC = () => {
    const context = React.useContext(ImageContext)
    if (!context) {
        // Handle the case where context is null (e.g., by returning an error or fallback UI)
        throw new Error("ImageContext must be used within an ImageProvider");
    }
    const { saveImage } = context as ImageContextType;
    const [query, setQuery] = useState('');
    const [enterKey, setEnterKey] = useState(false)
    const [results, setResults] = useState<Results | null>(null);

    const handleSearchChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    const onClickImage = (image: Image) => {
        saveImage({ imageObj: { alt_description: image.alt_description } });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_API_ACCESS_KEY}`
                }
            })
            if (!response || response.status !== 200) return
            setResults(response.data)
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
                <SearchBar onChange={handleSearchChange} onKeyDown={handleKeyDown} />
            </section>
            <section>
                {results?.results && (
                    <Link to="/image">
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 p-5 auto-rows-[300px] m-auto	max-w-[1245px]">
                            {results.results.map((image) => (
                                <div key={image.id} className="relative w-full h-full" onClick={() => onClickImage(image)}>
                                    <img src={image.urls.regular} alt={image.alt_description} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </Link>
                )}
            </section>
        </div>
    )
}

export default Home