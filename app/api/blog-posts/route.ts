import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { POSTS_BY_CATEGORY_QUERY, POSTS_QUERY } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") || "all";

  try {
    const query = category === "all" ? POSTS_QUERY : POSTS_BY_CATEGORY_QUERY;
    const params = category === "all" ? {} : { category };
    const posts = await client.fetch(query, params);

    return NextResponse.json({
      posts: Array.isArray(posts) ? posts : [],
    });
  } catch (error) {
    console.error("API /api/blog-posts failed:", error);
    return NextResponse.json(
      { error: "Unable to load blog posts right now." },
      { status: 500 },
    );
  }
}
