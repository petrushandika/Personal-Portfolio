/* Editable JSX migrated from the personalized reference, with shared live interactions. */
import { StudyCard, Carousel, SlideTrack, Workflow, ArtworkGallery, ReferenceFilm } from "./interactive";

export default function DrivexdiwaliStudy() {
  return (
    <main className={"relative min-h-screen bg-[#f8f9fa] text-[#1c1c1c] overflow-x-hidden selection:bg-black selection:text-white pb-32"}>
      <div className={"pt-32 pb-8"}>
      </div>
      <div className={"fixed bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 z-50"}>
        <a className={"flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-lg border border-black/10 rounded-full text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 group"} href={"/work/"}>
          <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-arrow-left w-4 h-4 group-hover:-translate-x-1 transition-transform"}>
            <path d={"m12 19-7-7 7-7"}>
            </path>
            <path d={"M19 12H5"}>
            </path>
          </svg>
{"Back to Studies"}        </a>
      </div>
      <div className={"w-full max-w-[1600px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-4 md:gap-6"}>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 !p-10 lg:!p-16 bg-gradient-to-br from-white to-gray-50/80"}>
          <div className={"flex flex-col lg:flex-row lg:items-end justify-between gap-12"}>
            <div className={"max-w-4xl"}>
              <h1 className={"text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[1.05] mb-6"}>
{"Storytelling Systems"}              </h1>
              <p className={"text-2xl md:text-3xl text-black/60 font-medium leading-tight text-balance"}>
{"A Visual-reference Reading Curated by Petrus Handika. Reference imagery: Cartooneast / Anurag Bandyopadhyay. Not client work by Petrus Handika."}              </p>
            </div>
            <div className={"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 min-w-[200px]"}>
              <div>
                <p className={"text-xs uppercase tracking-widest font-bold text-black/40 mb-1"}>
{"Curator"}                </p>
                <p className={"font-medium text-sm md:text-base leading-snug text-black/80"}>
{"Petrus Handika"}                </p>
              </div>
              <div>
                <p className={"text-xs uppercase tracking-widest font-bold text-black/40 mb-1"}>
{"Study Focus"}                </p>
                <p className={"font-medium text-sm md:text-base leading-snug text-black/80"}>
{"Narrative Structure,"}                  <br />
{"Cross-format Reading"}                </p>
              </div>
              <div>
                <p className={"text-xs uppercase tracking-widest font-bold text-black/40 mb-1"}>
{"Type"}                </p>
                <p className={"font-medium text-sm md:text-base leading-snug text-black/80"}>
{"Study"}                </p>
              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-[#f1f1f1] text-[#1c1c1c] !p-10 lg:!p-16"}>
          <div className={"grid md:grid-cols-2 gap-12 items-center"}>
            <div>
              <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-6"}>
{"Questions for Review"}              </p>
              <h2 className={"text-4xl lg:text-6xl font-bold tracking-tighter mb-8 text-balance leading-[1.05]"}>
{"Read the supplied story through four questions:"}              </h2>
              <ul className={"space-y-6"}>
                <li className={"flex items-start gap-4"}>
                  <div className={"w-6 h-6 mt-1 flex-shrink-0 bg-black/10 rounded-full flex items-center justify-center text-xs font-bold"}>
{"1"}                  </div>
                  <p className={"text-xl lg:text-2xl text-black/80 font-medium"}>
{"How does the story establish distance from home?"}                  </p>
                </li>
                <li className={"flex items-start gap-4"}>
                  <div className={"w-6 h-6 mt-1 flex-shrink-0 bg-black/10 rounded-full flex items-center justify-center text-xs font-bold"}>
{"2"}                  </div>
                  <p className={"text-xl lg:text-2xl text-black/80 font-medium"}>
{"Which details suggest a festive setting?"}                  </p>
                </li>
                <li className={"flex items-start gap-4"}>
                  <div className={"w-6 h-6 mt-1 flex-shrink-0 bg-black/10 rounded-full flex items-center justify-center text-xs font-bold"}>
{"3"}                  </div>
                  <p className={"text-xl lg:text-2xl text-black/80 font-medium"}>
{"How is emotion conveyed without excess exposition?"}                  </p>
                </li>
                <li className={"flex items-start gap-4"}>
                  <div className={"w-6 h-6 mt-1 flex-shrink-0 bg-black/10 rounded-full flex items-center justify-center text-xs font-bold"}>
{"4"}                  </div>
                  <p className={"text-xl lg:text-2xl text-black/80 font-medium"}>
{"What changes between motion, still imagery, and print?"}                  </p>
                </li>
              </ul>
            </div>
            <div className={"h-full flex items-center justify-center"}>
              <p className={"text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-500 to-zinc-900 italic"}>
{"One reference. "}                <br />
{"Several perspectives."}              </p>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 min-h-[400px] !p-0"}>
          <div className={"grid lg:grid-cols-[35%_65%] h-full min-h-[400px]"}>
            <div className={"p-8 md:p-12 lg:p-16 flex flex-col justify-center"}>
              <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-6"}>
{"Narrative Notes"}              </p>
              <h2 className={"text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-[1.1]"}>
{"A Visual-reference Reading Curated by Petrus Handika. Reference imagery: Cartooneast / Anurag Bandyopadhyay. Not client work by Petrus Handika."}              </h2>
              <ul className={"space-y-4"}>
                <li className={"flex gap-4 items-center bg-black/5 p-4 rounded-xl font-medium"}>
                  <div className={"w-2 h-2 rounded-full bg-black/40"}>
                  </div>
{"Observe how urgency gives the supplied story its structure"}                </li>
                <li className={"flex gap-4 items-center bg-black/5 p-4 rounded-xl font-medium"}>
                  <div className={"w-2 h-2 rounded-full bg-black/40"}>
                  </div>
{"Read the journey as a narrative device, not a campaign claim"}                </li>
                <li className={"flex gap-4 items-center bg-black/5 p-4 rounded-xl font-medium"}>
                  <div className={"w-2 h-2 rounded-full bg-black/40"}>
                  </div>
{"Compare emotional cues with geographic details"}                </li>
                <li className={"flex gap-4 items-center bg-black/5 p-4 rounded-xl font-medium"}>
                  <div className={"w-2 h-2 rounded-full bg-black/40"}>
                  </div>
{"Notice familiar gestures and domestic details"}                </li>
              </ul>
            </div>
            <div className={"bg-[#1c1c1c] flex flex-col items-center justify-center p-0 md:p-4 lg:p-8 w-full h-full overflow-hidden"}>
              <div className={"w-full h-full flex items-center justify-center"}>
<Carousel className={"w-full mx-auto relative  h-full"}>
                  <div className={"flex flex-col gap-3 h-full"}>
                    <div className={"relative overflow-hidden w-full h-full bg-[#111] rounded-lg"}>
<SlideTrack>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0001.optimized.jpg"} alt={"Slide 1"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0002.optimized.jpg"} alt={"Slide 2"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0003.optimized.jpg"} alt={"Slide 3"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0004.optimized.jpg"} alt={"Slide 4"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0005.optimized.jpg"} alt={"Slide 5"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0006.optimized.jpg"} alt={"Slide 6"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0007.optimized.jpg"} alt={"Slide 7"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0008.optimized.jpg"} alt={"Slide 8"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0009.optimized.jpg"} alt={"Slide 9"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0010.optimized.jpg"} alt={"Slide 10"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0011.optimized.jpg"} alt={"Slide 11"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0012.optimized.jpg"} alt={"Slide 12"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0013.optimized.jpg"} alt={"Slide 13"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0014.optimized.jpg"} alt={"Slide 14"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0015.optimized.jpg"} alt={"Slide 15"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0016.optimized.jpg"} alt={"Slide 16"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0017.optimized.jpg"} alt={"Slide 17"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0018.optimized.jpg"} alt={"Slide 18"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0019.optimized.jpg"} alt={"Slide 19"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0020.optimized.jpg"} alt={"Slide 20"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0021.optimized.jpg"} alt={"Slide 21"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0022.optimized.jpg"} alt={"Slide 22"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0023.optimized.jpg"} alt={"Slide 23"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0024.optimized.jpg"} alt={"Slide 24"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>
                        <div className={"shrink-0 min-w-full flex items-center justify-center aspect-video md:h-[400px] lg:h-[500px] p-2"}>
                          <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Slides/DriveX_Diwali_2025_page-0025.optimized.jpg"} alt={"Slide 25"} className={"w-full h-full object-contain select-none pointer-events-none rounded-lg"} draggable={false} />
                        </div>

</SlideTrack>                    </div>
                  </div>

</Carousel>              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-[#111] !p-0 min-h-[50vh] md:min-h-[70vh] flex items-center justify-center relative overflow-hidden group"}>
          <div className={"absolute inset-0 w-full h-full bg-black"}>
<ReferenceFilm />          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-[#1c1c1c] text-white flex flex-col justify-center !p-10 lg:!p-16 min-h-[400px]"}>
          <h3 className={"text-3xl md:text-5xl font-bold tracking-tight mb-8"}>
{"Motion Reference"}          </h3>
          <div className={"grid md:grid-cols-2 gap-8 lg:gap-16 items-center"}>
            <ul className={"space-y-6 w-full flex flex-col justify-center"}>
              <li className={"flex gap-4 items-start font-medium text-lg leading-snug"}>
                <div className={"w-2 h-2 rounded-full bg-white/40 mt-2 shrink-0"}>
                </div>
                <span className={"text-white/80"}>
{"Consider the central tension in the supplied film"}                </span>
              </li>
              <li className={"flex gap-4 items-start font-medium text-lg leading-snug"}>
                <div className={"w-2 h-2 rounded-full bg-white/40 mt-2 shrink-0"}>
                </div>
                <span className={"text-white/80"}>
{"Observe the contrast between absence and connection"}                </span>
              </li>
              <li className={"flex gap-4 items-start font-medium text-lg leading-snug"}>
                <div className={"w-2 h-2 rounded-full bg-white/40 mt-2 shrink-0"}>
                </div>
                <span className={"text-white/80"}>
{"Compare restraint with more explicit emotional cues"}                </span>
              </li>
              <li className={"flex gap-4 items-start font-medium text-lg leading-snug"}>
                <div className={"w-2 h-2 rounded-full bg-white/40 mt-2 shrink-0"}>
                </div>
                <span className={"text-white/80"}>
{"Inspect pacing and framing at screen scale"}                </span>
              </li>
            </ul>
            <div className={"bg-[#111] w-full h-full overflow-hidden flex flex-col items-center justify-center rounded-2xl border border-white/10 lg:min-h-full min-h-[300px]"}>
              <style>{"\n        @keyframes scroll-left {\n          0% {\n            transform: translateX(0);\n          }\n          100% {\n            transform: translateX(-33.33333%);\n          }\n        }\n\n        .infinite-scroll {\n          animation: scroll-left 20s linear infinite;\n        }\n\n        .infinite-scroll:hover {\n          animation-play-state: paused;\n        }\n\n        .scroll-container {\n          mask: linear-gradient(\n            90deg,\n            transparent 0%,\n            black 10%,\n            black 90%,\n            transparent 100%\n          );\n          -webkit-mask: linear-gradient(\n            90deg,\n            transparent 0%,\n            black 15%,\n            black 85%,\n            transparent 100%\n          );\n        }\n\n        .media-item {\n          transition: transform 0.3s ease, filter 0.3s ease;\n        }\n\n        .media-item:hover {\n          transform: scale(1.05);\n          filter: brightness(1.1);\n        }\n      "}</style>
              <div className={"w-full h-full relative overflow-hidden flex items-center justify-center"}>
                <div className={"relative z-10 w-full flex items-center justify-center py-8"}>
                  <div className={"scroll-container w-full"}>
                    <div className={"infinite-scroll flex gap-6 w-max"}>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/4da1cdf5-403e-49e1-b8f4-d4a9d8040e74_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_20250925_145736.optimized.jpg"} alt={"BTS 2"} className={"w-full h-full object-cover"} loading={"lazy"} draggable={false} />
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_20250925_185947.optimized.jpg"} alt={"BTS 3"} className={"w-full h-full object-cover"} loading={"lazy"} draggable={false} />
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_9959_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/VID_20250926_164321_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/4da1cdf5-403e-49e1-b8f4-d4a9d8040e74_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_20250925_145736.optimized.jpg"} alt={"BTS 2"} className={"w-full h-full object-cover"} loading={"lazy"} draggable={false} />
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_20250925_185947.optimized.jpg"} alt={"BTS 3"} className={"w-full h-full object-cover"} loading={"lazy"} draggable={false} />
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_9959_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/VID_20250926_164321_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/4da1cdf5-403e-49e1-b8f4-d4a9d8040e74_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_20250925_145736.optimized.jpg"} alt={"BTS 2"} className={"w-full h-full object-cover"} loading={"lazy"} draggable={false} />
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_20250925_185947.optimized.jpg"} alt={"BTS 3"} className={"w-full h-full object-cover"} loading={"lazy"} draggable={false} />
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/IMG_9959_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                      <div className={"media-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-xl"}>
                        <video src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/BTS/VID_20250926_164321_optimized.mp4"} className={"w-full h-full object-cover select-none pointer-events-none"} autoPlay={true} loop={true} muted={true} playsInline={true}>
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 !p-6 md:!p-10 lg:!p-16 bg-white min-h-[500px] flex flex-col"}>
          <div className={"mb-16"}>
            <h3 className={"text-3xl md:text-4xl font-bold tracking-tight mb-8"}>
{"Primary Still Reference"}            </h3>
            <div className={"w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5"}>
              <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Ideas/Master_For_Print.webp"} alt={"Master For Print Key Visual"} className={"w-full h-auto object-cover"} />
            </div>
          </div>
          <div>
            <h3 className={"text-2xl md:text-3xl font-bold tracking-tight mb-8"}>
{"Related Still References"}            </h3>
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"}>
              <div className={"bg-zinc-100 rounded-xl overflow-hidden shadow-md border border-black/5 group cursor-pointer"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Ideas/Idea_1.webp"} alt={"Alt KV 1"} className={"w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"} />
              </div>
              <div className={"bg-zinc-100 rounded-xl overflow-hidden shadow-md border border-black/5 group cursor-pointer"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Ideas/Idea_2.webp"} alt={"Alt KV 2"} className={"w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"} />
              </div>
              <div className={"bg-zinc-100 rounded-xl overflow-hidden shadow-md border border-black/5 group cursor-pointer"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Ideas/Idea_3.webp"} alt={"Alt KV 3"} className={"w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"} />
              </div>
              <div className={"bg-zinc-100 rounded-xl overflow-hidden shadow-md border border-black/5 group cursor-pointer"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Ideas/Idea_4.webp"} alt={"Alt KV 4"} className={"w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"} />
              </div>
              <div className={"bg-zinc-100 rounded-xl overflow-hidden shadow-md border border-black/5 group cursor-pointer"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Ideas/Idea_5.webp"} alt={"Alt KV 5"} className={"w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"} />
              </div>
              <div className={"bg-zinc-100 rounded-xl overflow-hidden shadow-md border border-black/5 group cursor-pointer"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/DriveX_Diwali/Ideas/Idea_6.webp"} alt={"Alt KV 6"} className={"w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"} />
              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-[#ff5100] text-white flex flex-col justify-center !p-10 lg:!p-16 min-h-[400px]"}>
          <h3 className={"text-3xl md:text-5xl font-bold tracking-tight mb-8"}>
{"Study Takeaways"}          </h3>
          <ul className={"space-y-6"}>
            <li className={"flex gap-4 items-start font-medium text-lg lg:text-xl leading-snug"}>
              <svg className={"w-6 h-6 flex-shrink-0 text-white"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.5"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                <polyline points={"20 6 9 17 4 12"}>
                </polyline>
              </svg>
{"Emotional cues offer material for narrative analysis"}            </li>
            <li className={"flex gap-4 items-start font-medium text-lg lg:text-xl leading-snug"}>
              <svg className={"w-6 h-6 flex-shrink-0 text-white"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.5"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                <polyline points={"20 6 9 17 4 12"}>
                </polyline>
              </svg>
{"Repeated motifs can be compared; recall was not measured here"}            </li>
            <li className={"flex gap-4 items-start font-medium text-lg lg:text-xl leading-snug"}>
              <svg className={"w-6 h-6 flex-shrink-0 text-white"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.5"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                <polyline points={"20 6 9 17 4 12"}>
                </polyline>
              </svg>
{"Still and motion formats reveal different storytelling constraints"}            </li>
            <li className={"flex gap-4 items-start font-medium text-lg lg:text-xl leading-snug"}>
              <svg className={"w-6 h-6 flex-shrink-0 text-white"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.5"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                <polyline points={"20 6 9 17 4 12"}>
                </polyline>
              </svg>
{"No campaign delivery or business outcomes are claimed by Petrus"}            </li>
          </ul>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-black text-white flex items-center justify-center !py-24 lg:!py-40"}>
          <div>
            <h2 className={"text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-center max-w-4xl text-balance leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-zinc-500"}>
{"Reading how stories connect."}              <br />
{"Curated references, not client work."}            </h2>
          </div>
        </StudyCard>
      </div>
    </main>
  );
}
