import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short summary of the blog post",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "externalUrl",
              title: "Or Paste Image URL",
              type: "url",
              description: "Optional: use external URL instead of upload",
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Daily Horoscope", value: "daily-horoscope" },
          { title: "Vedic Knowledge", value: "vedic-knowledge" },
          { title: "Remedies", value: "remedies" },
          { title: "Festivals", value: "festivals" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "externalUrl",
          title: "Or Paste Image URL",
          type: "url",
          description: "Optional: use external URL instead of upload",
        }),
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the featured image for accessibility and SEO",
        }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "category",
    },
  },
});
