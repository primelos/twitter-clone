 // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TweetBody } from '../../typings'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const data: TweetBody = JSON.parse(req.body)

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'tweet',
          text: data.text,
          username: data.username,
          blockTweet: false,
          profileImg: data.profileImg,
          image: data.image,
        }
      }
    ]
  }

  const apiEndpoint = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

  const result = await fetch(apiEndpoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_KEY}`
    },
    body: JSON.stringify(mutations),
    method: 'POST'
  })

  const json =await result.json()

  res.status(200).json({ name: 'John Doe' })
}
