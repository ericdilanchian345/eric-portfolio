import { NextResponse } from "next/server";

const projects = [
  {
    number: "01",
    title: "Rockstar",
    category: {
      en: "Web Design & Development",
      fa: "طراحی و توسعه وب",
    },
    description: {
      en: "A modern web experience built with a strong visual identity, responsive layouts, and attention to detail.",
      fa: "یک تجربه وب مدرن با هویت بصری قدرتمند، طراحی واکنش‌گرا و توجه به جزئیات.",
    },
    image: "/images/screenshoot.jpg",
    href: "https://rockstar-app-5wjg.vercel.app/",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Project Two",
    category: {
      en: "Web Design",
      fa: "طراحی وب",
    },
    description: {
      en: "A clean and modern website concept focused on usability, visual consistency, and responsive design.",
      fa: "طرحی مدرن و مینیمال با تمرکز بر کاربردپذیری، هماهنگی بصری و طراحی واکنش‌گرا.",
    },
    image: "/images/screenshoot2.jpg",
    href: "https://portfoliogit-ten.vercel.app/",
    tags: ["UI/UX", "Web Design", "Responsive"],
  },
  {
    number: "03",
    title: "Project Three",
    category: {
      en: "Brand Identity",
      fa: "هویت بصری",
    },
    description: {
      en: "A distinctive visual direction designed to create a consistent and memorable brand experience.",
      fa: "هویتی بصری متمایز برای ساخت تجربه‌ای یکپارچه و ماندگار از برند.",
    },
    image: "/images/screenshoot3.jpg",
    href: "https://shop-app-five-woad.vercel.app/",
    tags: ["Branding", "Visual Design", "Identity"],
  },
  {
    number: "04",
    title: "Project Four",
    category: {
      en: "Development",
      fa: "توسعه وب",
    },
    description: {
      en: "A responsive digital product built around performance, accessibility, and a smooth user experience.",
      fa: "محصولی دیجیتال و واکنش‌گرا با تمرکز بر سرعت، دسترس‌پذیری و تجربه کاربری روان.",
    },
    image: "/images/project-4.jpg",
    href: "",
    tags: ["React", "Development", "Performance"],
  },
];

export async function GET() {
  return NextResponse.json(projects);
}