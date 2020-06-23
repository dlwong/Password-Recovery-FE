# Implement Password Recovery on the Conduit Codebase

I've left the template [Conduit](https://github.com/gothinkster/realworld) code alone so the general functionality still works (listed below). I've added the frontend to password recovery and connecting it to the backend to do the authentication.

#### Forgot Password Link
![Step 1](https://user-images.githubusercontent.com/8184799/85478094-73ae7880-b570-11ea-85fb-e15e4db4a0e1.png)

#### Enter Email
![Step 2](https://user-images.githubusercontent.com/8184799/85478100-76a96900-b570-11ea-98f3-3d3055ccf9fa.png)

#### Reset Password
![Step 3](https://user-images.githubusercontent.com/8184799/85478105-78732c80-b570-11ea-9f83-b817f50c1794.png)

## Getting started

```sh
npm install 
npm start
```

### Making requests to the backend API

The [backend code](https://github.com/dlwong/Password-Recovery-BE) needs to be cloned and ran to make requests since changes made to apply password recovery

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. 

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/@username, /#/@username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles

<br />

Brought to you by Thinkster
