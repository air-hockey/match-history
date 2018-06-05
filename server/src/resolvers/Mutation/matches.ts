import { Context } from '../../utils'

export default {
  async createMatch(_, { winnerId, loserId }, ctx: Context, info) {
    return await ctx.db.mutation.createMatch(
      {
        data: {
          date: new Date(),
          winner: { connect: { id: winnerId } },
          loser: { connect: { id: loserId } }
        }
      },
      info
    )
  },
  async deleteMatch(_, { id }, ctx: Context, info) {
    return await ctx.db.mutation.deleteMatch({ where: { id } }, info)
  }
}
