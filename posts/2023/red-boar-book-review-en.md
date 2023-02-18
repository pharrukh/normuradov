---
title: read red book with boar if you are not junior
description: review on the masterpiece by Dr Martin Kleppmann
date: 2023-02-19
tags:
  - book review
layout: layouts/post.njk
author: Farrukh Normuradov
postImage: /code.jpg
lang: en
---

As a developer, it is hard to [follow the trends](https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2022/10/tr_technology_radar_vol_27_en.pdf), even within your domain. <br>
Path-to-production mapping, team cognitive load, thread modelling... <br>
Backstage, Delta Lake, AWS Database Migration Service... <br>
io-ts, Kotest, NestJS... <br>

Some argue that it is an unavoidable burden for our generation. <br>
Dr Kleppmann presents an alternative. <br>
His point is simple, charming and hard to believe. <br>
Vendors provide services and market the best application of them. <br>
AWS, Azure, and Google Cloud have great shiny tools, true. <br>
But when not to use the tools is left in the shade. <br>
Writing it, having passed [Azure Associate exam](https://www.credly.com/badges/4b51f085-593e-4111-93a1-5e3f139299e0?source=linked_in_profile). <br>
Martin focuses on the ideas and principles behind technologies. <br>
Not cool marketing names in the mist of hype. <br>

The author possesses vast knowledge. <br>
But he does not stop with sharing them. <br>
He realizes the might that technology brings. <br>
He shows that he cares about the people. <br>
This care wraps the book. <br>
Dr Kleppmann starts and ends with a warning. <br>
I believe he realized the value of his work. <br>
It will allow thousands to cut corners. <br>
It will help them dive into the material deeper and faster. <br>

This book will be used again and again for another reason. <br>
The width of the material makes a reference book. <br>
If you look at the book from this perspective, it shines. <br>
Definitions are plenty. <br>
The explanations are simple because they leave marketing stuff outside. <br>
Comparisons are surprising, even shocking. <br>
In a streaming system, the joins are stored while the data is constantly changing as it is a stream. <br>
This Martin compares the joins and streams to data and queries. <br>
Here joins are stored, and data changes while it is reversed in a database. (p. 465) <br>
Another fascinating facet of the books is exhaustiveness. <br>
The author prepares readers to prove the point that _distributed transactions_ are not flawless. <br>
He analysed supporting concepts. <br>
He first decompiles the blocks, to only build them later by the end of the second part. <br>
Replication and partitioning, consistency, linearizability, total order broadcast, atomic commit and two-phase commit... <br>

The work is complex. <br>
It felt like experience in deployment, programming, database management, and a bunch of technologies is a must. <br>
The book also contains almost no code. <br>
That deprives a reader of the ability to gain skills and knowledge by following the steps. <br>
On top of that, the book is simply long, 500+ pages. <br>

There is, however, one thing that I personally missed. <br>
The author praises stream-based data systems. <br>
He proves that they deliver the same value as synchronous systems. <br>
They also add properties that improve the design and development, like unifying reads and writes. <br>
That was perfectly persuasive for me. <br>
What the author should have mentioned was _what it takes to persuade people to follow this approach?_ <br>
Or, more importantly _what it takes to build a strong experience in those systems?_ <br>
But yeah, I am asking too much! <br>
