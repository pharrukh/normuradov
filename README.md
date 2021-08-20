[![Build Status](https://dev.azure.com/normuradov0143/normuradov/_apis/build/status/pharrukh.normuradov?branchName=master)](https://dev.azure.com/normuradov0143/normuradov/_build/latest?definitionId=2&branchName=master)

# normuradov

## setup

node v10.24.0

## Folders

All posts that gonna be published upon building are located in **src/posts** directory. Inside the folder the structure could be whatever the owner of the blog want to.

It is not the same with images included in markdown files. Only **relative path** should be used in order for gatsby-images-plugin to work. It makes images responsive and enables the lazy images loading.

It is recommended thought not obligatory to put all media in **src/posts/images** to make relative paths readable.

To change the folder for posts-markdown files and media files contained in them, change the parameters for gatsby-source-filesystem plugin in **src/gatsby-config.js**. Default settings look like this:

```
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/src/posts/images`,
    name: `images`
  }
}
```

```
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/src/posts`,
    name: `posts`
  }
}
```


## Frontmatter

Markdown file's frontmatter is obligatory in order to be grouped and parsed correctly. What should be included is (in any order):

- path - what route should the post have;
- type - all posts shoud have **post** type;
- date - date the post was created / published;
- lang - language the posts was written in;
- keywords - should be written in one string separated by space;
- title (*self-explanatory*);
- description (*self-explanatory*);
- author (*self-explanatory*);

Example:

```
---
path: "/en/2018/07/07"
type: "post"
date: 2018-07-07
lang: "en"
title: "My 1st post"
keywords: "jekyll github algorithms azure-functions"
description: "Starting publishing posts"
author: "Farrukh Normuradov"
---
```

## Publishing a new post

1. Clone the project:
   ```
   git clone https://github.com/EricRovell/normuradov.git
   ```
2. Or update the local branch from remote.
3. Add new markdown files to the **src/posts/** directory. Images should be included to the **src/posts/images** and links to them should be relative.
4. Run deployment npm script, it will build the project and deploy it to the github-pages via gh-pages branch.
   ```
   npm run deploy
   ```
