import * as dotenv from "dotenv";
import * as path from "path";
import { createClient } from "@sanity/client";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// This script can be run with: npx ts-node -T scripts/seed-sanity.ts

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
    console.error("ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is missing in .env.local");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    useCdn: false,
    apiVersion: "2024-01-01",
    token,
});

function block(text: string, key: string) {
    return {
        _key: key,
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
            {
                _key: `${key}-span`,
                _type: "span",
                marks: [],
                text,
            },
        ],
    };
}

function bullet(text: string, key: string) {
    return {
        _key: key,
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [
            {
                _key: `${key}-span`,
                _type: "span",
                marks: [],
                text,
            },
        ],
    };
}

async function seed() {
    if (!token) {
        console.error("ERROR: SANITY_API_WRITE_TOKEN is missing in .env.local");
        process.exit(1);
    }

    console.log("Seeding blog data...");

    const posts = [
        {
            _id: "post-seed-rohini-nakshatra-meaning-and-traits",
            _type: "post",
            title: "Rohini Nakshatra: Meaning and Core Traits",
            slug: { _type: "slug", current: "rohini-nakshatra-meaning-and-traits" },
            excerpt: "Discover why Rohini is associated with attraction, creativity, and prosperity in Vedic astrology.",
            category: "vedic-knowledge",
            author: "Vedic Sages Team",
            publishedAt: "2026-02-19T08:00:00.000Z",
            image: {
                _type: "image",
                externalUrl: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
                alt: "Night sky full of stars",
            },
            body: [
                block("Rohini is the fourth nakshatra in the zodiac and is known for fertile, creative, and growth-oriented energy.", "rohini-intro"),
                block("Located in Taurus, Rohini carries earthy stability with emotional richness. It supports beauty, nourishment, and material progress.", "rohini-body-1"),
                bullet("Ideal for starting long-term creative work and family planning conversations.", "rohini-b1"),
                bullet("Strong themes: attraction, abundance, artistic expression, and emotional comfort.", "rohini-b2"),
                bullet("Watch for: over-attachment, indulgence, and emotional dependency.", "rohini-b3"),
            ],
        },
        {
            _id: "post-seed-weekly-remedies-for-mental-clarity",
            _type: "post",
            title: "Weekly Remedies for Mental Clarity",
            slug: { _type: "slug", current: "weekly-remedies-for-mental-clarity" },
            excerpt: "Simple 7-day Vedic routine to reduce restlessness and improve concentration.",
            category: "remedies",
            author: "Vedic Sages Team",
            publishedAt: "2026-02-18T08:00:00.000Z",
            image: {
                _type: "image",
                externalUrl: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
                alt: "Meditation candles and sacred setting",
            },
            body: [
                block("Mental fog often rises when Moon and Mercury periods are imbalanced. A simple routine can stabilize focus.", "remedy-intro"),
                bullet("Monday: chant 'Om Som Somaya Namah' for 11 minutes.", "remedy-b1"),
                bullet("Wednesday: donate green lentils or leafy vegetables.", "remedy-b2"),
                bullet("Saturday: avoid late-night overstimulation and reduce digital overload.", "remedy-b3"),
                block("Follow this cycle consistently for 4 weeks before evaluating results.", "remedy-outro"),
            ],
        },
        {
            _id: "post-seed-ekadashi-fasting-guide-beginners",
            _type: "post",
            title: "Ekadashi Fasting Guide for Beginners",
            slug: { _type: "slug", current: "ekadashi-fasting-guide-beginners" },
            excerpt: "How to observe Ekadashi practically while balancing health and daily responsibilities.",
            category: "festivals",
            author: "Vedic Sages Team",
            publishedAt: "2026-02-17T08:00:00.000Z",
            image: {
                _type: "image",
                externalUrl: "https://images.pexels.com/photos/831082/pexels-photo-831082.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
                alt: "Temple diya lights in evening",
            },
            body: [
                block("Ekadashi is observed on the 11th lunar day and is considered spiritually purifying in Vedic tradition.", "eka-intro"),
                bullet("Choose a fasting level suitable for your health: full, fruit-only, or sattvic meals.", "eka-b1"),
                bullet("Avoid grains and heavy tamasic food.", "eka-b2"),
                bullet("Prioritize mantra, scripture reading, and mindful silence.", "eka-b3"),
                block("Always break the fast at the recommended time on Dwadashi.", "eka-outro"),
            ],
        },
        {
            _id: "post-seed-daily-horoscope-sample-aries",
            _type: "post",
            title: "Daily Horoscope Sample: Aries Energy Check",
            slug: { _type: "slug", current: "daily-horoscope-sample-aries" },
            excerpt: "A sample daily horoscope format to help you structure practical guidance.",
            category: "daily-horoscope",
            author: "Vedic Sages Team",
            publishedAt: "2026-02-16T08:00:00.000Z",
            image: {
                _type: "image",
                externalUrl: "https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
                alt: "Sunrise over mountains",
            },
            body: [
                block("Today supports confident action, but avoid rushing communication.", "aries-intro"),
                bullet("Career: good window for pitching ideas in the first half of the day.", "aries-b1"),
                bullet("Relationships: listen first, respond later to avoid friction.", "aries-b2"),
                bullet("Health: hydrate and reduce heat-producing foods.", "aries-b3"),
            ],
        },
        {
            _id: "post-seed-gemstone-selection-basics",
            _type: "post",
            title: "Gemstone Selection Basics in Vedic Astrology",
            slug: { _type: "slug", current: "gemstone-selection-basics" },
            excerpt: "Understand when gemstones help and when they should be avoided.",
            category: "vedic-knowledge",
            author: "Vedic Sages Team",
            publishedAt: "2026-02-15T08:00:00.000Z",
            image: {
                _type: "image",
                externalUrl: "https://images.pexels.com/photos/1571793/pexels-photo-1571793.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
                alt: "Colored gemstones close-up",
            },
            body: [
                block("Gemstones amplify planetary influences; they are not universal lucky charms.", "gem-intro"),
                bullet("Always check ascendant, dasha, and house ownership before prescribing.", "gem-b1"),
                bullet("Wrong gemstone can intensify problems instead of solving them.", "gem-b2"),
                bullet("Start with trial period and observe energy, sleep, and emotional patterns.", "gem-b3"),
            ],
        },
        {
            _id: "post-seed-navratri-home-practice-checklist",
            _type: "post",
            title: "Navratri Home Practice Checklist",
            slug: { _type: "slug", current: "navratri-home-practice-checklist" },
            excerpt: "A practical checklist for maintaining consistency during all nine nights.",
            category: "festivals",
            author: "Vedic Sages Team",
            publishedAt: "2026-02-14T08:00:00.000Z",
            image: {
                _type: "image",
                externalUrl: "https://images.pexels.com/photos/8636608/pexels-photo-8636608.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
                alt: "Decorated altar with flowers and lamps",
            },
            body: [
                block("Navratri discipline is most effective when practices are simple and repeatable.", "nav-intro"),
                bullet("Set a fixed prayer slot daily, even if short.", "nav-b1"),
                bullet("Keep altar clean and avoid clutter around puja area.", "nav-b2"),
                bullet("Track sankalpa and one behavior change for the full 9 days.", "nav-b3"),
            ],
        },
    ];

    try {
        const legacyPrivateIds = [
            "post.seed.significance-of-rohini-nakshatra",
            "post-seed-significance-of-rohini-nakshatra",
            "post.seed.weekly-remedies-for-mental-clarity",
            "post.seed.ekadashi-fasting-guide-beginners",
            "post.seed.daily-horoscope-sample-aries",
            "post.seed.gemstone-selection-basics",
            "post.seed.navratri-home-practice-checklist",
        ];

        for (const legacyId of legacyPrivateIds) {
            try {
                await client.delete(legacyId);
            } catch {
                // Ignore missing legacy documents.
            }
        }

        for (const post of posts) {
            await client.createOrReplace(post as any);
            console.log(`Upserted blog post: ${post.slug.current}`);
        }

        console.log(`Seeding completed successfully! Upserted ${posts.length} posts.`);
    } catch (err) {
        console.error("Seeding failed:", err);
        console.log("\nTIP: Make sure SANITY_API_WRITE_TOKEN has write access for this dataset.");
    }
}

seed();
