import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';
import { config } from '../../sanity';

const apiConfig = {
  ...config,
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(apiConfig);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { _id, name, email, comment } = JSON.parse(req.body);

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Couldn't submit comment, ${error}` });
  }

  return res.status(200).json({ message: `Comment submitted successfully` });
}
