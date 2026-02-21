// Blog post queries
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  category,
  image,
  externalImageUrl,
  publishedAt,
  author
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  category,
  image,
  externalImageUrl,
  publishedAt,
  author
}`;

export const POSTS_BY_CATEGORY_QUERY = `*[_type == "post" && category == $category] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  category,
  image,
  externalImageUrl,
  publishedAt,
  author
}`;

export const RECENT_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0..4] {
  _id,
  title,
  slug,
  publishedAt,
  category
}`;
