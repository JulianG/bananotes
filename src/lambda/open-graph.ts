// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import fetch from 'node-fetch';

import metascraper from 'metascraper';

import metascraperURL from 'metascraper-url';
import metascraperTitle from 'metascraper-title';
import metascraperImage from 'metascraper-image';
import metascraperDescription from 'metascraper-description';
import metascraperAuthor from 'metascraper-author';
import metascraperLogo from 'metascraper-logo';
import metascraperClearbitLogo from 'metascraper-clearbit-logo';

import { APIGatewayEvent, Context } from 'aws-lambda';
export async function handler(event: APIGatewayEvent, context: Context) {
  try {

    const scraper = metascraper([
      metascraperURL(),
      metascraperTitle(),
      metascraperImage(),
      metascraperDescription(),
      metascraperAuthor(),
      metascraperLogo(),
      metascraperClearbitLogo(),
    ])

    const got = require('got')

    const targetUrl = event.queryStringParameters.url

    const { body: html, url } = await got(targetUrl)

    const metadata = await scraper({ html, url })
    console.log(metadata)

    return {
      statusCode: 200,
      body: JSON.stringify(metadata)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
