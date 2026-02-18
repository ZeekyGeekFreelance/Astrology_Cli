import { defineField, defineType } from "sanity";

export const panchangType = defineType({
  name: "panchang",
  title: "Panchang",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tithi",
      title: "Tithi (Lunar Day)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "vara",
      title: "Vara (Day)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nakshatra",
      title: "Nakshatra (Star)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "yoga",
      title: "Yoga",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "karana",
      title: "Karana",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sunrise",
      title: "Sunrise Time",
      type: "string",
      description: "e.g. 6:15 AM",
    }),
    defineField({
      name: "sunset",
      title: "Sunset Time",
      type: "string",
      description: "e.g. 6:30 PM",
    }),
    defineField({
      name: "specialEvent",
      title: "Special Event / Festival",
      type: "string",
      description: "Optional: any special occasion on this day",
    }),
  ],
  preview: {
    select: {
      title: "date",
      subtitle: "specialEvent",
    },
  },
});
