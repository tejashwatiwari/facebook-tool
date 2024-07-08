import React, { useState } from 'react';
import { fetchInterests } from './api/facebookAPI';
import { saveAs } from 'file-saver';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
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

  const downloadCSV = () => {
    const csv = interests.map(interest => ({
      "Interest Name": interest.name,
      "Audience Size": interest.audience_size_upper_bound,
      "Topic": interest.topic,
      "Category": interest.disambiguation_category,
      "Path": interest.path.join(' > ')
    }));

    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Interest Name, Audience Size, Topic, Category, Path", ...csv.map(item => Object.values(item).join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'interests.csv');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>InterestExplorer</h1>
        <p>
          Free Facebook interest targeting tool reveals 1000's of hidden
          interests you can target without your competition knowing.
        </p>
      </header>
      <main className="main">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a keyword"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">Error fetching data: {error.message}</div>}
        {interests.length > 0 && (
          <>
            <div className="actions">
              <button className="csv-button" onClick={downloadCSV}>
                Download as CSV
              </button>
              <CopyToClipboard text={interests.map(interest => interest.name).join('\n')}>
                <button className="clipboard-button">
                  Copy to Clipboard
                </button>
              </CopyToClipboard>
            </div>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Interest Name</th>
                  <th>Audience Size</th>
                  <th>Topic</th>
                  <th>Category</th>
                  <th>Path</th>
                </tr>
              </thead>
              <tbody>
                {interests.map((interest, index) => (
                  <tr key={index}>
                    <td>{interest.name}</td>
                    <td>{interest.audience_size_upper_bound}</td>
                    <td>{interest.topic}</td>
                    <td>{interest.disambiguation_category}</td>
                    <td>{interest.path.join(' > ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}

export default App;