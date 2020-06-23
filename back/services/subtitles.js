import OS from 'opensubtitles-api'
import axios from 'axios'
import srt2vtt from 'srt-to-vtt'
import { createWriteStream } from 'fs'

const OpenSubtitles = new OS({
  useragent: 'Hypertube',
  username: process.env.OSB_USR,
  password: process.env.OSB_PWD,
  ssl: true,
})

const subtitles = async (id, lang) => {
  const subtitles = await OpenSubtitles.search({
    sublanguageid: ['fre', 'eng'].join(),
    imdbid: id,
  })
  if (subtitles[lang]) {
    const file = lang + '-' + id + '.vtt'
    const { data } = await axios({
      method: 'get',
      url: subtitles[lang].url,
      responseType: 'stream',
    })
    await data.pipe(srt2vtt()).pipe(createWriteStream(`public/subs/${file}`))
    return { url: `subs/${file}` }
  }
}

export default subtitles
