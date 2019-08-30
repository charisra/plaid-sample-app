## How to Run

Before you run, you need to install a CORS browser extension. I use [this one](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

## In your terminal:

1) cd into 'agentrisk/react'
2) npm install (once)
3) npm start
## On a separate terminal window:
4) cd into 'agentrisk/node'
5) npm install (once)
6) Run the following (copy-paste the entire command at once): 
PLAID_CLIENT_ID='yourAPIHere' PLAID_SECRET='yourSecretHere' PLAID_PUBLIC_KEY='yourPublicKeyHere' PLAID_ENV='sandbox' PLAID_PRODUCTS=auth node index.js

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The Portfolio Breakdown shows a pie chart for account's assets. Hover and/or click to see the %.
