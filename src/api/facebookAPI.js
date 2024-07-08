// src/api/facebookAPI.js
import config from '../config';

export const fetchInterests = async (keyword) => {
  const accessToken = config.facebookAccessToken;
  const url = `https://graph.facebook.com/search?type=adinterest&q=[${keyword}]&limit=10000&locale=en_US&access_token=${accessToken}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.data; // Adjust this if the structure of the response data is different
};