import * as jwt from 'jsonwebtoken'
import { Context, Player } from '../../utils'
import { getFacebookUser, FacebookUser } from '../../facebook'

async function getPlayer(ctx: Context, facebookId: string): Promise<Player> {
  return await ctx.db.query.player({ where: { facebookId } })
}

async function createPlayer(
  ctx: Context,
  facebookUser: FacebookUser
): Promise<Player> {
  if (
    !facebookUser ||
    !facebookUser.id ||
    !facebookUser.email ||
    !facebookUser.first_name ||
    !facebookUser.last_name
  )
    return null

  return await ctx.db.mutation.createPlayer({
    data: {
      facebookId: facebookUser.id,
      email: facebookUser.email,
      firstName: facebookUser.first_name,
      lastName: facebookUser.last_name
    }
  })
}

export default {
  async authenticate(_, { facebookToken }, ctx: Context, info) {
    const facebookUser = await getFacebookUser(facebookToken)

    let player = await getPlayer(ctx, facebookUser.id)

    if (!player) player = await createPlayer(ctx, facebookUser)

    if (!player) {
      ctx.request.session.token = null
      return null
    }

    ctx.request.session.token = jwt.sign(
      { playerId: player.id },
      process.env.JWT_SECRET
    )

    return player
  }
}
