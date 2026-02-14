
import { Course } from './types';

export const CATEGORIES = ['All', 'Rust', 'SmartContract', 'React', 'Python', 'Go', 'DevOps'];

export const COURSES: Course[] = [
  { 
    id: 1, 
    title: 'Mastering Rust Systems', 
    category: 'Rust', 
    level: 'Professional', 
    price: 129, 
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800', 
    description: 'Deep dive into low-level memory management and high-performance system programming.',
    longDescription: 'Rust is the language of the future for systems programming. This course covers memory safety, ownership, lifetimes, and zero-cost abstractions in depth.'
  },
  { 
    id: 2, 
    title: 'Solidity & Ethereum', 
    category: 'SmartContract', 
    level: 'Advanced', 
    price: 149, 
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800', 
    description: 'Write secure decentralized code and deploy robust dApps on the Ethereum blockchain.',
    longDescription: 'Learn how to build, test, and deploy smart contracts. We cover EVM internals, gas optimization, and advanced security patterns like reentrancy guards.'
  },
  { 
    id: 3, 
    title: 'Next.js 15 Masterclass', 
    category: 'React', 
    level: 'Beginner', 
    price: 49, 
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', 
    description: 'Build lightning fast web apps with the latest server components and app router patterns.',
    longDescription: 'Master the most popular React framework. Learn about Server Components, Server Actions, and the new caching mechanisms in Next.js 15.'
  },
  { 
    id: 4, 
    title: 'Rust Web Backend (Actix)', 
    category: 'Rust', 
    level: 'Advanced', 
    price: 89, 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', 
    description: 'Build the fastest web servers on the planet using the Actix-web ecosystem.',
    longDescription: 'Learn why Rust is becoming the go-to for high-concurrency backends. This course covers middleware, database integration with SQLx, and async/await patterns.'
  },
  { 
    id: 5, 
    title: 'Smart Contract Security Audit', 
    category: 'SmartContract', 
    level: 'Professional', 
    price: 199, 
    image: 'https://images.unsplash.com/photo-1643101809754-43a91784611a?w=800', 
    description: 'Audit and hack-proof your contracts. Learn the mindset of a security researcher.',
    longDescription: 'Security is paramount in Web3. Learn how to identify common vulnerabilities like integer overflow, flash loan attacks, and oracle manipulation.'
  },
  { 
    id: 6, 
    title: 'Fullstack Go with Templ', 
    category: 'Go', 
    level: 'Intermediate', 
    price: 79, 
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800', 
    description: 'Build modern hypermedia-driven web applications using Go and HTMX.',
    longDescription: 'Simplify your stack. Learn how to use Go as a powerful backend and frontend templating engine without the complexity of heavy JS frameworks.'
  }
];

export const COURSE_TOPICS = [
  '01. Introduction & Setup',
  '02. Core Architecture',
  '03. Syntax & Deep Dive',
  '04. Advanced Patterns',
  '05. Security & Best Practices',
  '06. Deployment & Monitoring'
];
