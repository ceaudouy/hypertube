// import axios from 'axios'
// import cheerio from 'cheerio'
// import ptn from 'parse-torrent-name'

// const provider = 'yts.ws';

// axios(url)
// 	.then(response => {
// 		const html = response.data;
// 		const $ = cheerio.load(html);
// 		const product_row = $('.product_row > tr');
// 		let result = []
// 		product_row.each(function () {
// 			let title = $(el).find('td').eq(1).find('.detName a').text()

// 			const rank = $(this).find('.rank > strong').text();
// 			const playerName = $(this).find('.playerName > strong').text();
// 			const nationality = $(this).find('.playerCountry').text();
// 			const goals = $(this).find('.mainStat').text();

// 			result.push({
// 				title,
// 				se,
// 				le,
// 				magnet,
// 				url: `${url}${url}`,
// 				provider: 'YTS',
// 			})
// 		})
// 	})

// 	export const searchMovieYTS = async (provider) => {
//         const result = []
//         const url = `https://${provider}/top/201`

//         f.fetchUrl(url, (err, meta, body) => {
//             const $ = cheerio.load(body.toString())

//             if (err)
//                 return reject(err)

//             $('#searchResult tr')
//                 .each((i, elem) => {
//                     let url = $(elem).find('td').eq(1).find('.detName a').attr('href')
//                     let title = $(elem).find('td').eq(1).find('.detName a').text()
//                     let magnet = $(elem).find('td').eq(1).find('.detName + a').attr('href')
//                     let seeders = parseInt($(elem).find('td').eq(2).text())
//                     let leechers = parseInt($(elem).find('td').eq(3).text())

//                     if (magnet && title && url)
//                         list.push(torrent.toJSON({ magnets: [ { leechers, seeders, url: magnet } ], provider, title, torrent: [] }))
//                 })
//             return resolve(list)
//         })

// // export const searchMovie = async url => {
// // 	let result = []
// // 	const url = `${url}`
// // 	const { data } = await axios(url)
// // 	const $ = cheerio.load(data)
// // 	const list = $(`.product_row > tbody > tr`)
// // 	list.each((i, el) => {
//     let title = $(el).find('td').eq(1).find('.detName a').text()
//     let magnet = $(el).find('td').eq(1).find('.detName + a').attr('href')
// 		let seed = parseInt($(el).find('td').eq(2).text())
// 		result.push({
// 			title,
// 			magnet,
// 			se,
// 			provider: 'YTS',
// 		})
// 	})
// // 	return result
// // }

// title
// magnet dl torrent lien pour chopper torent
// seed tout les gens qui partagenet fichier ( plus il y en a plus ca va se telecharger vite)

// export const cleanList = result => {
// 	const regexp = new RegExp('2020', 'gi')
// 	result.map(movie => {
// 		const infos = ptn(movie.title)
// 		movie.title = infos.title
// 		movie.title = movie.title.replace(regexp, '')
// 		movie.title = movie.title.trim()
// 		movie.resolution = infos.resolution
// 	})
// }

// export const fetchInfos = async result => {
// 	for (let i in result) {
// 		try {
// 			const infos = await cli.get({ name: result[i].title })
// 			Object.keys(infos).map(key => {
// 				result[i][key] = infos[key]
// 			})
// 		} catch (err) {
// 			console.log(`Could not find infos for ${result[i].title}, removing it`)
// 			result.splice(i, 1)
// 		}
// 	}
// 	return result
// }

// url de base de proxy de pirate bay
// /top/207 pour avoir les 100 torrent les plus telecharge
// data res.data
// cheeiro load = parser le html
// list =
