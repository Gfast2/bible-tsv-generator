# bible-tsv-generator
<center>
  <img src='./docs/images/bible.gif' width='100%' />
</center>

## Intro

Mining a new Simplified Chinese Version Bible (cns) for readers that would like to read bible in command line. There is a very cool [software **kjv**](https://github.com/bontibon/kjv) available to helping people access **Bible** in CLI. As a chinese I'd like to back the chinese verson for this software. So here it is!

## DoD

This software should read targeted resources from internet and *format* the content into `tsv` format which can be used for this software.

## Build

1. Get this Repo & isntall dependencies:
```sh
mkdir -p ~/workspace/
cd $_
git clone https://github.com/Gfast2/bible-tsv-generator.git
npm i
```

2. Run code to get the simplified chinese bible:
```sh
npm start
```

3. If everything worked out well, under `root` directory of this repo, the new created file `cns.tsv` is the bible to just created. Cheers, enjoy IT!

## License

[MIT](./LICENSE.txt)