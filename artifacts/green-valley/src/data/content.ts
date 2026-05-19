import playArea from "@assets/5_1777532361971.jpg";
import humanBodyProject from "@assets/4_1777532372737.jpg";
import campusKids from "@assets/child3_1777532379562.jpg";
import rockingHorse from "@assets/child2_1777532388982.jpg";
import sportsDay from "@assets/child_1777532394875.jpg";
import newVideo from "@assets/WhatsApp_Video_2026-05-04_at_15.55.50_1778233677280.mp4";
import imgSeniorLunch from "@assets/WhatsApp_Image_2026-05-04_at_15.56.25_(2)_1778233704344.jpeg";
import imgSeniorClass from "@assets/WhatsApp_Image_2026-05-04_at_15.55.56_(1)_1778233734090.jpeg";

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Campus" | "Events" | "Sports" | "Cultural" | "Annual Day";
  type?: "image" | "video";
  poster?: string;
};

export const galleryItems: GalleryItem[] = [
  { src: newVideo, alt: "School activities video", category: "Campus", type: "video", poster: campusKids },
  { src: "/gallery-video1.mp4", alt: "School life video", category: "Events", type: "video", poster: playArea },
  { src: imgSeniorLunch, alt: "Senior students having lunch together", category: "Campus" },
  { src: imgSeniorClass, alt: "Senior students attentively in classroom", category: "Campus" },
  { src: "/gallery7.jpeg", alt: "Happy students in classroom", category: "Campus" },
  { src: "/gallery4.jpeg", alt: "Students studying in classroom", category: "Campus" },
  { src: "/gallery6.jpeg", alt: "Students in classroom activity", category: "Campus" },
  { src: "/gallery5.jpeg", alt: "Teacher with students during lesson", category: "Events" },
  { src: "/gallery2.jpeg", alt: "Teacher with young students", category: "Events" },
  { src: "/gallery3.jpeg", alt: "Students having lunch together", category: "Campus" },
  { src: "/gallery1.jpeg", alt: "Young student resting with school bag", category: "Campus" },
  { src: playArea, alt: "Children enjoying the play area on the school lawn", category: "Campus" },
  { src: humanBodyProject, alt: "Student presenting 'The Human Body' classroom project", category: "Events" },
  { src: campusKids, alt: "Young students in front of the school building", category: "Campus" },
  { src: rockingHorse, alt: "Children playing on the rocking horse outside the school bus", category: "Campus" },
  { src: sportsDay, alt: "Students racing on Sports Day in school blazers", category: "Sports" },
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
  subject: string;
  qualification: string;
  experience: number;
  department: "Science" | "Mathematics" | "Languages" | "Computer" | "Arts & Sports" | "Leadership";
  initials: string;
};

export const faculty: Faculty[] = [
  // Leadership
  { name: "Mr. Jagmohan Sharma", role: "Principal",      subject: "School Administration", qualification: "Ph.D. Education, M.Ed.", experience: 28, department: "Leadership",    initials: "JS" },
  { name: "Mr. Sandeep Rana",    role: "Vice Principal", subject: "School Management",     qualification: "M.Sc., M.Ed.",          experience: 22, department: "Leadership",    initials: "SR" },

  // Science — most teachers (4)
  { name: "Mr. Vikram Saini",    role: "HOD — Science",             subject: "Physics & Science",  qualification: "M.Sc. Physics, M.Ed.", experience: 18, department: "Science",      initials: "VS" },
  { name: "Mrs. Kavita Sharma",  role: "Senior Physics Teacher",    subject: "Physics",            qualification: "M.Sc. Physics, B.Ed.", experience: 14, department: "Science",      initials: "KS" },
  { name: "Mr. Mohit Bansal",    role: "Senior Chemistry Teacher",  subject: "Chemistry",          qualification: "M.Sc. Chemistry, B.Ed.", experience: 12, department: "Science",   initials: "MB" },
  { name: "Mrs. Geeta Devi",     role: "Senior Biology Teacher",    subject: "Biology",            qualification: "M.Sc. Biology, B.Ed.", experience: 10, department: "Science",     initials: "GD" },

  // Languages (2)
  { name: "Mrs. Pooja Aggarwal", role: "Senior English Teacher",    subject: "English",            qualification: "M.A. English, B.Ed.",  experience: 15, department: "Languages",    initials: "PA" },
  { name: "Mr. Naresh Kumar",    role: "Senior Hindi Teacher",      subject: "Hindi",              qualification: "M.A. Hindi, B.Ed.",    experience: 13, department: "Languages",    initials: "NK" },

  // Arts & Sports (2)
  { name: "Ms. Neha Chauhan",    role: "Music & Performing Arts",   subject: "Music & Arts",       qualification: "B.F.A., Diploma in Music", experience: 9,  department: "Arts & Sports", initials: "NC" },
  { name: "Mr. Sukhwinder Singh",role: "Sports Director",           subject: "Physical Education", qualification: "B.P.Ed., NIS Certified",   experience: 11, department: "Arts & Sports", initials: "SS" },

  // Mathematics (1)
  { name: "Mrs. Rekha Goyal",    role: "HOD — Mathematics",         subject: "Mathematics",        qualification: "M.Sc. Maths, M.Ed.",   experience: 16, department: "Mathematics",   initials: "RG" },

  // Computer (1)
  { name: "Mr. Rahul Malik",     role: "Computer Science Teacher",  subject: "Computer Science",   qualification: "M.C.A., B.Ed.",        experience: 8,  department: "Computer",      initials: "RM" },
];
