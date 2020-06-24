import TorrentSearchApi from 'torrent-search-api'
import parseTorrentName from 'parse-torrent-name'
import axios from 'axios'
import { writeFile } from 'fs'

// import { Movie } from 'models'

const OMDB_URL = 'http://www.omdbapi.com/?apikey=c62f0c6d'

TorrentSearchApi.enablePublicProviders()
TorrentSearchApi.disableProvider('1337x')
TorrentSearchApi.disableProvider('Torrent9')
TorrentSearchApi.enableProvider('YggTorrent', 'guillaumerx', 'Hypertube2020')

const getInfos = async title => {
  return axios(`${OMDB_URL}&t=${title}`)
    .then(res => (res.data.Response == 'False' ? undefined : res.data))
    .catch(() => console.log(`Can't get infos for ${title}`))
}

const sanitize = str => {
  str = str.replace(
    new RegExp(
      'TRUE|FRENCH|WEBRIP|2020|HDLight|MULTI|VFF|Multi|Web-RIP|1080',
      'gi'
    ),
    ''
  )
  return str.trim()
}

export const fetchMovies = async () => {
  const torrents = await TorrentSearchApi.search('1080', 'Movies')
  torrents.map((torrent, index) => {
    if (torrent.magnet || torrent.link) {
      let result = parseTorrentName(torrent.title)
      torrent.title = sanitize(result.title)
      if (torrent.id) delete torrent.id
      delete torrent.desc
      delete torrent.size
    } else torrents.slice(index, 1)
  })
  for (let torrent of torrents) {
    const infos = await getInfos(torrent.title)
    if (infos) {
      delete infos.Response
      delete infos.Title
      Object.keys(infos).map(key => {
        torrent[key] = infos[key]
      })
    } else torrents.splice(torrents.indexOf(torrent), 1)
  }
  writeFile('movies.js', JSON.stringify(torrents), err => {
    if (err) console.log('there was an error writing file')
    else console.log('Succesfully written file')
  })
  // Movie.bulkCreate(torrents)
}

fetchMovies()
