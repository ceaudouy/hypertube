import { pbSearch, cleanList, fetchInfos } from './torrents/torrentsProviders'
import { writeFile } from 'fs'

const test = async () => {
  let result = await pbSearch('https://www1.thepiratebay3.to')
  cleanList(result)
  result = await fetchInfos(result)
  writeFile('movie.json', JSON.stringify(result), err => {
    if (err) console.log('bruh')
    else console.log('YEAH')
  })
}

test()
