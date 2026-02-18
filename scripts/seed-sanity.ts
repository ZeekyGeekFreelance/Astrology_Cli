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

async function seed() {
    console.log("Seeding example data...");

    // Example Panchang Data
    const panchangData = {
        _type: "panchang",
        date: new Date().toISOString().split("T")[0],
        tithi: "Shukla Pashka Ekadashi",
        vara: "Thursday",
        nakshatra: "Rohini",
        yoga: "Siddha",
        karana: "Vishti",
        sunrise: "6:24 AM",
        sunset: "6:12 PM",
        specialEvent: "Vaikuntha Ekadashi",
    };

    // Example Blog Post
    const postData = {
        _type: "post",
        title: "The Significance of Rohini Nakshatra",
        slug: { _type: "slug", current: "significance-of-rohini-nakshatra" },
        excerpt: "Discover the power and influence of Rohini, the favorite star of the Moon.",
        body: [
            {
                _key: "block1",
                _type: "block",
                children: [
                    {
                        _key: "span1",
                        _type: "span",
                        text: "Rohini is the fourth nakshatra in the zodiac, known for its creative and nourishing qualities...",
                    },
                ],
                markDefs: [],
                style: "normal",
            },
        ],
        category: "vedic-knowledge",
        author: "Vedic Sages Team",
        publishedAt: new Date().toISOString(),
    };

    try {
        const pResult = await client.create(panchangData);
        console.log(`Created panchang document: ${pResult._id}`);

        const bResult = await client.create(postData);
        console.log(`Created blog post document: ${bResult._id}`);

        console.log("Seeding completed successfully!");
    } catch (err) {
        console.error("Seeding failed:", err);
        console.log("\nTIP: Make sure you have set SANITY_API_WRITE_TOKEN in .env.local");
    }
}

seed();
