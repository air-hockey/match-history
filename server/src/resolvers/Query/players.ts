import * as jwt from 'jsonwebtoken'
import { Context, AuthError } from '../../utils'

export default {
  async me(_, args, ctx: Context, info) {
    const { token } = ctx.request.session
    if (token) {
      const { playerId } = jwt.verify(token, process.env.JWT_SECRET!) as {
        playerId: string
      }

      return ctx.db.query.player({ where: { id: playerId } }, info)
    }

    throw new AuthError()
  },
  async player(_, { id }, ctx: Context, info) {
    return await ctx.db.query.player({ where: { id } }, info)
  },
  async allPlayers(_, { first, skip }, ctx: Context, info) {
    return await ctx.db.query.players({ first, skip }, info)
  },
  _allPlayersMeta() {
    return {}
  }
}

export const allPlayersCount = async (parent, args, ctx, info) => {
  const aggregations = await ctx.db.query.playersConnection(
    {},
    ` { aggregate { count } } `
  )

  return aggregations.aggregate.count
}
