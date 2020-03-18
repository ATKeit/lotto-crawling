# Crawling Korea's Lotto Site

## Description: 
- Crawls Korea's lotto site with NodeJS and node-crawler
  - You can show site : [Link](https://dhlottery.co.kr)
  - Crawling URL : https://dhlottery.co.kr/gameResult.do?method=byWin&drwNo={**round**}

# Get started

## Required
1. [node-crawler](https://github.com/bda-research/node-crawler)
2. [yargs](https://github.com/yargs/yargs)

## Installation
 ```bash
 $ npm i
```

## Default usage (Round 1 - 902)
```bash
$ npm start
```

## Custom usage
You can set start and end value for crawling with yargs.

Arguments( **argv** ): 

- start( alias: s )
- end( alias: e )

```bash
npm start -- -s=10 -e=50
```