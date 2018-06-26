import * as jwt from 'jsonwebtoken'
import { Context, AuthError, AGGREGATE_COUNT } from '../../utils'

export default {
  async me(_, args, ctx: Context, info) {
    const { token } = ctx.request.session
    if (token) {
      const { playerId } = jwt.verify(token, process.env.JWT_SECRET!) as {
        playerId: string
      }

      return await ctx.db.query.player({ where: { id: playerId } }, info)
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

const getMatchesCountByType = async ({ id }, ctx, type) =>
  (await ctx.db.query.matchesConnection(
    type && { where: { [type]: { id } } },
    AGGREGATE_COUNT
  )).aggregate.count

export const Player = {
  async matches({ id }, args, ctx, info) {
    return await ctx.db.query.matches(
      { where: { OR: [{ winner: { id } }, { loser: { id } }] } },
      info
    )
  },
  async wins(parent, args, ctx) {
    return await getMatchesCountByType(parent, ctx, 'winner')
  },
  async losses(parent, args, ctx) {
    return await getMatchesCountByType(parent, ctx, 'loser')
  }
}

export const AllPlayersMeta = {
  count: async (parent, args, ctx) => {
    const aggregations = await ctx.db.query.playersConnection(
      {},
      AGGREGATE_COUNT
    )

    return aggregations.aggregate.count
  }
}
