import campus from "@/assets/gallery-campus.jpg";
import classroom from "@/assets/hero-classroom.jpg";
import sports from "@/assets/hero-sports.jpg";
import library from "@/assets/gallery-library.jpg";
import cultural from "@/assets/gallery-cultural.jpg";
import science from "@/assets/gallery-science.jpg";
import art from "@/assets/gallery-art.jpg";
import primary from "@/assets/gallery-primary.jpg";

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Campus" | "Events" | "Sports" | "Cultural" | "Annual Day";
};

export const galleryItems: GalleryItem[] = [
  { src: campus, alt: "Aerial view of the school campus", category: "Campus" },
  { src: classroom, alt: "Smart classroom in session", category: "Campus" },
  { src: sports, alt: "Students playing on the sports field", category: "Sports" },
  { src: library, alt: "School library", category: "Campus" },
  { src: cultural, alt: "Cultural performance on stage", category: "Cultural" },
  { src: science, alt: "Students working in the science lab", category: "Events" },
  { src: art, alt: "Art class with easels and paintings", category: "Cultural" },
  { src: primary, alt: "Primary children with teacher on the lawn", category: "Annual Day" },
];

export type Announcement = {
  date: string;
  category: "Notice" | "Event" | "Holiday" | "Achievement";
  title: string;
  excerpt: string;
  pinned?: boolean;
};

export const announcements: Announcement[] = [
  {
    date: "2025-04-22",
    category: "Notice",
    title: "Admissions Open for Academic Session 2025–26",
    excerpt: "Online inquiry forms are now being accepted for all grades. Limited seats available.",
    pinned: true,
  },
  {
    date: "2025-04-18",
    category: "Event",
    title: "Annual Sports Day — May 5, 2025",
    excerpt: "Inter-house athletics, team games, and prize distribution. Parents are warmly invited.",
    pinned: true,
  },
  {
    date: "2025-04-12",
    category: "Achievement",
    title: "Class XII Toppers Shine in CBSE Board Results",
    excerpt: "Heartiest congratulations to our students for an outstanding performance this year.",
  },
  {
    date: "2025-04-05",
    category: "Holiday",
    title: "Summer Break Schedule Announced",
    excerpt: "School will remain closed from June 1 to July 5. Reopening on July 6, 2025.",
  },
  {
    date: "2025-03-28",
    category: "Event",
    title: "Inter-School Science Quiz — Hosted at Green Valley",
    excerpt: "Schools from across Kaithal participated in a spirited day of curiosity.",
  },
  {
    date: "2025-03-15",
    category: "Notice",
    title: "Parent–Teacher Meeting — Grades 6 to 10",
    excerpt: "Scheduled for Saturday, 22 March, between 9:30 AM and 12:30 PM.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "What I love most about Green Valley is how the teachers truly know my daughter. She comes home every day with a story, a question, or a new word. That, to me, is real learning.",
    name: "Sunita Sharma",
    role: "Parent, Grade 4",
  },
  {
    quote:
      "The science lab is my favourite place in school. Our teachers let us try things, fail, and try again. I want to be a doctor and Green Valley is helping me get there.",
    name: "Aarav Singh",
    role: "Student, Grade 10",
  },
  {
    quote:
      "Choosing Green Valley was the best decision we made for our son. The discipline, the warmth, and the focus on values — you can feel it from the moment you walk in.",
    name: "Rajesh & Meena Kumar",
    role: "Parents, Grade 7",
  },
  {
    quote:
      "I joined Green Valley in Grade 6 and graduated last year. The confidence and clarity I gained here have stayed with me through college. Forever grateful.",
    name: "Priya Yadav",
    role: "Alumna, Batch of 2024",
  },
];

export type Faculty = {
  name: string;
  role: string;
  department: "Science" | "Mathematics" | "Languages" | "Humanities" | "Arts & Sports" | "Leadership";
  initials: string;
};

export const faculty: Faculty[] = [
  { name: "Dr. Anita Verma", role: "Principal", department: "Leadership", initials: "AV" },
  { name: "Mr. Sandeep Rana", role: "Vice Principal", department: "Leadership", initials: "SR" },
  { name: "Mrs. Rekha Goyal", role: "HOD — Mathematics", department: "Mathematics", initials: "RG" },
  { name: "Mr. Vikram Saini", role: "HOD — Science", department: "Science", initials: "VS" },
  { name: "Mrs. Pooja Aggarwal", role: "Senior English Teacher", department: "Languages", initials: "PA" },
  { name: "Mr. Naresh Kumar", role: "Senior Hindi Teacher", department: "Languages", initials: "NK" },
  { name: "Mrs. Kavita Sharma", role: "Senior Physics Teacher", department: "Science", initials: "KS" },
  { name: "Mr. Mohit Bansal", role: "Senior Chemistry Teacher", department: "Science", initials: "MB" },
  { name: "Mrs. Geeta Devi", role: "Senior Biology Teacher", department: "Science", initials: "GD" },
  { name: "Mr. Rahul Malik", role: "Social Science", department: "Humanities", initials: "RM" },
  { name: "Ms. Neha Chauhan", role: "Music & Performing Arts", department: "Arts & Sports", initials: "NC" },
  { name: "Mr. Sukhwinder Singh", role: "Sports Director", department: "Arts & Sports", initials: "SS" },
];
