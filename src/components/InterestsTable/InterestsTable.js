// src/components/InterestsTable.js
import React from 'react';
import InterestRow from './InterestRow';

const InterestsTable = ({ interests }) => {
    if (!interests || interests.length === 0) {
      return <div>No interests found.</div>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Interest Name</th>
            <th>Audience Size</th>
            <th>Topic</th>
            <th>Search Term</th>
          </tr>
        </thead>
        <tbody>
          {interests.map((interest, index) => (
            <InterestRow key={index} interest={interest} />
          ))}
        </tbody>
      </table>
    );
  };
  
  export default InterestsTable;