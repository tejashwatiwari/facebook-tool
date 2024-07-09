// src/SearchForm.js
import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = '6LeScgsqAAAAAAvIv4zdQhLBAG5tAVt4ljoJB36r';

const SearchForm = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const recaptchaRef = useRef();
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (captchaVerified) {
        onSearch(keyword);
      } else {
        alert('Please complete the CAPTCHA verification.');
      }
    };
  
    const handleKeywordChange = (e) => {
      setKeyword(e.target.value);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaVerified(false);
      }
    };
  
    const onCaptchaChange = (value) => {
      setCaptchaVerified(!!value);
    };
  
    return (
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Enter a keyword"
          className="search-input"
        />
        <ReCAPTCHA ref={recaptchaRef} sitekey={SITE_KEY} onChange={onCaptchaChange} />
        <button type="submit" className="search-button" disabled={!captchaVerified}>
          Search
        </button>
      </form>
    );
  };
  
  export default SearchForm;