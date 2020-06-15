import axios from 'axios'
import cheerio from 'cheerio'
import ptn from 'parse-torrent-name'
import { Client } from 'imdb-api'

const cli = new Client({ apiKey: 'c62f0c6d' })

export const pbSearch = async proxyUrl => {
  let result = []
  const url = `${proxyUrl}/top/207`
  const { data } = await axios(url)
  const $ = cheerio.load(data)
  const list = $('#searchResult > tbody > tr')
  list.each((i, el) => {
    let url = $(el).find('td').eq(1).find('.detName a').attr('href')
    let title = $(el).find('td').eq(1).find('.detName a').text()
    let magnet = $(el).find('td').eq(1).find('.detName + a').attr('href')
    let se = parseInt($(el).find('td').eq(2).text())
    let le = parseInt($(el).find('td').eq(3).text())
    result.push({
      title,
      se,
      le,
      magnet,
      url: `${proxyUrl}${url}`,
      provider: 'The Pirate Bay',
    })
  })
  return result
}

export const cleanList = result => {
  const regexp = new RegExp('2020', 'gi')
  result.map(movie => {
    const infos = ptn(movie.title)
    movie.title = infos.title
    movie.title = movie.title.replace(regexp, '')
    movie.title = movie.title.trim()
    movie.resolution = infos.resolution
  })
}

export const fetchInfos = async result => {
  for (let i in result) {
    try {
      const infos = await cli.get({ name: result[i].title })
      Object.keys(infos).map(key => {
        result[i][key] = infos[key]
      })
    } catch (err) {
      console.log(`Could not find infos for ${result[i].title}, removing it`)
      result.splice(i, 1)
    }
  }
  return result
}
