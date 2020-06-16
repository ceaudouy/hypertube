import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, 'public/images')
  },
  filename: (req, file, next) => {
    let filetype = undefined
    switch (file.mimetype) {
      case 'image/gif':
        filetype = 'gif'
        break
      case 'image/png':
        filetype = 'png'
        break
      case 'image/jpeg':
        filetype = 'jpg'
        break
      default:
        next('Unknown file type', null)
        break
    }
    next(null, `img-${Date.now()}.${filetype}`)
  },
})

export default multer({ storage }).single('file')
