import { pbSearch, cleanList, fetchInfos } from './torrentsProviders'
import { Movie } from 'models'

export const fetchTorrents = async () => {
  let result = await pbSearch('https://www1.thepiratebay3.to')
  cleanList(result)
  result = await fetchInfos(result)
  for (let i in result) {
    if (!result[i].imdbid) {
      result.splice(i, 1)
    }
  }
  await Movie.bulkCreate(result)
}

fetchTorrents()
