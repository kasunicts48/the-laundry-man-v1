import dryCleaningManchesterImg from '../assets/images/blog/dry-cleaning-manchester.webp';
import laundryServicesManchesterImg from '../assets/images/blog/laundry-services-manchester.webp';
import laundryDryCleaningManchesterImg from '../assets/images/blog/laundry-dry-cleaning-manchester.webp';
import dryCleanerDryerImg from '../assets/images/blog/dry-cleaner-dryer.webp';
import lintRollerImg from '../assets/images/blog/lint-roller.webp';
import dryCleaningWinterCoatImg from '../assets/images/blog/dry-cleaning-winter-coat.webp';
import whatIsDryCleaningImg from '../assets/images/blog/what-is-dry-cleaning.webp';
import choosingDressesImg from '../assets/images/blog/choosing-dresses.webp';
import dryCleanerDryer2Img from '../assets/images/blog/dry-cleaner-dryer-2.webp';
import blogsImported from './blogsImported.json';
import { normalizeLegacySiteLinks } from '../utils/normalizeLegacySiteLinks';
import { sanitizeBlogHtml } from '../utils/sanitizeBlogHtml';

export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'image'; src: string; alt: string }
  | { type: 'label'; label: string; text: string };

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  content?: BlogContentBlock[];
  contentHtml?: string;
}

export const BLOG_POSTS_PER_PAGE = 10;

const handcraftedBlogPosts: BlogPost[] = [
  {
    id: 'laundry-and-dry-cleaning-manchester',
    category: '',
    title: 'Laundry and dry cleaning manchester | Thelaundryman App',
    date: 'June 19, 2023',
    excerpt:
      'In today\'s fast-paced world, time has become a precious commodity. Juggling work, family, and social commitments can leave little room for mundane tasks like laundry and dry cleaning. Fortunately, in Manchester, there\'s a convenient solution at your fingertips—the thelaundryman app.',
    image: laundryDryCleaningManchesterImg,
    imageAlt: 'Dry cleaning Manchester',
    content: [
      {
        type: 'label',
        label: 'Introduction',
        text: 'In today\'s fast-paced world, time has become a precious commodity. Juggling work, family, and social commitments can leave little room for mundane tasks like laundry and dry cleaning. Fortunately, in Manchester, a city known for its vibrant lifestyle, there\'s a convenient solution at your fingertips—the thelaundryman app. With a few taps on your smartphone, you can access a range of professional laundry and dry cleaning services, making it easier than ever to simplify your life and maintain impeccable clothing hygiene. In this blog post, we\'ll explore the benefits of using thelaundryman app and how it can transform your laundry routine.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Convenience and Time-Saving: Imagine a world where you no longer have to sort, wash, dry, and fold piles of laundry. With thelaundryman app, this dream becomes a reality. The app offers a hassle-free way to delegate your laundry and dry cleaning needs to experienced professionals. Simply schedule a pickup and delivery time that suits you, and a reliable team will handle the rest. Whether you\'re at work, running errands, or enjoying leisure time, thelaundryman app ensures that your laundry is taken care of, allowing you to focus on more important aspects of your life.',
        ],
      },
      { type: 'image', src: choosingDressesImg, alt: 'Choosing dresses in a shop' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Professional Quality: When it comes to clothing, we all desire that fresh-out-of-the-store look and feel. The thelaundryman app partners with reputable laundry and dry cleaning facilities in Manchester, ensuring exceptional quality and attention to detail. Professional cleaners are trained to handle different fabric types, stains, and delicate garments with care. From delicate silk blouses to tailored suits, your clothing will be treated with the utmost respect, resulting in pristine results every time. Say goodbye to shrinkage, color fading, and pesky stains—the experts at thelaundryman app have got you covered.',
          'Personalized Service: Thelaundryman app believes in providing personalized service tailored to your specific needs. Through the app, you can customize your laundry preferences, including temperature settings, fabric softeners, and even hang-drying options. If you have any special instructions or requests, you can communicate directly with the cleaning professionals, ensuring your laundry is handled just the way you want it. This level of customization allows you to maintain the integrity of your clothing and ensures customer satisfaction.',
          'Environmentally Friendly: In an era of increasing environmental consciousness, thelaundryman app takes sustainability seriously. By utilizing efficient machines, eco-friendly detergents, and water-saving techniques, the app aims to minimize its environmental impact. The partnering laundry facilities follow strict guidelines to reduce water and energy consumption, as well as recycle and dispose of waste responsibly. By choosing thelaundryman app, you contribute to a greener future without compromising on cleanliness and hygiene.',
        ],
      },
      { type: 'image', src: dryCleanerDryer2Img, alt: 'Dry cleaning Manchester' },
      {
        type: 'label',
        label: 'Conclusion',
        text: 'Laundry and dry cleaning no longer have to be tedious chores that consume your valuable time. The thelaundryman app brings convenience, professionalism, personalization, and environmental responsibility to your doorstep in Manchester. With its user-friendly interface and efficient service, the app allows you to reclaim your time and enjoy fresh, clean clothes without lifting a finger. Simplify your life and experience the benefits of using thelaundryman app—your go-to solution for all your laundry and dry cleaning needs in Manchester. Download the app today and discover the joy of a hassle-free laundry routine.',
      },
    ],
  },
  {
    id: 'effortless-dry-cleaning-thelaundryman-app',
    category: '',
    title: 'Effortless Dry Cleaning Solutions at Your Fingertips: Discover TheLaundryman App',
    date: 'June 5, 2023',
    excerpt:
      'In today\'s fast-paced world, convenience is key. From ordering groceries to booking transportation, technology has revolutionized the way we manage our daily tasks. One area that has seen significant advancements is laundry services.',
    image: laundryServicesManchesterImg,
    imageAlt: 'Laundry services in Manchester',
    content: [
      {
        type: 'paragraph',
        text: 'In today\'s fast-paced world, convenience is key. From ordering groceries to booking transportation, technology has revolutionized the way we manage our daily tasks. One area that has seen significant advancements is laundry services. Gone are the days of spending hours washing, drying, and ironing clothes at home. With the rise of on-demand laundry services, getting your clothes professionally cleaned has become easier than ever. In this blog post, we introduce you to TheLaundryman App, a convenient and reliable dry cleaning solution available in the UK.',
      },
      {
        type: 'paragraph',
        text: 'TheLaundryman App: Your Trusted Laundry Partner TheLaundryman App is a cutting-edge platform designed to cater to all your dry cleaning needs. With just a few taps on your smartphone, you can have your clothes picked up, professionally cleaned, and delivered back to your doorstep. Say goodbye to the hassle of searching for a nearby dry cleaner or making time for drop-offs and pickups. TheLaundryman App brings the dry cleaning service right to your fingertips.',
      },
      { type: 'image', src: dryCleaningWinterCoatImg, alt: 'Dry cleaning winter coat' },
      { type: 'paragraph', text: 'Key Features and Benefits:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Seamless Ordering Process: The app provides a user-friendly interface that allows you to schedule laundry pickups at your convenience. Simply select a time slot, and a professional cleaner will collect your clothes from your home or office.',
          'Expert Dry Cleaning: TheLaundryman App partners with experienced and trusted dry cleaning professionals who are skilled in handling a variety of fabrics and garments. From delicate silk dresses to tailored suits, you can trust that your clothes will receive the utmost care and attention.',
          'Prompt Delivery: Once your clothes are cleaned and ready, TheLaundryman App ensures swift and efficient delivery back to you. You no longer have to worry about delays or long waiting times. Your freshly cleaned garments will be promptly returned to your specified location.',
          'Personalized Preferences: The app allows you to customize your laundry preferences. Whether you need a specific detergent or have special instructions for particular garments, TheLaundryman App accommodates your individual needs, ensuring your clothes are treated exactly as you desire.',
          'Transparent Pricing: TheLaundryman App offers transparent pricing, so you know exactly what to expect. The app provides upfront cost estimates based on the type and quantity of clothing, giving you peace of mind and avoiding any surprise charges.',
          'Track Your Order: Stay informed about the status of your laundry with the app\'s tracking feature. From pickup to delivery, you can track your order in real-time, giving you complete visibility throughout the entire process.',
        ],
      },
      { type: 'image', src: whatIsDryCleaningImg, alt: 'What is dry cleaning' },
      {
        type: 'label',
        label: 'Conclusion',
        text: 'With TheLaundryman App, dry cleaning has never been easier. Say goodbye to the traditional hassle of dropping off and picking up your clothes from the dry cleaner. Embrace the convenience of on-demand laundry services available at your fingertips. Simplify your life and make more time for what truly matters by entrusting your laundry needs to TheLaundryman App. Download the app today and experience the future of dry cleaning in the UK.',
      },
    ],
  },
  {
    id: 'benefits-professional-dry-cleaning-manchester',
    category: '',
    title: 'The Benefits of Professional Dry Cleaning Services in Manchester',
    date: 'May 23, 2023',
    excerpt:
      'In the bustling city of Manchester, where style and fashion are highly valued, maintaining the quality and appearance of your clothing is essential. This is where professional dry cleaning services come to the rescue.',
    image: dryCleaningManchesterImg,
    imageAlt: 'Dry Cleaning in Manchester',
    content: [
      {
        type: 'paragraph',
        text: 'In the bustling city of Manchester, where style and fashion are highly valued, maintaining the quality and appearance of your clothing is essential. This is where professional dry cleaning services come to the rescue. In this blog post, we will explore the numerous benefits of entrusting your garments to the expertise of professional dry cleaners in Manchester, specifically focusing on the advantages offered by the innovative thelaundryman app.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Superior Cleaning Techniques: Professional dry cleaners in Manchester possess extensive knowledge and expertise in dealing with a wide range of fabrics and garment types. They employ specialized cleaning techniques that are specifically designed to remove stubborn stains and blemishes effectively. From delicate silk dresses to tailored suits, these experts have the skills and equipment to ensure your clothes receive the utmost care and attention.',
          'Extends the Lifespan of Your Clothing: Regular wear, exposure to environmental factors, and improper cleaning methods can all contribute to the deterioration of your clothes over time. Professional dry cleaning services in Manchester can help prolong the lifespan of your garments. The meticulous cleaning process removes dirt, oil, and other contaminants that may damage the fabric fibers, allowing your clothes to maintain their original quality and appearance for longer.',
        ],
      },
      { type: 'image', src: dryCleanerDryerImg, alt: 'Man putting clothes in the dryer indoors' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Preservation of Delicate Fabrics: Certain fabrics, such as silk, wool, and cashmere, require special care to preserve their texture, color, and shape. Professional dry cleaners in Manchester are well-versed in handling these delicate fabrics, using gentle cleaning methods that prevent shrinkage, color fading, and distortion. By entrusting your delicate garments to experts, you can ensure they receive the specialized care they deserve.',
          'Time-Saving Convenience: With thelaundryman app, accessing professional dry cleaning services in Manchester has never been easier. The app allows you to schedule a pickup and delivery time that suits your busy schedule, eliminating the need to visit a physical dry cleaning establishment. The convenience of doorstep service saves you time and effort, giving you more freedom to focus on other important aspects of your life.',
          'Expert Stain Removal: Stubborn stains can be a nightmare to deal with, especially when traditional home cleaning methods fail to yield satisfactory results. Professional dry cleaners in Manchester possess the knowledge and resources to tackle even the most challenging stains effectively. From red wine spills to grease marks, they employ specialized stain removal techniques, increasing the chances of successfully eliminating the stains and restoring your garments to their pristine condition.',
        ],
      },
      { type: 'image', src: lintRollerImg, alt: 'Woman using a lint roller' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Enhanced Garment Appearance: Have you ever noticed how your clothes seem to regain their vibrancy and freshness after a professional dry cleaning service? That\'s because the process removes accumulated dirt, pollutants, and odors, leaving your garments looking and smelling revitalized. The meticulous attention to detail provided by professional dry cleaners in Manchester ensures that your clothes appear well-maintained and presentable, enhancing your overall image and confidence.',
        ],
      },
      {
        type: 'label',
        label: 'Conclusion',
        text: 'Professional dry cleaning services in Manchester, particularly with the convenience of thelaundryman app, offer a multitude of benefits for individuals seeking to preserve the quality and appearance of their garments. From superior cleaning techniques and extended garment lifespan to expert stain removal and enhanced overall appearance, entrusting your clothing to these professionals ensures that you receive the best care possible. Embrace the convenience and expertise offered by professional dry cleaners in Manchester to keep your wardrobe looking impeccable and to enjoy the countless advantages of their services.',
      },
    ],
  },
];

function parsePostDate(date: string): number {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

const importedBlogPosts = blogsImported as BlogPost[];
const blogSlugSet = new Set([
  ...handcraftedBlogPosts.map((post) => post.id),
  ...importedBlogPosts.map((post) => post.id),
]);

const normalizedImportedPosts: BlogPost[] = importedBlogPosts.map((post) => ({
  ...post,
  excerpt: post.excerpt
    ? normalizeLegacySiteLinks(post.excerpt, blogSlugSet)
    : post.excerpt,
  contentHtml: post.contentHtml
    ? sanitizeBlogHtml(normalizeLegacySiteLinks(post.contentHtml, blogSlugSet))
    : post.contentHtml,
}));

export const blogPosts: BlogPost[] = [...handcraftedBlogPosts, ...normalizedImportedPosts].sort(
  (a, b) => parsePostDate(b.date) - parsePostDate(a.date)
);

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getBlogPageCount(): number {
  return Math.max(1, Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE));
}

export function getBlogPostsForPage(page: number): BlogPost[] {
  const safePage = Math.min(Math.max(page, 1), getBlogPageCount());
  const start = (safePage - 1) * BLOG_POSTS_PER_PAGE;
  return blogPosts.slice(start, start + BLOG_POSTS_PER_PAGE);
}
