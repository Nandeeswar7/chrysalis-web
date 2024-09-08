import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { q } = req.query;
        if (typeof q !== 'string') {
            return res.status(400).json({ message: 'Query parameter is required' });
        }
        
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
        const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(q)}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
