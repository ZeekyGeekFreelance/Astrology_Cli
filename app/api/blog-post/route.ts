import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { POST_BY_SLUG_QUERY, RECENT_POSTS_QUERY } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const [post, recentPosts] = await Promise.all([
      client.fetch(POST_BY_SLUG_QUERY, { slug }),
      client.fetch(RECENT_POSTS_QUERY),
    ]);

    return NextResponse.json({
      post: post || null,
      recentPosts: Array.isArray(recentPosts) ? recentPosts : [],
    });
  } catch (error) {
    console.error("API /api/blog-post failed:", error);
    return NextResponse.json(
      { error: "Unable to load this article right now." },
      { status: 500 },
    );
  }
}
