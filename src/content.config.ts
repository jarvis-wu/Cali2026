import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const days = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/days' }),
  schema: z.object({
    title: z.string(),            // "Day 3: Yosemite Valley"
    date: z.string(),             // "June 14, 2025"
    miles: z.number().optional(), // driving miles that day
    heroImage: z.string().optional(), // "/images/day3-hero.jpg"
    summary: z.string(),          // one-liner shown on landing + sidebar
  }),
});

export const collections = { days };
