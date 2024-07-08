import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/Searchbar';

const Home = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = (e) => {
      e.preventDefault();
      navigate(`/results?keyword=${keyword}`);
    };
  
    return (
      <div>
        <h1>Search Interests</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a keyword"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  };
  
  export default Home;