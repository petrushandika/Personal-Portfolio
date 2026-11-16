"use client";
import projects from "../../data/projects.json";
import './works.css';

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const mediaRoot = "/storage/v1/object/public/portfolio-assets/public";

function BackgroundVideo({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: number;
}) {
  const desktop = useRef<HTMLVideoElement>(null);
  const mobile = useRef<HTMLVideoElement>(null);
  const near = Math.abs(activeIndex - index) <= 1;
  const active = activeIndex === index;
  useEffect(() => {
    for (const video of [desktop.current, mobile.current]) {
      if (!video) continue;
      if (active && near) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      } else video.pause();
    }
  }, [active, near]);
  return (
    <div
      style={{ opacity: active ? 1 : 0, zIndex: 5 - index }}
      className="fixed inset-0 w-full h-full bg-[#f5f5f5] transition-opacity duration-1000 ease-in-out"
    >
      {near && (
        <>
          <video
            ref={desktop}
            muted
            playsInline
            className="hidden lg:block absolute lg:inset-0 lg:w-full lg:h-full object-cover lg:object-center"
          >
            <source
              src={`${mediaRoot}/Video/${index + 1}_optimized.mp4`}
              type="video/mp4"
            />
          </video>
          <video
            ref={mobile}
            muted
            playsInline
            className="block lg:hidden absolute bottom-0 w-full h-[50vh] object-cover object-[center_top]"
          >
            <source
              src={`${mediaRoot}/Video/M/M${index + 1}_optimized.mp4`}
              type="video/mp4"
            />
          </video>
        </>
      )}
    </div>
  );
}

export function BackgroundVideos({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none">
      {[0, 1, 2, 3, 4].map((index) => (
        <BackgroundVideo key={index} index={index} activeIndex={activeIndex} />
      ))}
    </div>
  );
}

type IconName =
  | "folder"
  | "folder-open"
  | "file"
  | "x"
  | "linkedin"
  | "instagram"
  | "github"
  | "twitter";
function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    folder: (
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    ),
    "folder-open": (
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    ),
    file: (
      <>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </>
    ),
    x: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    instagram: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
    github: (
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.9A5.4 5.4 0 0 0 19 4.8a5 5 0 0 0-.1-3.7s-1.2-.4-4 1.5a13.8 13.8 0 0 0-7 0C5.1.7 3.9 1.1 3.9 1.1a5 5 0 0 0-.1 3.7 5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.2 6.6 6.2 6.9a3.4 3.4 0 0 0-.9 2.6v4" />
    ),
    twitter: <path d="M4 3h4l12 18h-4L4 3zM20 3 4 21" />,
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-${name} ${className}`}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const studies = projects.map(project => ({id:project.slug,name:project.title,workType:project.workType,label:"Project",url:`/${project.slug}/`}));

function TreeRow({
  name,
  icon,
  child = false,
  onClick,
  expanded,
}: {
  name: string;
  icon: IconName;
  child?: boolean;
  onClick: () => void;
  expanded?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      onClick={onClick}
      className={`flex items-center gap-3 md:gap-4 py-2 cursor-pointer text-[#1c1c1c] hover:opacity-70 transition-opacity${child ? " ml-8" : ""}`}
      initial={child && !reducedMotion ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
    >
      <div className="shrink-0 text-current">
        <Icon name={icon} className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5]" />
      </div>
      <span
        className={`font-medium tracking-tight ${child ? "text-lg md:text-2xl" : "text-xl md:text-3xl"}`}
      >
        {name}
      </span>
    </motion.div>
  );
}

export function WorksTree({ onBrief }: { onBrief: (id: string) => void }) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  return (
    <div className="flex flex-col gap-2 md:gap-4 w-full">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by ownership">
        {[["all", "All work"], ["personal", "Personal"], ["organization", "Organization"]].map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => { setFilter(value); setOpen(null); }} className={`min-h-11 rounded-full border px-3 py-2 text-xs transition-colors ${filter === value ? "bg-[#1c1c1c] text-white border-[#1c1c1c]" : "bg-white/70 text-[#1c1c1c] border-black/20"}`}>{label}</button>)}
      </div>
      <div className="max-h-[32vh] lg:max-h-[52vh] overflow-y-auto overscroll-contain pr-2" data-work-list>
      {studies.filter(study => filter === "all" || study.workType === filter).map((study) => (
        <div key={study.id} className="w-full">
          <TreeRow
            name={study.name}
            icon={open === study.id ? "folder-open" : "folder"}
            expanded={open === study.id}
            onClick={() => setOpen(open === study.id ? null : study.id)}
          />
          <AnimatePresence>
            {open === study.id && (
              <motion.div
                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="w-full">
                  <TreeRow
                    child
                    name="brief"
                    icon="file"
                    onClick={() => onBrief(`${study.id}-brief`)}
                  />
                </div>
                <div className="w-full">
                  <TreeRow
                    child
                    name={study.label}
                    icon="file"
                    onClick={() => {
                      window.location.href = study.url;
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      </div>
      <p className="text-xs">Scroll the list to explore more work.</p>
    </div>
  );
}

const briefs: Record<string,string> = Object.fromEntries(projects.map(p=>[`${p.slug}-brief`,`${p.title} — Project notes\n\n${p.summary}\n\n${p.role}\n\n${p.contributions.join("\n")}\n\n${p.captureStatus === "source-only" ? "Source-reviewed case study. No runtime screenshot published." : "Screenshots captured from the app running locally on Mac."} Detailed contribution evidence and capture limitations are on the project page.`]));

export function BriefModal({
  brief,
  onClose,
}: {
  brief: string | null;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const content = brief ? (briefs[brief] ?? "") : "";
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    setText("");
    if (!brief) return;
    let length = 0;
    const timer = window.setInterval(() => {
      length += 1;
      setText(content.slice(0, length));
      if (length >= content.length) window.clearInterval(timer);
    }, 20);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", escape);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("keydown", escape);
    };
  }, [brief, content]);
  const typing = text.length < content.length;
  return (
    <AnimatePresence>
      {brief && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Petrus’s study notes"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl min-h-[65vh] md:min-h-[500px]"
          >
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
              <filter id="chipped-edges">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.1"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="4"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </svg>
            <div
              className="absolute inset-0 bg-[#f4ebd0] shadow-2xl"
              style={{ filter: "url(#chipped-edges)" }}
            >
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "url('/patterns/cream-paper.png')" }}
              />
            </div>
            <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-start items-start text-left">
              <button
                aria-label="Close study notes"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-colors z-20"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
              <div className="font-specialElite text-sm md:text-base lg:text-lg tracking-tight whitespace-pre-wrap text-black/80 leading-relaxed mt-4 relative z-20 w-full">
                {text}
                <span
                  className={`ml-1 font-bold ${typing ? "animate-pulse" : "animate-[ping_1s_ease-in-out_infinite]"}`}
                  style={{ opacity: typing ? 1 : undefined }}
                >
                  _
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ProfileCards() {
  const [cards, setCards] = useState(
    ["about.svg", "projects.svg", "interests.svg"].map((src, id) => ({
      src,
      id,
    })),
  );
  const [cycling, setCycling] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <div className="relative flex items-center justify-center w-full max-w-lg min-h-[320px] lg:min-h-[450px] my-6 lg:my-0">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute origin-bottom-center overflow-hidden rounded-2xl shadow-xl bg-white border border-gray-100/10 cursor-grab active:cursor-grabbing w-[52%] sm:w-[300px] aspect-[5/7]"
          style={{ zIndex: 50 - 10 * index, touchAction: "none" }}
          animate={{
            x: -12 * index,
            y: -8 * index,
            rotate: index === 0 ? 0 : -(2 + 3 * index),
            scale: 1,
            transition: { duration: 0.5 },
          }}
          drag={index === 0 && !cycling}
          dragElastic={0.2}
          dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          onDragStart={(_, info) => {
            dragStart.current = info.point;
          }}
          onDragEnd={(_, info) => {
            if (
              cycling ||
              Math.hypot(
                info.point.x - dragStart.current.x,
                info.point.y - dragStart.current.y,
              ) < 50
            )
              return;
            setCycling(true);
            setCards((current) => [...current.slice(1), current[0]]);
            timer.current = setTimeout(() => setCycling(false), 300);
          }}
          whileHover={
            index === 0 ? { scale: 1.05, transition: { duration: 0.2 } } : {}
          }
          whileDrag={{
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
            transition: { duration: 0.1 },
          }}
        >
          <img
            src={`${mediaRoot}/Profile/${card.src}`}
            alt={`Stack Card ${card.id + 1}`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-transparent" />
        </motion.div>
      ))}
    </div>
  );
}

const socials: { href: string; label: string; icon: IconName }[] = [
  {
    href: "https://www.linkedin.com/in/petrushandika/",
    label: "LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://instagram.com/petrushandika",
    label: "Instagram",
    icon: "instagram",
  },
  { href: "https://github.com/petrushandika", label: "GitHub", icon: "github" },
  { href: "https://twitter.com/petrushandika", label: "X", icon: "twitter" },
];
function DockLink({
  social,
  mouseX,
}: {
  social: (typeof socials)[number];
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (value) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? Math.abs(value - box.left - box.width / 2) : Infinity;
  });
  const width = useSpring(useTransform(distance, [0, 100], [60, 48]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  return (
    <motion.a
      ref={ref}
      href={social.href}
      aria-label={social.label}
      target="_blank"
      rel="noopener noreferrer"
      style={{ width }}
      className="aspect-square rounded-full bg-black text-white grid place-items-center cursor-pointer shadow-sm hover:scale-105 transition-transform"
    >
      <Icon name={social.icon} />
    </motion.a>
  );
}
export function SocialDock() {
  const mouseX = useMotionValue(Infinity);
  return (
    <div className="flex w-full items-center justify-center min-[1025px]:justify-end bg-transparent">
      <div
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-20 items-end gap-4 rounded-2xl bg-black/5 px-4 pb-4 shadow-sm"
      >
        {socials.map((social) => (
          <DockLink key={social.label} social={social} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
}

export function ResumeButton() {
  const [downloading, setDownloading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <div className="flex justify-center items-center">
      <motion.button
        aria-label="Download Resume"
        onClick={() => {
          if (downloading) return;
          setDownloading(true);
          const link = document.createElement("a");
          link.href = "/Resume/Petrus Handika.pdf";
          link.download = "Petrus Handika.pdf";
          document.body.appendChild(link);
          link.click();
          link.remove();
          timer.current = setTimeout(() => setDownloading(false), 3500);
        }}
        className={`relative flex items-center border-[1.5px] rounded-full overflow-hidden transition-all shadow-xl bg-white ${downloading ? "cursor-wait border-black" : "cursor-pointer border-black/10 hover:border-black/30"}`}
        animate={{ width: downloading ? 56 : 220, borderRadius: "9999px" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ height: 56 }}
      >
        <AnimatePresence>
          {downloading && (
            <motion.div
              className="absolute left-0 right-0 w-2 h-2 bg-white rounded-full mx-auto z-20"
              initial={{ opacity: 1 }}
              animate={{
                rotate: 360,
                x: [0, 20, 0, -20, 0],
                y: [0, -20, 0, 20, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />
          )}
        </AnimatePresence>
        <motion.div
          className="h-14 w-14 rounded-full bg-black flex justify-center items-center relative shadow-lg z-10 shrink-0"
          animate={downloading ? { rotate: 180, scale: [0.95, 1, 0.95] } : {}}
          transition={{
            duration: downloading ? 1 : 0.4,
            times: downloading ? [0, 0.7, 1] : undefined,
          }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full bg-neutral-800 rounded-full"
            initial={{ height: "0%" }}
            animate={{ height: downloading ? "100%" : "0%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{ zIndex: 1 }}
          />
          <motion.svg
            className="w-6 h-6 text-white z-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ opacity: 1 }}
            animate={{ opacity: downloading ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            />
          </motion.svg>
          <motion.div
            className="w-4 h-4 rounded-full bg-white absolute z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: downloading ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        <AnimatePresence>
          {!downloading && (
            <motion.span
              className="ml-4 text-black font-semibold text-base whitespace-nowrap select-none z-10 tracking-tight"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Download Resume
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
