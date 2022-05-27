# Holidaze - Project Exam 2

![image](../main/project-image.png?raw=true)

A website for people visiting Bergen to find hotels and communicate directly with hotel owners and site administrators.

## Description

Holidaze is a website where people can find hotels, guesthouses and B&B establishments in Bergen, Norway.

The website consists of the following pages:

-   Home
-   Hotels
-   Hotel details
-   Contact
-   Login
-   Admin pages

The hotels are fetched from a publicly hosted Strapi API.
On the Home and Hotels page, the user can use the typeahead search bar to quickly find specific hotels.
For each hotel details page, the user can send an inquiry to the hotel to ask any questions they may have. These inquiries can be managed by the administrator once logged in.
The contact page uses form validation and saves all messages to a dedicated collection in the admin section, where the admin can manage them.
In addition to the hotel inquiries and messages, logged in administrators can also manage and create new establishments which will then be visible to the users on the hotels page.

## Built With

-   [Next.js](https://nextjs.org/)
-   [React Bootstrap](https://react-bootstrap.github.io/)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com/Noroff-FEU-Assignments/project-exam-2-mikkelworld.git
```

2. Install the dependencies:

```
npm install
```

### Running

To run the app, run the following command:

```bash
npm run start
```

or

```bash
npm run dev
```

To log in as an administrator, navigate to /login (also linked in the footer) and sign in with "admin@holidaze.com" and "Pass1234"

## Contributing

This project was a school assignment and is no longer in development.
To contribute, please open a pull request, and your request will be reviewed.

## Contact

Want to get in touch with me?

[My Facebook](https://www.facebook.com/mikkel.andersen1)

[My Instagram](https://instagram.com/mikkelsen.oo)
