// src/components/InterestRow.js
import React from 'react';

const InterestRow = ({ interest }) => {
    return (
      <tr>
        <td>{interest.name}</td>
        <td>{interest.audience_size}</td>
        <td>{interest.topic}</td>
        <td>{interest.search_term}</td>
      </tr>
    );
  };
  
  export default InterestRow;