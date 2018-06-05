import { Context } from '../../utils'

export default {
  async matches(_, { winner }, ctx: Context, info) {
    return await ctx.db.query.matches(
      { where: { winner: { name: winner } } },
      info
    )
  }
}
