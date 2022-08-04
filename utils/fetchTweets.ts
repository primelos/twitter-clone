import { Tweet } from "../typings"

const val = process.env.NEXT_PUBLIC_BASE_URL

export const fetchTweets = async () => {
  console.log('val', val)
  const res = await fetch(new URL(`${val}/api/getTweets`))
  const data = await res.json()
  const tweets: Tweet[] = data.tweets

  // console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  return tweets
}
