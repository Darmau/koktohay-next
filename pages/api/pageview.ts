import { NextApiRequest, NextApiResponse } from "next";

const PAGEVIEW_API = process.env.PAGEVIEW_API;
const TOKEN = process.env.PAGEVIEW_TOKEN;

export const runtime = 'edge';

async function fetchPageView(url: string): Promise<number> {
  const apiUrl = `${PAGEVIEW_API}?link=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error fetching page views:', error);
    return 0;
  }
}

async function addPageView(url: string): Promise<number> {
  const apiUrl = `${PAGEVIEW_API}?link=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error adding page view:', error);
    return 0;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const url = query.link as string;

  if (method === 'PUT') {
    const views = await addPageView(url);
    res.status(200).json({ count: views });
  } else if (method === 'GET') {
    const views = await fetchPageView(url);
    res.status(200).json({ count: views });
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(); // Method Not Allowed
  }
}