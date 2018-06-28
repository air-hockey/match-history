import * as jwt from 'jsonwebtoken'
import { Prisma } from 'prisma-binding'

export const AGGREGATE_COUNT = ` { aggregate { count } } `

export interface Context {
  db: Prisma
  request: any
}

export interface Player {
  id: string
  name: string
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
