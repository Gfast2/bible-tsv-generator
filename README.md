# bible-tsv-generator
### (Version V2.0.0)
<center>
  <img src='./docs/images/bible.gif' width='100%' />
</center>

## Intro

Mining a new Chinese Version Bible (cns/cnt/cut/cus) for readers that would like to read bible in command line. There is a very cool [software **kjv**](https://github.com/bontibon/kjv) available to helping people access **Bible** in CLI. As a chinese I'd like to back the chinese verson for this software. So here it is!

## DoD

This software should allow user select its wished chinese bible version, then read targeted resources from internet and *format* the content and write'em down into `tsv` format which can be used for [the sweet CLI software: **KJV**](https://github.com/Gfast2/kjv).

## Useage

1. Get this Repo & isntall dependencies:
```sh
mkdir -p ~/workspace/
cd $_
git clone https://github.com/Gfast2/bible-tsv-generator.git
npm i
```

2. Run this software to select and generate chinese bible:
```sh
npm start
```

## Build / Develop how-to

Since there is a GUI layer in this software from Version 2.0.0, I suggest you edite `index.ts` before you start the actual development. Because the following `dev mode` leverage [`nodemon`](https://nodemon.io/) to dealing with ts->js transcompiling & hot reloading automatically , which make it hard to generate GUI operation manually . But a *issue* showing me how to is welcomed.

### Start hot reload dev mode
```sh
npm run dev
```

### Build Project
```sh
npm run build
```

If everything worked out well, under repo's root directory, the new created book `*.tsv` is the one you just created. Cheers, enjoy IT!

## License

[MIT](./LICENSE)