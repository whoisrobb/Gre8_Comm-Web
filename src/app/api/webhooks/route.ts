import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: Request) {
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.WEBHOOK_SECRET!);

    let evt: WebhookEvent

    // Verify the webhook
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400
        })
    }

  // Handle the webhook
  const eventType = evt.type;

    if (eventType === 'user.created') {
        const { id, first_name, last_name, email_addresses, image_url } = evt.data;

        try {
            await convex.mutation(api.users.createUser, {
                userId: id,
                firstName: first_name ?? '',
                lastName: last_name ?? '',
                email: email_addresses[0]?.email_address ?? '',
                image: image_url ?? '',
            })

            return new Response('User created', { status: 200 })
        } catch (error) {
            console.error('Error creating user:', error)
            return new Response('Error creating user', { status: 500 })
        }
    }

    return new Response('', { status: 200 })
}