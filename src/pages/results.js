// src/pages/Results.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InterestsTable from '../components/InterestsTable/InterestsTable';
import { fetchInterests } from '../api/facebookAPI';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  
  const Results = () => {
    const query = useQuery();
    const keyword = query.get('keyword');
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getInterests = async () => {
        setLoading(true);
        try {
          const data = await fetchInterests(keyword);
          setInterests(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      if (keyword) {
        getInterests();
      }
    }, [keyword]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error fetching data: {error.message}</div>;
    }
  
    return (
      <div>
        <h1>Results for "{keyword}"</h1>
        <InterestsTable interests={interests} />
      </div>
    );
  };
  
  export default Results;