"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { name: "Home", href: "#home", fa: "خانه" },
  { name: "About", href: "#about", fa: "درباره من" },
  { name: "Services", href: "#services", fa: "خدمات" },
  { name: "Works", href: "#works", fa: "نمونه‌کارها" },
  { name: "Contact", href: "#contact", fa: "تماس" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(true);

  const lastScrollY = useRef(0);

  const { lang, setLang, isRTL } = useLanguage();

  // Change language
  const toggleLanguage = () => {
    setLang(lang === "en" ? "fa" : "en");
    setMenuOpen(false);
  };

  // Smooth navigation
  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setMenuOpen(false);

    const targetId = href.replace("#", "");

    // Update the URL hash
    window.history.pushState(null, "", href);

    // Find the target section
    const target = document.getElementById(targetId);

    if (!target) {
      // Fallback if the target section doesn't exist
      if (targetId === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      return;
    }

    // Account for the fixed navbar height
    const navbarOffset = 80;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    // Respect the user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // Show navbar when scrolling up, hide when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY < 50 ||
        currentScrollY < lastScrollY.current
      ) {
        setShow(true);
      } else {
        setShow(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      dir={isRTL ? "rtl" : "ltr"}
      className={`fixed left-0 top-0 z-50 w-full transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
       
        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => handleNavigation(event, "#home")}
          className={`shrink-0 text-xl font-normal text-white ${
            isRTL ? "tracking-normal" : "tracking-wider"
          }`}
          aria-label={isRTL ? "صفحه اصلی اریک دیلانچیان" : "Eric Dilanchian Home"}
        >
          {isRTL ? (
            <>
              اریک<span className="text-orange-500">.</span>دیلانچیان
            </>
          ) : (
            <>
              ERIC<span className="text-orange-500">.</span>DILANCHIAN
            </>
          )}
        </a>


        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) =>
                  handleNavigation(event, link.href)
                }
                className="group relative py-2 text-sm font-medium text-white/70 transition hover:text-white"
              >
                {isRTL ? link.fa : link.name}

                <span
                  className={`absolute bottom-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full ${
                    isRTL ? "right-0" : "left-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={isRTL ? "تغییر زبان" : "Change language"}
            className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-sm text-white/80 transition hover:border-orange-500/60 hover:text-white"
          >
            <Languages size={17} />
            <span>{lang === "en" ? "FA" : "EN"}</span>
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(event) =>
              handleNavigation(event, "#contact")
            }
            className="hidden rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-orange-400 sm:inline-flex"
          >
            {isRTL ? "شروع همکاری" : "Let's Talk"}
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={
              menuOpen
                ? isRTL
                  ? "بستن منو"
                  : "Close menu"
                : isRTL
                  ? "باز کردن منو"
                  : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-orange-500/60 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#08080a]/95 px-6 py-6 shadow-2xl backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) =>
                    handleNavigation(event, link.href)
                  }
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-orange-400"
                >
                  {isRTL ? link.fa : link.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(event) =>
              handleNavigation(event, "#contact")
            }
            className="mt-4 flex justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-orange-400"
          >
            {isRTL ? "شروع همکاری" : "Let's Talk"}
          </a>
        </div>
      )}
    </header>
  );
}