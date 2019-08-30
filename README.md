# Blog, powered by GatbyJS

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

## Algorithm of publishing a new post

1. Add a new .md file to the posts folder.
2. Run command to build and deploy the website:
   
   ```
   npm run deploy
   ```
