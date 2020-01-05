<div align="center">

# Linkquest CLI

Linkquest CLI is the CLI version of Linkquest, which provides you with an easy way to get all of the valid and invalid links on a single page or an entire site through the command line.

</div>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/linkquest-cli.svg?style=flat)](https://www.npmjs.com/package/linkquest-cli)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/linkquest-cli/badge.svg)](https://snyk.io/test/github/robertcorponoi/linkquest-cli)
  ![npm](https://img.shields.io/npm/dt/linkquest-cli)
  [![NPM downloads](https://img.shields.io/npm/dm/linkquest-cli.svg?style=flat)](https://www.npmjs.com/package/linkquest-cli)
  <a href="https://badge.fury.io/js/linkquest-cli"><img src="https://img.shields.io/github/issues/robertcorponoi/linkquest-cli.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/linkquest-cli"><img src="https://img.shields.io/github/license/robertcorponoi/linkquest-cli.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Install**

To install linkquest-cli as a global command to use anywhere you can use:

```bash
$ npm install -g linkquest
```

## **Usage**

To use linkquest, all you need is the name of the page or site to crawl:

```bash
$ linkquest https://example.com/
```

This will crawl the page and save the output to the current working directory. If you want to instead crawl the whole host, you have to use the `-h` or `--host` option.

```bash
$ linkquest https://example.com/ -h
```

## **Flags**

To customize linkquest, you can use a combination of the flags below:

```
linkquest [options] <url>

-h, --host          Crawl the entire host instead of just the provided url.
-o, --output        Specify the directory to save the the "linkquest.json" file that contains the results of the crawl. Defaults to the current directory that the command is being used in.
-s, --silent        Hides all console output.
```

## **Examples**

Crawling a host and saving the output to a Downloads folder:

```bash
linkquest -o /c/Users/Me/Downloads/ https://example.com/
```

Crawling a single page:

```bash
linkquest https://example.com/example
```

## **Tests**

To run the tests available for linkquest-cli, use:

```bash
$ npm run test
```

## **License**

MIT