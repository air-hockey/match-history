import { Context } from '../../utils'

export default {
  async matches(_, { winner, loser }, ctx: Context, info) {
    return await ctx.db.query.matches(
      { where: { winner: { id: winner } } },
      info
    )
  }
}
