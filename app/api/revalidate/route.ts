import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type?: string
  paths?: string[]
  layout?: boolean
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return new Response('Missing environment variable SANITY_REVALIDATE_SECRET', {
        status: 500,
      })
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true, // wait for CDN / Content Lake propagation
    )

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: 'Invalid signature', isValidSignature, body }),
        { status: 401 },
      )
    }

    if (!body?.paths?.length && !body?.layout) {
      return new Response(JSON.stringify({ message: 'Bad Request', body }), {
        status: 400,
      })
    }

    const revalidated: string[] = []

    if (body.layout) {
      revalidatePath('/', 'layout')
      revalidated.push('layout:/')
    }

    for (const path of body.paths ?? []) {
      revalidatePath(path)
      revalidated.push(path)
    }

    return NextResponse.json({
      message: 'Revalidated',
      _type: body._type,
      revalidated,
    })
  } catch (err: unknown) {
    console.error(err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(message, { status: 500 })
  }
}
