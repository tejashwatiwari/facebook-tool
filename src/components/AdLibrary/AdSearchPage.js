import React, { useState } from 'react';
import axios from 'axios';

/**
 * Renders a page for searching ads on Facebook. Allows the user to enter a search term,
 * select a country, and submit the form to search for ads. Displays a loading message
 * while the search is in progress, and displays an error message if there was an error
 * fetching the ads. Displays the search results in a table if there are any ads that
 * match the search criteria.
 *
 * @return {JSX.Element} The JSX element representing the AdSearchPage component.
 */
const AdSearchPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('US'); // Default country to US

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://graph.facebook.com/v14.0/ads_archive', {
        params: {
          access_token: 'EAAFRZAPoKr08BOz0bS0MiNDkqNRZANoQSWoUxdCPIvO79JYGO24twimLejSIaTMESWpNXsbRDF6PMMkTetP97RK7Htec1lEghI7zYZBI6E8CY1hZCFMF1nEb6h9G3T1FTpHMID3onLEG6prrLcHPTzaKaHEk24fWdeaISXz9Gh17okwJSZA24DflTMISDThGpkIdZAhkohZABm7f7wwzzZBcs7PcXtTZCG0cQalJuVengMGsZD', // Replace with your actual access token
          fields: 'page_name,ad_creative_body,ad_delivery_start_time', // Example fields
          search_terms: searchTerm,
          ad_reached_countries: country,
          ad_active_status: 'ALL', // Example status
          limit: 20,
        },
      });
      setAds(response.data.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Ad Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="IN">India</option>
        </select>
        <div
          className="g-recaptcha"
          data-sitekey="EAAFRZAPoKr08BOz0bS0MiNDkqNRZANoQSWoUxdCPIvO79JYGO24twimLejSIaTMESWpNXsbRDF6PMMkTetP97RK7Htec1lEghI7zYZBI6E8CY1hZCFMF1nEb6h9G3T1FTpHMID3onLEG6prrLcHPTzaKaHEk24fWdeaISXz9Gh17okwJSZA24DflTMISDThGpkIdZAhkohZABm7f7wwzzZBcs7PcXtTZCG0cQalJuVengMGsZD"
          data-callback="onRecaptchaSuccess"
        ></div>
        <button type="submit" disabled={!searchTerm}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {ads.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Page Name</th>
              <th>Ad Creative</th>
              <th>Ad Start Time</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td>{ad.page_name}</td>
                <td>{ad.ad_creative_body}</td>
                <td>{new Date(ad.ad_delivery_start_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdSearchPage;
