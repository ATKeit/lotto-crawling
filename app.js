const crawling = require('./crawling');
const argv = require('yargs')
	.option('start', {
		alias: 's',
		type: 'num',
		description: 'Crawl start round'
	})
	.option('end', {
		alias: 'e',
		type: 'num',
		description: 'Crawl end round'
	})
	.default('s', 1)
	.default('e', 902)
	.argv;

if (argv.start > argv.end) {
	console.error(`Wrong arguments. start can't be greater than end`);
	process.exit();
} else {
	console.log(`Started crawl (${argv.start} - ${argv.end})`);
	/**
	 * result: {
	 *      round: number,                  // ex. 902
	 *      lottoNumbers: string[],         // ex. ['7', '19', '23', '24', '36', '39', '30]
	 *      rewards: {
	 *          place: string,              // ex. 3등
	 *          totalAmount: string,        // ex. 3,508,522,452원
	 *          winners: string,            // ex. 2,372
	 *          onceAmount: string          // ex. 1,479,141원
	 *      }[]
	 * }[]
	 */
	crawling(argv.start, argv.end).then((result) => {
		// Todo something
		process.exit();
	});
}