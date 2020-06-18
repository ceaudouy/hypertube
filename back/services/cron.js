import { schedule } from 'node-cron'
import { Movie } from 'models'

const fileCleaner = () => {
  schedule('0 1 * * *', Movie.cleanup())
}

export default fileCleaner
