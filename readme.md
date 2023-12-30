# Jensen - Folio 

## About
Based on folio-2019 by Bruno Simon: [bruno-simon.com](https://www.bruno-simon.com/).

## Setup
Download [Docker](https://www.docker.com/products/docker-desktop).
Run the following command in the root directory of the project:

``` bash
docker compose up -d
```

Then go to [localhost:8080](http://localhost:8080) to see the website, and [localhost:8080/#debug](http://localhost:8080/#debug) for the debug panel.


## Non-Docker Setup

Node version 14 worked for me in docker. 

``` bash
# Just be sure that you've got parcel js on you system
npm install -g parcel-bundler

# Install dependencies (only for first time)
npm i

# Serve at localhost:1234
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Future Directions?
- [ ] Use the 'Projects' section for everything, and car only runs left/right, and scrolling will allow you to move as well.