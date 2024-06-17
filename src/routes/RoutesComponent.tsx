import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Image from '../pages/image/Image'
import Header from '../components/header/Header'

const RoutesComponent = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/image" element={<Image />} />
            </Routes>
        </Router>
    )
}

export default RoutesComponent