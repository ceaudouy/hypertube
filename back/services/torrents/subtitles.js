import OS from 'opensubtitles-api'
import path from 'path'
import axios from 'axios'
import fs from 'fs'
import srt2vtt from 'srt-to-vtt'

const OpenSubtitles = new OS({
  useragent: 'Admin',
  username: '',
  password: '',
  ssl: true,
})

var lg = {
  en: 'eng',
  fr: 'fre',
}

export const subtitles = async (imdbid, languageMovie) => {
  try {
    const language = lg[language]
    if (!language) console.error('Language not found !')
    if (!imdbid) console.error('ImdbId not found !')
    const subtitles = await OpenSubtitles.search({
      sublanguageid: ['fre', 'eng'].join(),
      extensions: 'srt',
      imdbid: imdbid,
    })
    if (subtitles[languageMovie]) {
      const pathname = path.join('uploads', 'subtitles')
      const filename = languageMovie + '.' + imdbid + '.vtt'
      const moviePath = path.join(pathname, filename)
      const result = await axios({
        method: 'get',
        url: subtitles[languageMovie].url,
        responseType: 'stream',
      })
      result.data.pipe(srt2vtt()).pipe(fs.createWriteStream(moviePath))
    }
  } catch {
    console.error('Subtitles not found !')
  }
}
