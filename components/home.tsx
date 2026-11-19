"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import projects from "../data/projects.json";
import {
  BackgroundVideos,
  BriefModal,
  ProfileCards,
  ResumeButton,
  SocialDock,
  WorksTree,
} from "./home/interactions";

/** Indexable shortlist used for crawlable internal links on the home page. */
const caseStudies = projects.map((project) => ({ slug: project.slug, title: project.title }));

/** The original five full-screen compositions, with editable content and local media. */
export default function Home({ initialSection = "home" }: { initialSection?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [brief, setBrief] = useState<string | null>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const target = document.getElementById(initialSection);
    target?.scrollIntoView({ behavior: 'instant' });
  }, [initialSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sections.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveIndex(index);
          }
        }
      },
      { threshold: 0.6 },
    );
    for (const section of sections.current)
      if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-x-clip">
      <BackgroundVideos activeIndex={activeIndex} />
      <section
        id="home"
        ref={(element) => {
          sections.current[0] = element;
        }}
        className="snap-section bg-transparent"
      >
        <div className="absolute top-0 lg:relative w-full h-[50vh] lg:h-full flex flex-col justify-center px-6 md:px-12 pr-6 md:pr-16 lg:pr-24 pt-10 lg:pt-0">
          <div className="w-full mx-auto text-[#1c1c1c] space-y-2 text-center lg:translate-y-[-10%] lg:text-right lg:ml-auto lg:mr-0 lg:max-w-4xl">
            <p className="text-xl md:text-3xl font-medium opacity-100">Hi,</p>
            <p className="text-5xl sm:text-6xl md:text-7.5xl lg:text-[5rem] font-bold tracking-tight">
              I build.
            </p>
            <p className="text-5xl sm:text-6xl md:text-8.5xl lg:text-[5rem] font-bold tracking-tight leading-[0.85]">
              Ideas ship.
              <br /> <span className="block mt-2 md:mt-4">With care.</span>
            </p>
          </div>
          <div className="flex absolute bottom-4 lg:bottom-16 left-0 right-0 lg:left-auto px-6 lg:px-0 flex-col items-center lg:items-end text-[#1c1c1c] lg:-translate-x-[23%] w-full lg:w-auto z-10">
            <div className="inline-flex flex-col w-max">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-center lg:text-right">
                Petrus Handika
              </h1>
              <div className="flex justify-between w-full lg:justify-end lg:w-auto lg:gap-16 text-base md:text-lg lg:text-xl font-medium opacity-80 leading-none mt-2 lg:mt-1">
                <p>Full Stack Developer</p>
                <p>(Web &amp; AI)</p>
              </div>
              <a
                href="https://www.linkedin.com/in/petrushandika/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 self-center lg:self-end text-xs underline underline-offset-4 opacity-60 hover:opacity-90 transition-opacity"
              >
                Profile on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        id="works"
        ref={(element) => {
          sections.current[1] = element;
        }}
        className="snap-section bg-transparent"
      >
        <div className="absolute top-0 lg:relative container mx-auto px-6 md:px-12 w-full h-[50vh] lg:h-full flex flex-col justify-center pt-10 lg:pt-0">
          <div className="w-full flex justify-center lg:justify-end">
            <div className="flex flex-col items-start gap-8 w-full lg:max-w-[50%] lg:translate-x-48">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1c1c] text-left lg:whitespace-nowrap">
                Selected Projects
              </h2>
              <p className="text-xs">
                Personal projects and work with company teams.{" "}
                <a href="/petrus-handika/" className="underline underline-offset-4 hover:opacity-70">Profile</a>
                {" · "}
                <a href="/blog/" className="underline underline-offset-4 hover:opacity-70">Notes</a>
              </p>
              <div className="w-full lg:pl-4 mt-2 md:mt-6">
                <WorksTree onBrief={setBrief} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="timeline"
        ref={(element) => {
          sections.current[2] = element;
        }}
        className="snap-section bg-transparent"
      >
        <div className="absolute top-0 lg:relative container mx-auto px-6 md:px-12 w-full h-[50vh] lg:h-full flex items-center justify-center lg:justify-end pt-10 lg:pt-0">
          <div className="flex flex-col items-center gap-6 md:gap-10 w-full lg:max-w-[50%]">
            <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1c1c] text-center">
                My Engineering Journey
              </h2>
              <div className="w-full flex justify-center">
                <div className="w-[65%] md:w-[50%] lg:w-[70%]">
                  <img
                    src="/storage/v1/object/public/portfolio-assets/public/Profile/journey.webp"
                    alt="Timeline"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-6 w-full">
              <h2 className="text-xs md:text-sm lg:text-2xl font-bold tracking-tight text-[#1c1c1c] text-center">
                Tools I Work With
              </h2>
              <div className="w-full flex justify-center">
                <div className="w-[55%] md:w-[48%] lg:w-[90%]">
                  <img
                    src="/storage/v1/object/public/portfolio-assets/public/Profile/tools.svg"
                    alt="Collaborations"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        ref={(element) => {
          sections.current[3] = element;
        }}
        className="snap-section bg-transparent"
      >
        <div className="absolute top-0 lg:relative container mx-auto px-6 md:px-12 w-full h-[50vh] lg:h-full flex flex-col justify-start lg:justify-center pt-8 lg:pt-0">
          <div className="w-full max-w-2xl xl:max-w-3xl mx-auto md:ml-auto md:mr-0 flex flex-col gap-2 lg:gap-8 pt-6 lg:pt-0">
            <div className="w-full text-center overflow-visible lg:translate-x-0 lg:-translate-x-[5%] mb-2 lg:mb-0 px-2 lg:px-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1c1c] leading-tight drop-shadow-sm lg:whitespace-nowrap">
                A Little About Me.
              </h2>
            </div>
            <p className="hidden md:block text-center text-sm max-w-xl mx-auto">
              I build web applications and the APIs behind them: Next.js and TypeScript on the
              front, Node and Go on the back, PostgreSQL underneath, AI workflows where they
              actually help.
            </p>
            <p className="text-center text-xs md:text-sm max-w-2xl mx-auto leading-snug">
              <span className="opacity-60">Case studies:</span>{" "}
              {caseStudies.map((study, index) => (
                <Fragment key={study.slug}>
                  <a
                    href={`/${study.slug}/`}
                    className="underline underline-offset-4 hover:opacity-70"
                  >
                    {study.title}
                  </a>
                  {index < caseStudies.length - 1 ? " · " : ""}
                </Fragment>
              ))}
            </p>
            <p className="hidden md:block text-center text-xs opacity-70">
              Open source:{" "}
              <a
                href="https://github.com/petrushandika/Danaku"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-90"
              >
                Danaku
              </a>
              {" / "}
              <a
                href="https://github.com/petrushandika/Reluv-App"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-90"
              >
                Reluv
              </a>
              {" / "}
              <a
                href="https://github.com/petrushandika/Structra"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-90"
              >
                Structra
              </a>
            </p>
            <div className="w-full flex items-center justify-center lg:justify-end lg:pr-12 pointer-events-auto mt-8 lg:mt-24 mb-10">
              <ProfileCards />
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        ref={(element) => {
          sections.current[4] = element;
        }}
        className="snap-section bg-transparent"
      >
        <div className="absolute top-0 min-[1025px]:relative container mx-auto px-6 md:px-12 w-full h-[65vh] sm:h-[55vh] md:h-[50vh] min-[1025px]:h-full flex flex-col justify-start md:justify-center pt-24 sm:pt-20 md:pt-10 min-[1025px]:pt-0">
          <div className="max-w-4xl mx-auto min-[1025px]:ml-auto min-[1025px]:mr-0 text-center min-[1025px]:text-right space-y-6 lg:space-y-12 text-[#1c1c1c]">
            <div className="space-y-2">
              <h2 className="text-[1.8rem] md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Have An Idea?
              </h2>
              <p className="text-lg md:text-3xl font-medium opacity-80">
                Let’s Build It Together.
              </p>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-lg font-medium opacity-40 mb-1 md:mb-2">
                  Mail me
                </p>
                <a
                  href="mailto:petrushandikasinaga@gmail.com"
                  className="text-2xl md:text-4xl font-bold hover:underline"
                >
                  petrushandikasinaga@gmail.com
                </a>
              </div>
              <div>
                <p className="text-lg font-medium opacity-40 mb-1 md:mb-2">
                  Meet me in
                </p>
                <p className="text-2xl md:text-4xl font-bold">Indonesia</p>
              </div>
              <div>
                <p className="text-lg font-medium opacity-40 mb-2">
                  find me online
                </p>
                <div className="flex justify-center min-[1025px]:justify-end relative z-10 w-full mt-4 min-[1025px]:mt-0 min-[1025px]:-mr-4">
                  <SocialDock />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:bottom-12 lg:left-auto lg:translate-x-0 lg:right-12 z-[100]">
          <ResumeButton />
        </div>
      </section>
      <BriefModal brief={brief} onClose={() => setBrief(null)} />
    </main>
  );
}
