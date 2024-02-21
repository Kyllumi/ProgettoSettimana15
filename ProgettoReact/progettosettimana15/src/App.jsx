import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AuthorPage from './pages/AuthorPage';
import MyNavbar from './components/MyNavbar';
import AuthorDetailPage from './pages/AuthorDetailPage';
import MyFooter from './components/MyFooter';

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<DetailPage />} />
          <Route path="/author" element={<AuthorPage />} />
          <Route path="/author/:id" element={<AuthorDetailPage />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
