import theAestheticsSkin from "@/assets/images/the-aesthetics-skin.png";
import lakoeEcommerce from "@/assets/images/lakoe-ecommerce.png";
import circleApp from "@/assets/images/circle-app.png";
import velocia from "@/assets/images/velocia.png";
import deltaDekoria from "@/assets/images/delta-dekoria.png";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

const portfolioProjects = [
  {
    company: "The Aesthetics Skin",
    year: "2025",
    title: "The Aesthetics Skin E-Commerce",
    results: [
      { title: "Improved mobile user experience by 35%" },
      { title: "SEO optimization boosted organic traffic by 60%" },
      {
        title:
          "Integrated booking system and product purchases into a single platform",
      },
    ],
    link: "https://theaestheticsskin.com/",
    image: theAestheticsSkin,
  },
  {
    company: "Dumbways Indonesia",
    year: "2024",
    title: "Lakoe E-Commerce",
    results: [
      { title: "Increased basic food product sales by 25%" },
      { title: "Accelerated checkout process by 30%" },
      { title: "Reached customers in more than 10 cities across Indonesia" },
    ],
    link: "",
    image: lakoeEcommerce,
  },
  {
    company: "Dumbways Indonesia",
    year: "2024",
    title: "Circle App",
    results: [
      { title: "Improved daily user retention by 45%" },
      { title: "Added trending topics and real-time notifications features" },
      {
        title:
          "Delivered a more interactive experience like popular social platforms",
      },
    ],
    link: "",
    image: circleApp,
  },
  {
    company: "Alpha Alliance",
    year: "2024",
    title: "Velocia",
    results: [
      { title: "Users can easily search cars by type and price" },
      { title: "Increased product page speed by up to 60%" },
      {
        title:
          "Implemented filters and sorting for a more efficient shopping experience",
      },
    ],
    link: "",
    image: velocia,
  },
  {
    company: "Mikrotek",
    year: "2023",
    title: "Delta Dekoria",
    results: [
      {
        title:
          "Integrated wishlist and automated product recommendation features",
      },
      { title: "Optimized product images without compromising quality" },
      { title: "Clean and professional online store interface design" },
    ],
    link: "https://deltadekoria.com/",
    image: deltaDekoria,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experiences."
        />
        <div className="flex flex-col mt-10 md:mt-20 gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{
                top: `calc(64px + ${projectIndex * 40}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm md:text-base text-white/50 items-start"
                      >
                        <CheckCircleIcon
                          className="w-5 h-5 shrink-0"
                          strokeWidth={2}
                        />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={project.link} target="_blank">
                    <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                      <span>Visit Live Site</span>
                      <ArrowUpRightIcon className="size-4" />
                    </button>
                  </a>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-t"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
