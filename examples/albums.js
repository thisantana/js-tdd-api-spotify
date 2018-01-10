global.fetch = require('node-fetch');

import { searchAlbums } from '../src/search';

const albums = searchAlbums('Kiss');

albums.then(data =>  data.albums.items.map(item =>console.log(item.name)));
