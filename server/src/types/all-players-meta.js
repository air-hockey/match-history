const AllPlayersMeta = {
  async count(parent, args, ctx, info) {
    const aggregations = await ctx.db.query.playersConnection(
      {},
      ` { aggregate { count } } `
    )

    return aggregations.aggregate.count
  }
}

module.exports = { AllPlayersMeta }
