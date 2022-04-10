## Dev Blog

## Table of contents

- [General Info](#general-info)
- [Setup](#setup)
- [Built with](#built-with)
- [Status](#status)

## General Info

- Dev blog for me🦝✨'
- I started this project to learn 
  - `Next.js`
  - how to use `AWS services`

## Setup

To run this project, install it locally using yarn:

**To run server**

```
$ cd ../dev-blog-for-ten/server
$ yarn serve
```

**To run client**

```
$ cd ../dev-blog-for-ten/client
$ yarn dev
```

## Built with

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with TypeScript.
- Used dependencies and versions can be found in `package.json` in the project root.
  - `styled-components` for styling
  - `Express` for `Node.js` server framework
  - `MongoDB` for database
  - `react-quill` for WYSIWYG (rich-text-editor)
- This project currently uses / will use the following `AWS services`:
  - `S3` for files storage
  - `SES` for sending emails
  - `EC2` for cloud hosting
  - `IAM` for Identity and access management
  - `Route 53` for domain management along with custom rules/policy

## Status

The project is **currently in progress(Upadated on April, 2nd, 2022)** 🐫

- [x] Auth
  - register
  - email authentication
  - login & logout
  - Find Password
- [x] the user with 'subscriber' role can register posts of useful articles & videos on the blog
  - [x] Each posts are categorized by related tech stacks(ex) React, Next.js, etc) and the user can see filtered results by selecting specifc tag
- [ ] the user with 'admin' role can CRUD own articles on the blog
- [x] any user can view contents (tech articles & posts to useful medium) on the blog
- [x] infinite scroll to load more contents
- [ ] skeleton loading or spinner to visualize loading status
