import API_URL from './config';
import toJSON from './utils';

export const search = (query, type) =>
  fetch(`${API_URL}/search?q=${query}&type=${type}`,  {
    method: 'GET',
 headers: {
     Accept: 'application/json',
     Authorization : 'Bearer ' + 'BQAQvthwoqjoedD1RJet9XVHWizXJGU7eqeCXTdF0nc4eviFji9YhX8lqojRsKDEXUDC3_y2199Tc14EG1FKGPoQneQ8Pd2DpF9jpTZQkZLyj0uwfQIXa2ulXXd3u4rI1Z5qVikWahuVdkGybxE'
 }})
    .then(toJSON);

export const searchArtists = query =>
  search(query, 'artist');

export const searchAlbums = query =>
  search(query, 'album');

export const searchTracks = query =>
  search(query, 'track');

export const searchPlaylists = query =>
  search(query, 'playlist');

