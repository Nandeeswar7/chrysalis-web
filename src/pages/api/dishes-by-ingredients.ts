import type { NextApiRequest, NextApiResponse } from 'next';
import z from 'zod'

const bodySchema = z.object({
    ingredients: z.array(z.string()).nonempty('Ingredients array cannot be empty')
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    const validatedBody = bodySchema.safeParse(typeof req.body === 'string' ? JSON.parse(req.body) : req.body)
    if(!validatedBody.success) {
        return res.status(400).json({message: "a list of ingredients is required"})
    }

    const { ingredients } = validatedBody.data;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
    const response = await fetch(`${apiUrl}/dishes-by-ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process ingredients' });
  }
}
