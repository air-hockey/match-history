import * as fetch from 'isomorphic-unfetch'

const { FACEBOOK_API_VERSION } = process.env

export interface FacebookUser {
  id: string
  email: string
  first_name: string
  last_name: string
}

export async function getFacebookUser(
  facebookToken: string
): Promise<FacebookUser> {
  const endpoint = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/me?access_token=${facebookToken}&fields=email,first_name,last_name`
  const data = await fetch(endpoint).then(response => response.json())

  if (data.error) throw new Error(JSON.stringify(data.error))

  return data
}
