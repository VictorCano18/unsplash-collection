import SearchBar from '../../components/searchBar/SearchBar'
import './Home.scss'
import { useState } from 'react'
import GradientBG from '../../assets/gradiend-bg@2x.png'

const Home = () => {

    const [query, setQuery] = useState('');
    const [enterKey, setEnterKey] = useState(false)

    const handleSearchChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    const handleSearch = () => {
        // add api call with query...
        console.log(query)
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setEnterKey(true)
            handleSearch();
        }
    };
    return (
        <div className={`h-full w-full ${!enterKey ? 'absoluteScreen backgroundImage' : 'relative'}`}>
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
        </div>
    )
}

export default Home