const Crawler = require('crawler');
const config = require('./config.json');

function crawling(start, end) {
	const result = [];
	return loop(start, end, result).then(() => {
		return result;
	})
}

function loop(idx, end, result) {
	if (idx > end) {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(`Finished crawling\n`);
		return Promise.resolve();
	} else {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(`Proceeded crawling of round ${idx} [${Math.round(idx / end * 100)}%]`);
		return crawlingLotto(idx).then(res => {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			process.stdout.write(`Succeeded crawling of round ${idx} [${Math.round(idx / end * 100)}%]`);
			result.push(res);
			return loop(++idx, end, result);
		});
	}
}

function crawlingLotto(round) {
	return new Promise((resolve, reject) => {
		const crawler = new Crawler({
			maxConnections: 1,
			timeout: 300
		});

		crawler.direct({
			url: `${config.url}${round}`,
			callback: (err, res) => {
				if (err) {
					reject(err);
				} else {
					const $ = res.$;

					const lottoNumbers = getLottoNumbers($);
					const rewards = getReward($);

					resolve({round, lottoNumbers, rewards});
				}
			}
		})
	});
}

function getLottoNumbers($) {
	const tempNumbers = $('span.ball_645');
	const numbers = [];
	for (let i = 0; i < tempNumbers.length; i++) {
		numbers.push($(tempNumbers[i]).text());
	}
	return numbers;
}

function getReward($) {
	const tempTable = $('table.tbl_data tbody tr');
	const columns = ['place', 'totalAmount', 'winners', 'onceAmount'];
	const rewards = [];

	for (let i = 0; i < tempTable.length; i++) {
		const cell = $(tempTable[i]).find($('td'));
		const reward = {};
		for (let j = 0; j < 4; j++) {
			reward[columns[j]] = $(cell[j]).text();
			// console.log($(cell[j]).text());
		}
		rewards.push(reward);
	}
	return rewards;
}

module.exports = crawling;