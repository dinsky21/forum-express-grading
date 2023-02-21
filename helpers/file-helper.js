const fs = require('fs')
const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID


const localFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)

    const fileName = `upload/${file.originalname}`
    return fs.promises.readFile(file.path)
      .then(data => fs.promises.writeFile(fileName, data))
      .then(() => resolve(`/${fileName}`))
      .catch(err => reject(err))
  })
}

const imgurFileHandler = file => {
	return new Promise((resolve, reject) => {
		if(!file) return resolve(null)
		return imgur.uploadFile(file.path).then(img => {
			resolve(img?.link || null)  //檢查img是否存在，有的話使用img.link, 沒有則null
		})
		.catch(err=> reject(err))
	})
}

module.exports = {
	imgurFileHandler,
  localFileHandler
}
