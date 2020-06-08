import TorrentSearchApi from 'torrent-search-api';
import parseTorrentName from 'parse-torrent-name';

import { Movie } from 'models';

TorrentSearchApi.enablePublicProviders();
TorrentSearchApi.enableProvider('YggTorrent', 'guillaumerx', 'Hypertube2020');

const sanitize = (str) => {
    str = str.replace(new RegExp("TRUE|FRENCH|WEBRIP|2020|HDLight", 'gi'), '');
    return str.trim();
}

export const fetchMovies = async (movie) => {
  try {
    const torrents = await TorrentSearchApi.search(movie, 'Movies');
    torrents.map(torrent => {
      let result = parseTorrentName(torrent.title);
      torrent.title = sanitize(result.title);
    })
    console.log(torrents);
  } catch (err) {
    throw new Error('Error getting torrents');
  }
}