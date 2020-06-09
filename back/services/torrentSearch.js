import TorrentSearchApi from 'torrent-search-api'
import parseTorrentName from 'parse-torrent-name'

TorrentSearchApi.enablePublicProviders()
TorrentSearchApi.enableProvider('YggTorrent', 'guillaumerx', 'Hypertube2020')

const sanitize = str => {
  str = str.replace(new RegExp('TRUE|FRENCH|WEBRIP|2020|HDLight', 'gi'), '')
  return str.trim()
}

export const fetchMovies = async () => {
  const torrents = await TorrentSearchApi.search('1080', 'Movies')
  torrents.map((torrent, index) => {
    if (torrent.magnet || torrent.link) {
      let result = parseTorrentName(torrent.title)
      torrent.title = sanitize(result.title)
    } else torrents.slice(index, 1)
  })
  console.log(torrents)
}
