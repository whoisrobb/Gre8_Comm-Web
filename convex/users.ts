// convex/users.ts

import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const createUser = mutation({
    args: {
        userId: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        image: v.string(),
    },
    handler: async (ctx, args) => {
        const { userId, firstName, lastName, email, image } = args
    
        // Check if user already exists
        const existingUser = await ctx.db
            .query('users')
            .filter(q => q.eq(q.field('userId'), userId))
            .first()
        
        if (existingUser) {
            throw new Error('User already exists')
        }

        // Insert new user
        const newUserId = await ctx.db.insert('users', {
            userId,
            firstName,
            lastName,
            email,
            image,
        })

        return newUserId;
    },
})