import torrentStream from 'torrent-stream'
import pump from 'pump'
import path from 'path'
import { lookup } from 'mime'
import ffmpeg from 'fluent-ffmpeg'
import { createReadStream, access, statSync } from 'fs'
import { F_OK } from 'constants'
import { opts, ErrorHandler } from 'middlewares'
import { Movie } from 'models'

const contentOpts = size => ({
  'Content-Length': size,
  'Cache-Control': 'no-store',
})

const convert = stream => {
  const command = ffmpeg(stream)
    .videoCodec('libvpx')
    .audioCodec('libvorbis')
    .format('webm')
    .audioBitrate(128)
    .videoBitrate(1024)
    .outputOptions([
      '-cpu-used 2',
      '-deadline realtime',
      '-error-resilient 1',
      '-threads 4',
    ])
    .on('start', cmd => console.log('Started conversion with :', cmd))
  return command
}

const download = (res, magnet) => {
  const torrent = torrentStream(magnet, opts)
  let selectedFile = undefined
  res.on('close', () => {
    console.log('Streaming closed')
    torrent.remove(true, () => {
      console.log('Engine cleared')
    })
    torrent.destroy()
  })
  torrent.on('ready', () => {
    torrent.files.forEach(file => {
      if (lookup(file.name).split('/')[0] === 'video') {
        console.log(file.name)
        selectedFile = file
        file.select()
        streamTorrent(res, file, 0, file.length - 1, lookup(file.name))
      }
    })
  })
  torrent.on('download', () => {
    const percentage = (torrent.swarm.downloaded / selectedFile.length) * 100
    console.log(`Downloaded ${percentage}% of the movie`)
  })
  torrent.on('idle', async () => {
    console.log(`Downloaded file ${selectedFile.name}}`)

    await Movie.addFile(magnet, selectedFile.path)
  })
}

const streamTorrent = (res, file, start, end, mime) => {
  res.writeHead(200, contentOpts(file.length))
  const stream = file.createReadStream({ start: start, end: end })
  if (mime === 'video/mp4' || mime === 'video/ogg' || mime === 'video/webm')
    pump(stream, res)
  else pump(convert(stream), res)
  console.log(`Started streaming torrent ${file.name}`)
}

const streamFile = (res, path, start, size, mime) => {
  res.writeHead(200, contentOpts(size))
  const stream = createReadStream(path, { start: start, end: size - 1 })
  if (mime === 'video/mp4' || mime === 'video/ogg' || mime === 'video/webm')
    pump(stream, res)
  else pump(convert(stream), res)
  console.log(`Started streaming file`)
}

const stream = async (req, res, next) => {
  try {
    const { movie } = req.query
    const infos = await Movie.get(movie)
    if (!infos) throw new ErrorHandler(400, 'Invalide movie id')
    if (infos.file) {
      access(`public/movies/${infos.file}`, F_OK, err => {
        if (err) {
          console.log(err)
          download(res, infos.magnet)
        } else {
          const stats = statSync(`public/movies/${infos.file}`)
          streamFile(
            res,
            `public/movies/${infos.file}`,
            0,
            stats['size'],
            lookup(`public/movies/${infos.file}`)
          )
        }
      })
    } else download(res, infos.magnet)
  } catch (err) {
    next(err)
  }
}

export default stream
