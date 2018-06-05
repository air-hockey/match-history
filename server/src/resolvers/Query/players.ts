import { Context } from '../../utils'

export default {
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
