"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type LocalizedText = {
  en: string;
  fa: string;
};

type Project = {
  number: string;
  title: string;
  category: LocalizedText;
  description: LocalizedText;
  image: string;
  href: string;
  tags: string[];
};

export default function Home() {
  const { lang, isRTL } = useLanguage();
  const pageRef = useRef<HTMLElement | null>(null);
  const isFa = lang === "fa";

  // ==================== PROJECT STATE ====================

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // ==================== FETCH PROJECTS FROM API ====================

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      setProjectsLoading(true);
      setProjectsError(false);

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

        const response = await fetch(`${apiUrl}/api/projects`);

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data: Project[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The API response is not an array.");
        }

        if (!cancelled) {
          setProjects(data);
          setProjectsError(false);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);

        if (!cancelled) {
          setProjectsError(true);
        }
      } finally {
        if (!cancelled) {
          setProjectsLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  // ==================== SCROLL RESTORATION ====================

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  // ==================== SERVICES ====================

  const services = [
    {
      number: "01",
      title: isFa ? "طراحی وب‌سایت" : "Web Design",
      description: isFa
        ? "طراحی وب‌سایت‌های مدرن، زیبا و کاربرپسند با تمرکز بر تجربه کاربری."
        : "Modern, beautiful, and user-friendly website designs focused on great user experiences.",
    },
    {
      number: "02",
      title: isFa ? "توسعه وب" : "Web Development",
      description: isFa
        ? "ساخت وب‌سایت‌های سریع، واکنش‌گرا و حرفه‌ای با فناوری‌های روز."
        : "Fast, responsive, and professional websites built with modern technologies.",
    },
    {
      number: "03",
      title: isFa ? "هویت بصری" : "Visual Identity",
      description: isFa
        ? "خلق هویت بصری منحصربه‌فرد برای متمایز کردن برند شما."
        : "Creating a distinctive visual identity that makes your brand stand out.",
    },
    {
      number: "04",
      title: isFa ? "تجربه کاربری" : "User Experience",
      description: isFa
        ? "طراحی تجربه‌هایی ساده و جذاب که ارتباط کاربران با برند شما را بهتر می‌کنند."
        : "Designing simple, engaging experiences that connect people with your brand.",
    },
  ];

  // ==================== GSAP ANIMATIONS ====================

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      // HERO

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .from("[data-hero-badge]", {
          y: 20,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          "[data-hero-title]",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.25"
        )
        .from(
          "[data-hero-description]",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          "[data-hero-actions]",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          "[data-hero-stats]",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          "[data-hero-visual]",
          {
            x: isRTL ? -30 : 30,
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
          },
          "-=0.7"
        );

      // SECTION HEADINGS

      gsap.utils
        .toArray<HTMLElement>("[data-section-heading]")
        .forEach((heading) => {
          gsap.from(heading, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              once: true,
            },
          });
        });

      // ABOUT

      gsap.from("[data-about-content]", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          once: true,
        },
      });

      // SERVICES

      gsap.from("[data-service-card]", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#services",
          start: "top 75%",
          once: true,
        },
      });

      // CONTACT

      gsap.from("[data-contact-content]", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          once: true,
        },
      });
    },
    {
      scope: pageRef,
      dependencies: [isRTL, lang],
      revertOnUpdate: true,
    }
  );

  // ==================== PROJECT CARD ANIMATIONS ====================

  useGSAP(
    () => {
      if (projects.length === 0) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      gsap.from("[data-work-card]", {
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#works",
          start: "top 78%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    },
    {
      scope: pageRef,
      dependencies: [projects.length],
      revertOnUpdate: true,
    }
  );

  return (
    <main
      ref={pageRef}
      id="home"
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-[#080808] text-white selection:bg-orange-500 selection:text-black"
    >
      <Navbar />

      {/* ==================== HERO ==================== */}

      <section className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-orange-500/[0.08] blur-[120px]" />

          <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-orange-700/[0.06] blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* HERO TEXT */}

          <div>
            <div
              data-hero-badge
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />

              <span className="text-xs font-medium tracking-[0.15em] text-white/60">
                {isFa ? "استودیوی خلاق دیجیتال" : "CREATIVE DIGITAL STUDIO"}
              </span>
            </div>

            <h1
              data-hero-title
              className="max-w-3xl text-5xl font-normal leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {isFa ? (
                <>
                  تجربه‌های
                  <br />
                  <span className="text-orange-500">دیجیتال</span>
                  <br />
                  متفاوت می‌سازیم.
                </>
              ) : (
                <>
                  We create
                  <br />
                  <span className="text-orange-500">digital</span>
                  <br />
                  experiences.
                </>
              )}
            </h1>

            <p
              data-hero-description
              className="mt-8 max-w-xl text-base leading-8 text-white/50 sm:text-lg sm:leading-9"
            >
              {isFa
                ? "ایده‌های شما را به تجربه‌های دیجیتال جذاب تبدیل می‌کنیم؛ با طراحی خلاقانه، فناوری مدرن و توجه به جزئیات."
                : "We turn your ideas into meaningful digital experiences through creative design, modern technology, and attention to every detail."}
            </p>

            <div
              data-hero-actions
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#works"
                className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-black transition duration-300 hover:bg-orange-400 hover:shadow-[0_0_35px_rgba(249,115,22,0.2)]"
              >
                {isFa ? "مشاهده نمونه‌کارها" : "Explore Our Work"}

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {isRTL ? "←" : "→"}
                </span>
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:border-orange-500/60 hover:bg-white/[0.04]"
              >
                {isFa ? "شروع همکاری" : "Get in Touch"}
              </a>
            </div>

            {/* STATS */}

            <div
              data-hero-stats
              className="mt-16 grid max-w-lg grid-cols-3 gap-5 border-t border-white/10 pt-8"
            >
              <div>
                <p className="text-3xl font-black sm:text-4xl">
                  03<span className="text-orange-500">+</span>
                </p>
                <p className="mt-2 text-xs leading-6 text-white/40 sm:text-sm">
                  {isFa ? "سال تجربه" : "Years Experience"}
                </p>
              </div>

              <div>
                <p className="text-3xl font-black sm:text-4xl">
                  20<span className="text-orange-500">+</span>
                </p>
                <p className="mt-2 text-xs leading-6 text-white/40 sm:text-sm">
                  {isFa ? "پروژه تکمیل‌شده" : "Projects Completed"}
                </p>
              </div>

              <div>
                <p className="text-3xl font-black sm:text-4xl">
                  100<span className="text-orange-500">%</span>
                </p>
                <p className="mt-2 text-xs leading-6 text-white/40 sm:text-sm">
                  {isFa ? "تعهد به کیفیت" : "Quality Focus"}
                </p>
              </div>
            </div>
          </div>

          {/* HERO PORTRAIT */}

          <div
            data-hero-visual
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute inset-10 rounded-full bg-orange-500/15 blur-[90px]" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] shadow-2xl shadow-orange-950/20">
              <img
                src="/images/portfolio.jpg"
                alt={isFa ? "عکس شخصی من" : "My Portrait"}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

              <div className="absolute inset-x-6 top-6 flex items-start justify-between sm:inset-x-8 sm:top-8">
                <div>
                  <p className="text-xs font-semibold tracking-[0.25em] text-white/80">
                    MY.STUDIO
                  </p>
                  <p className="mt-2 text-xs text-white/60">
                    {isFa ? "خلاقیت بدون مرز" : "CREATIVITY UNLIMITED"}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-500/50 bg-black/20 text-xl text-orange-400 backdrop-blur-md">
                  ✳
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="mb-5 h-px w-full bg-white/20" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold text-white sm:text-2xl">
                      {isFa ? "ایده. طراحی. اجرا." : "IDEA. DESIGN. BUILD."}
                    </p>

                    <p className="mt-2 text-sm text-white/60">
                      {isFa
                        ? "ساختن آینده دیجیتال"
                        : "Building the digital future"}
                    </p>
                  </div>

                  <span className="text-3xl text-orange-500">↗</span>
                </div>
              </div>
            </div>

            {/* FLOATING INFO */}

            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/10 bg-[#111111]/95 px-4 py-4 shadow-2xl backdrop-blur-md sm:-left-5 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-lg text-orange-500">
                  ✦
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    {isFa ? "طراحی خلاقانه" : "Creative Design"}
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {isFa ? "با نگاهی متفاوت" : "A different perspective"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}

        <a
          href="#about"
          aria-label={isFa ? "رفتن به بخش درباره ما" : "Scroll to About"}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/30 transition hover:text-orange-500 md:flex"
        >
          <span className="text-[10px] tracking-[0.25em]">
            {isFa ? "بیشتر بدانید" : "SCROLL TO EXPLORE"}
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-orange-500/60 to-transparent" />
        </a>
      </section>

      {/* ==================== ABOUT ==================== */}

      <section
        id="about"
        className="relative border-t border-white/[0.06] px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-24">
          <div data-about-content>
            <p className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-orange-500">
              <span className="h-px w-8 bg-orange-500" />
              {isFa ? "درباره ما" : "ABOUT US"}
            </p>

            <h2 className="max-w-xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {isFa ? (
                <>
                  خلاقیت در کنار
                  <br />
                  <span className="text-white/40">فناوری.</span>
                </>
              ) : (
                <>
                  Creativity
                  <br />
                  meets
                  <br />
                  <span className="text-white/40">technology.</span>
                </>
              )}
            </h2>
          </div>

          <div
            data-about-content
            className="flex flex-col justify-center"
          >
            <p className="text-lg leading-9 text-white/60 sm:text-xl sm:leading-10">
              {isFa
                ? "ما معتقدیم هر ایده بزرگ، شایسته یک اجرای متفاوت است. در MY.STUDIO، طراحی خلاقانه و فناوری مدرن را کنار هم قرار می‌دهیم تا تجربه‌هایی بسازیم که دیده شوند و در ذهن بمانند."
                : "We believe every great idea deserves an exceptional execution. At MY.STUDIO, we combine creative thinking with modern technology to build digital experiences that stand out and stay memorable."}
            </p>

            <p className="mt-6 leading-8 text-white/40">
              {isFa
                ? "از اولین طرح تا آخرین جزئیات، هدف ما ساخت محصولاتی است که علاوه بر زیبایی، کاربردی، سریع و ماندگار باشند."
                : "From the first sketch to the final detail, our goal is to create products that are not only beautiful, but also useful, fast, and memorable."}
            </p>

            <a
              href="#services"
              className="mt-8 inline-flex w-fit items-center gap-3 text-sm font-bold text-orange-500 transition hover:text-orange-400"
            >
              {isFa ? "با خدمات ما آشنا شوید" : "Discover Our Services"}
              <span>{isRTL ? "←" : "→"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}

      <section
        id="services"
        className="border-t border-white/[0.06] bg-[#0b0b0b] px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-orange-500">
                <span className="h-px w-8 bg-orange-500" />
                {isFa ? "خدمات ما" : "WHAT WE DO"}
              </p>

              <h2
                data-section-heading
                className="text-4xl font-black sm:text-5xl lg:text-6xl"
              >
                {isFa ? (
                  <>
                    چه کاری
                    <span className="text-orange-500"> انجام می‌دهیم؟</span>
                  </>
                ) : (
                  <>
                    What we
                    <span className="text-orange-500"> do.</span>
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-md leading-8 text-white/40">
              {isFa
                ? "از ایده‌پردازی تا اجرا، برای ساختن تجربه‌ای کامل در کنار شما هستیم."
                : "From the first idea to the final launch, we help bring your digital vision to life."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.number}
                data-service-card
                className="group relative flex min-w-0 flex-col bg-[#0b0b0b] p-8 transition-colors duration-300 hover:bg-[#12100e] sm:p-10 lg:p-12"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium text-orange-500">
                    / {service.number}
                  </span>

                  <span className="text-2xl text-white/30 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange-500">
                    {isRTL ? "↖" : "↗"}
                  </span>
                </div>

                <h3 className="mt-12 break-words text-2xl font-bold sm:text-3xl">
                  {service.title}
                </h3>

                <p className="mt-5 max-w-md break-words leading-8 text-white/40">
                  {service.description}
                </p>

                <div className="mt-8 h-px w-10 shrink-0 bg-orange-500/50 transition-all duration-500 group-hover:w-20" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WORKS / PROJECTS ==================== */}

      <section
        id="works"
        className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#080808] px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
      >
        {/* BACKGROUND LIGHTING */}

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-600/[0.045] blur-[150px]" />

          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/[0.04] blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* SECTION HEADER */}

          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-20">
            <div>
              <p className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-orange-500">
                <span className="h-px w-8 bg-orange-500" />
                {isFa ? "نمونه‌کارهای منتخب" : "SELECTED WORK"}
              </p>

              <h2
                data-section-heading
                className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl"
              >
                {isFa ? (
                  <>
                    ایده‌ها در
                    <span className="text-orange-500"> عمل.</span>
                  </>
                ) : (
                  <>
                    Ideas in
                    <span className="text-orange-500"> action.</span>
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-md leading-8 text-white/40">
              {isFa
                ? "چهار پروژه منتخب؛ ترکیبی از طراحی خلاقانه، توسعه مدرن و توجه به جزئیات."
                : "Four selected projects combining creative design, modern development, and attention to detail."}
            </p>
          </div>

          {/* PROJECT GRID */}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7">
            {projectsLoading ? (
              <p className="col-span-full py-12 text-center text-white/50">
                {isFa
                  ? "در حال بارگذاری پروژه‌ها..."
                  : "Loading projects..."}
              </p>
            ) : projectsError ? (
              <div className="col-span-full py-12 text-center">
                <p className="text-white/60">
                  {isFa
                    ? "دریافت پروژه‌ها ناموفق بود. مطمئن شوید بک‌اند در حال اجراست."
                    : "Failed to load projects. Make sure the backend is running."}
                </p>

                <button
                  type="button"
                  onClick={() => setRetryCount((count) => count + 1)}
                  className="mt-4 rounded-full border border-orange-500/40 px-5 py-2 text-sm text-orange-400 transition hover:bg-orange-500/10"
                >
                  {isFa ? "تلاش مجدد" : "Try again"}
                </button>
              </div>
            ) : projects.length === 0 ? (
              <p className="col-span-full py-12 text-center text-white/50">
                {isFa
                  ? "پروژه‌ای برای نمایش وجود ندارد."
                  : "No projects available."}
              </p>
            ) : (
              projects.map((project) => {
                const projectContent = (
                  <>
                    {/* IMAGE CARD */}

                    <div className="relative isolate aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101010] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-orange-500 group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.45),0_0_35px_rgba(249,115,22,0.08)]">
                      {/* BACKGROUND */}

                      <div className="absolute inset-0 bg-gradient-to-br from-[#20160f] via-[#111111] to-[#080808]" />

                      {/* PROJECT IMAGE */}

                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* IMAGE OVERLAY */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />

                      {/* TOP LABEL */}

                      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
                        <span className="rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[10px] font-semibold tracking-[0.2em] text-white/80 backdrop-blur-md">
                          PROJECT / {project.number}
                        </span>

                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-black">
                          {isRTL ? "↖" : "↗"}
                        </span>
                      </div>

                      {/* BOTTOM IMAGE LABEL */}

                      <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                        <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-black/50 px-3 py-2 text-[10px] font-bold tracking-[0.15em] text-orange-300 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          {project.category[isFa ? "fa" : "en"]}
                        </span>
                      </div>

                      {/* HOVER BORDER */}

                      <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/0 transition-colors duration-500 group-hover:border-orange-400/30" />
                    </div>

                    {/* PROJECT INFORMATION */}

                    <div className="px-1 pb-2 pt-6 sm:pt-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-orange-400 sm:text-3xl">
                            {project.title}
                          </h3>

                          <p className="mt-3 max-w-lg text-sm leading-7 text-white/45 transition-colors duration-300 group-hover:text-white/65">
                            {project.description[isFa ? "fa" : "en"]}
                          </p>
                        </div>

                        <span className="mt-1 shrink-0 text-xl text-orange-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                          {isRTL ? "↖" : "↗"}
                        </span>
                      </div>

                      {/* TECHNOLOGY TAGS */}

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium tracking-wide text-white/45 transition-colors duration-300 group-hover:border-orange-500/20 group-hover:text-white/65"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 h-px w-full origin-right bg-white/[0.08]" />
                    </div>
                  </>
                );

                return (
                  <article
                    key={project.number}
                    data-work-card
                    className="group min-w-0"
                  >
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${isFa ? "مشاهده پروژه" : "View project"}: ${project.title}`}
                        className="block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
                      >
                        {projectContent}
                      </a>
                    ) : (
                      <div className="block h-full rounded-2xl">
                        {projectContent}
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>

          {/* SECTION FOOTNOTE */}

          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:mt-16">
            <span className="h-px w-12 bg-orange-500/50" />

            <p className="max-w-xl text-sm leading-7 text-white/30">
              {isFa
                ? "برای مشاهده جزئیات پروژه‌های دارای لینک، روی کارت آن‌ها کلیک کنید."
                : "Click a linked project card to explore the project."}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}

      <section
        id="contact"
        className="relative overflow-hidden border-t border-white/[0.06] px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[120px]" />

        <div
          data-contact-content
          className="relative mx-auto max-w-5xl text-center"
        >
          <p className="mb-8 inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-orange-500">
            <span className="h-px w-8 bg-orange-500" />
            {isFa ? "بیایید صحبت کنیم" : "LET'S CONNECT"}
            <span className="h-px w-8 bg-orange-500" />
          </p>

          <h2
            data-section-heading
            className="text-4xl font-black leading-tight sm:text-6xl lg:text-8xl"
          >
            {isFa ? (
              <>
                ایده‌ای در ذهن داری؟
                <br />
                <span className="text-orange-500">با هم بسازیمش.</span>
              </>
            ) : (
              <>
                Have an idea?
                <br />
                <span className="text-orange-500">Let&apos;s build it.</span>
              </>
            )}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/50 sm:text-lg sm:leading-9">
            {isFa
              ? "درباره ایده‌ات با من صحبت کن. شاید شروع یک همکاری فوق‌العاده همین‌جا باشد."
              : "Tell me about your idea. Your next great digital project could start right here."}
          </p>

          <a
            href="mailto:hello@example.com"
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-orange-500 px-8 py-5 text-sm font-bold text-black transition duration-300 hover:bg-orange-400 hover:shadow-[0_0_35px_rgba(249,115,22,0.2)]"
          >
            {isFa ? "برای من ایمیل بفرست" : "Send Me an Email"}

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              {isRTL ? "←" : "→"}
            </span>
          </a>

          <p className="mt-6 text-sm text-white/30">hello@example.com</p>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}

      <footer className="border-t border-white/[0.08] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <a
            href="#home"
            className="text-xl font-black tracking-wider text-white"
          >
            MY<span className="text-orange-500">.</span>STUDIO
          </a>

          <p className="text-center text-xs leading-6 text-white/35">
            {isFa
              ? "طراحی و توسعه با خلاقیت و دقت."
              : "Designed and built with creativity and care."}
          </p>

          <p className="text-xs text-white/35">
            © 2026 MY.STUDIO.{" "}
            {isFa ? "تمام حقوق محفوظ است." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </main>
  );
}