import SearchBar from '../../components/searchBar/SearchBar'
import './Home.scss'
import { useState } from 'react'
import GradientBG from '../../assets/gradiend-bg@2x.png'
import axios from 'axios'

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
    const [query, setQuery] = useState('');
    const [enterKey, setEnterKey] = useState(false)
    const [results, setResults] = useState<Results | null>(null);

    const handleSearchChange = (newQuery: string) => {
        setQuery(newQuery);
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
                {
                    results?.results
                    &&
                    <div className='relative grid grid-rows-2 grid-flow-col gap-5 justify-center p-5'>
                        {results.results.map(image => (
                            <img key={image.id} src={image.urls.regular} alt={image.alt_description} className="w-full object-cover" />
                        ))}
                    </div>
                }
            </section>
        </div>
    )
}

export default Home