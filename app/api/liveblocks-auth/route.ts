import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { api } from '@/convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request){
    const autho = await auth();
    const user = await currentUser();

    if(!user || !autho){
        return new Response("Unauthorized", {status: 403});
    }

    const {room} = await request.json();
    const board = await convex.query(api.board.get, { id: room });

    if(board?.orgId !== autho.orgId){
        return new Response("Unauthorized"
        );
    }

    const userInfo = {
        name: user.firstName!,
        picture: user.imageUrl,
    }

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    )

    if(room){
        session.allow(room, session.FULL_ACCESS)
    }

    const {status, body} = await session.authorize();
    return new Response(body, {status});
}
