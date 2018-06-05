import { Context } from '../../utils'

export default {
  async createPlayer(_, { name }, ctx: Context, info) {
    return await ctx.db.mutation.createPlayer({ data: { name } }, info)
  }
}
