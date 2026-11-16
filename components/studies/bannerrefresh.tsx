/* Editable JSX migrated from the personalized reference, with shared live interactions. */
import { StudyCard, Carousel, SlideTrack, Workflow, ArtworkGallery, ReferenceFilm } from "./interactive";

export default function BannerrefreshStudy() {
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
{"AI Workflows"}              </h1>
              <p className={"text-2xl md:text-3xl text-black/60 font-medium leading-tight text-balance"}>
{"Visual-reference study curated by Petrus Handika: inspecting image-editing steps through an interactive node canvas. Reference imagery: Cartooneast / Anurag Bandyopadhyay. Not client work by Petrus Handika."}              </p>
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
{"Image-editing References,"}                  <br />
{"Workflow Reading"}                </p>
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
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-[#f1f1f1] text-[#1c1c1c] !p-10 lg:!p-16 flex items-center min-h-[400px]"}>
          <div className={"max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24"}>
            <div className={"w-full lg:w-1/3"}>
              <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-4"}>
{"Reference Overview"}              </p>
              <h2 className={"text-4xl lg:text-5xl font-bold tracking-tighter text-balance leading-[1.1]"}>
{"Reading an image workflow, step by step."}              </h2>
            </div>
            <div className={"w-full lg:w-2/3"}>
              <ul className={"space-y-4"}>
                <li className={"flex gap-4 items-start font-medium text-lg leading-snug text-black/70"}>
                  <div className={"w-2 h-2 rounded-full bg-black/30 mt-2.5 shrink-0"}>
                  </div>
                  <span>
{"Compare supplied source and result images as visual references"}                  </span>
                </li>
                <li className={"flex gap-4 items-start font-medium text-lg leading-snug text-black/70"}>
                  <div className={"w-2 h-2 rounded-full bg-black/30 mt-2.5 shrink-0"}>
                  </div>
                  <span>
{"Look for changes in setting, lighting, and framing"}                  </span>
                </li>
                <li className={"flex gap-4 items-start font-medium text-lg leading-snug text-black/70"}>
                  <div className={"w-2 h-2 rounded-full bg-black/30 mt-2.5 shrink-0"}>
                  </div>
                  <span>
{"Explore the preserved node canvas as a reference diagram, not a workflow built by Petrus"}                  </span>
                </li>
                <li className={"flex gap-4 items-start font-medium text-lg leading-snug text-black/70"}>
                  <div className={"w-2 h-2 rounded-full bg-black/30 mt-2.5 shrink-0"}>
                  </div>
                  <span>
{"Assess visual consistency without claiming production results"}                  </span>
                </li>
              </ul>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 min-h-[600px] !p-0 overflow-hidden bg-white border border-black/5"}>
          <div className={"grid lg:grid-cols-2 h-full min-h-[600px]"}>
            <div className={"bg-zinc-100/50 flex flex-col items-center justify-center p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-black/5 relative group"}>
<Workflow title={"Study 01: Portrait Lighting"} nodes={[
{x:50,y:50,title:"Source Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 1/Raw.optimized.jpg",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-zinc-400/40 bg-zinc-400/10 text-zinc-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-zinc-400/40 bg-zinc-400/10 text-zinc-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-box h-4 w-4"}>
                    <path d={"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}>
                    </path>
                    <path d={"m3.3 7 8.7 5 8.7-5"}>
                    </path>
                    <path d={"M12 22V12"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Input"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Source Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 1/Raw.optimized.jpg"} alt={"Raw Image"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)},
{x:300,y:150,title:"Prompt Notes",description:"Reference reading: compare shallow-focus portrait styling with the supplied source. Inspect whether poses, expressions, and facial details remain consistent; no generation by Petrus is claimed.",image:null,content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-purple-400/40 bg-purple-400/10 text-purple-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-purple-400/40 bg-purple-400/10 text-purple-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-wand-sparkles h-4 w-4"}>
                    <path d={"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"}>
                    </path>
                    <path d={"m14 7 3 3"}>
                    </path>
                    <path d={"M5 6v4"}>
                    </path>
                    <path d={"M19 14v4"}>
                    </path>
                    <path d={"M10 2v2"}>
                    </path>
                    <path d={"M7 8H3"}>
                    </path>
                    <path d={"M21 16h-4"}>
                    </path>
                    <path d={"M11 3H9"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Prompt"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Prompt Notes"}                  </h3>
                </div>
              </div>
              <p className={"line-clamp-2 text-[11px] leading-relaxed text-black/60 font-medium"}>
{"Reference reading: compare shallow-focus portrait styling with the supplied source. Inspect whether poses, expressions, and facial details remain consistent; no generation by Petrus is claimed."}              </p>
            </div>
          </div>
)},
{x:50,y:300,title:"Result Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 1/Final.optimized.png",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-shield-check h-4 w-4"}>
                    <path d={"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}>
                    </path>
                    <path d={"m9 12 2 2 4-4"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Output"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Result Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 1/Final.optimized.png"} alt={"Final Image"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)}
]} connections={[[0, 1], [1, 2]]} />            </div>
            <div className={"p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative"}>
              <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/30 mb-6"}>
{"Study 01"}              </p>
              <h2 className={"text-4xl md:text-5xl font-bold tracking-tight mb-10 leading-[1.1]"}>
{"Portrait Lighting"}              </h2>
              <div className={"space-y-8"}>
                <div>
                  <h4 className={"text-[10px] lg:text-xs uppercase tracking-widest font-bold text-black/40 mb-6"}>
{"Review Checklist"}                  </h4>
                  <ul className={"space-y-6"}>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"1"}                      </div>
                      <span>
{"Inspect framing and focus in the supplied source portrait"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"2"}                      </div>
                      <span>
{"Compare the apparent lighting and background treatment"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"3"}                      </div>
                      <span>
{"Check facial and hand details without assuming a production process"}                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 min-h-[600px] !p-0 overflow-hidden bg-white border border-black/5"}>
          <div className={"grid lg:grid-cols-[40%_60%] h-full min-h-[600px]"}>
            <div className={"p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white order-last lg:order-first relative"}>
              <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/30 mb-6"}>
{"Study 02"}              </p>
              <h2 className={"text-4xl md:text-5xl font-bold tracking-tight mb-10 leading-[1.1]"}>
{"Scene Comparison"}              </h2>
              <div className={"space-y-8"}>
                <div>
                  <h4 className={"text-[10px] lg:text-xs uppercase tracking-widest font-bold text-black/40 mb-6"}>
{"Review Checklist"}                  </h4>
                  <ul className={"space-y-6"}>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"1"}                      </div>
                      <span>
{"Identify the subject and its original visual context"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"2"}                      </div>
                      <span>
{"Compare horizon lines and camera perspective"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"3"}                      </div>
                      <span>
{"Inspect light direction and subject edges"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"4"}                      </div>
                      <span>
{"Look for compositing inconsistencies in the supplied result"}                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={"bg-zinc-100/50 flex flex-col items-center justify-center p-4 md:p-8 border-b lg:border-b-0 lg:border-l border-black/5 relative group"}>
<Workflow title={"Study 02: Scene Comparison"} nodes={[
{x:40,y:40,title:"Subject Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 2/Shot.optimized.jpg",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-zinc-400/40 bg-zinc-400/10 text-zinc-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-zinc-400/40 bg-zinc-400/10 text-zinc-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-box h-4 w-4"}>
                    <path d={"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}>
                    </path>
                    <path d={"m3.3 7 8.7 5 8.7-5"}>
                    </path>
                    <path d={"M12 22V12"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Input"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Subject Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 2/Shot.optimized.jpg"} alt={"Shot"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)},
{x:40,y:260,title:"Setting Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 2/Location.optimized.png",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-blue-400/40 bg-blue-400/10 text-blue-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-blue-400/40 bg-blue-400/10 text-blue-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-image h-4 w-4"}>
                    <rect width={"18"} height={"18"} x={"3"} y={"3"} rx={"2"} ry={"2"}>
                    </rect>
                    <circle cx={"9"} cy={"9"} r={"2"}>
                    </circle>
                    <path d={"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Input"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Setting Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 2/Location.optimized.png"} alt={"Location"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)},
{x:400,y:150,title:"Reference Notes",description:"Reference reading: examine how the supplied subject and setting relate through perspective, skin tones, lighting, and depth of field. This is commentary on existing images, not an executed prompt.",image:null,content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-purple-400/40 bg-purple-400/10 text-purple-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-purple-400/40 bg-purple-400/10 text-purple-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-wand-sparkles h-4 w-4"}>
                    <path d={"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"}>
                    </path>
                    <path d={"m14 7 3 3"}>
                    </path>
                    <path d={"M5 6v4"}>
                    </path>
                    <path d={"M19 14v4"}>
                    </path>
                    <path d={"M10 2v2"}>
                    </path>
                    <path d={"M7 8H3"}>
                    </path>
                    <path d={"M21 16h-4"}>
                    </path>
                    <path d={"M11 3H9"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Prompt"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Reference Notes"}                  </h3>
                </div>
              </div>
              <p className={"line-clamp-2 text-[11px] leading-relaxed text-black/60 font-medium"}>
{"Reference reading: examine how the supplied subject and setting relate through perspective, skin tones, lighting, and depth of field. This is commentary on existing images, not an executed prompt."}              </p>
            </div>
          </div>
)},
{x:400,y:340,title:"Result Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 2/Final.optimized.png",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-shield-check h-4 w-4"}>
                    <path d={"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}>
                    </path>
                    <path d={"m9 12 2 2 4-4"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Output"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Result Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 2/Final.optimized.png"} alt={"Final Image"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)}
]} connections={[[0, 2], [1, 2], [2, 3]]} />            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 min-h-[600px] !p-0 overflow-hidden bg-white border border-black/5"}>
          <div className={"grid lg:grid-cols-[60%_40%] h-full min-h-[600px]"}>
            <div className={"bg-zinc-100/50 flex flex-col items-center justify-center p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-black/5 relative group"}>
<Workflow title={"Study 03: Environment Comparison"} nodes={[
{x:40,y:40,title:"Subject Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 3/Shot.optimized.jpg",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-zinc-400/40 bg-zinc-400/10 text-zinc-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-zinc-400/40 bg-zinc-400/10 text-zinc-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-box h-4 w-4"}>
                    <path d={"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}>
                    </path>
                    <path d={"m3.3 7 8.7 5 8.7-5"}>
                    </path>
                    <path d={"M12 22V12"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Input"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Subject Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 3/Shot.optimized.jpg"} alt={"Shot"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)},
{x:40,y:260,title:"Setting Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 3/Location.optimized.png",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-blue-400/40 bg-blue-400/10 text-blue-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-blue-400/40 bg-blue-400/10 text-blue-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-image h-4 w-4"}>
                    <rect width={"18"} height={"18"} x={"3"} y={"3"} rx={"2"} ry={"2"}>
                    </rect>
                    <circle cx={"9"} cy={"9"} r={"2"}>
                    </circle>
                    <path d={"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Input"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Setting Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 3/Location.optimized.png"} alt={"Location"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)},
{x:400,y:150,title:"Reference Notes",description:"Reference reading: compare the people, scooter, and environment across the supplied images. Look for consistent scale, shadows, and depth; the diagram does not establish authorship or generation history.",image:null,content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-purple-400/40 bg-purple-400/10 text-purple-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-purple-400/40 bg-purple-400/10 text-purple-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-wand-sparkles h-4 w-4"}>
                    <path d={"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"}>
                    </path>
                    <path d={"m14 7 3 3"}>
                    </path>
                    <path d={"M5 6v4"}>
                    </path>
                    <path d={"M19 14v4"}>
                    </path>
                    <path d={"M10 2v2"}>
                    </path>
                    <path d={"M7 8H3"}>
                    </path>
                    <path d={"M21 16h-4"}>
                    </path>
                    <path d={"M11 3H9"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Prompt"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Reference Notes"}                  </h3>
                </div>
              </div>
              <p className={"line-clamp-2 text-[11px] leading-relaxed text-black/60 font-medium"}>
{"Reference reading: compare the people, scooter, and environment across the supplied images. Look for consistent scale, shadows, and depth; the diagram does not establish authorship or generation history."}              </p>
            </div>
          </div>
)},
{x:400,y:340,title:"Result Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 3/Final.optimized.png",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-shield-check h-4 w-4"}>
                    <path d={"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}>
                    </path>
                    <path d={"m9 12 2 2 4-4"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Output"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Result Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 3/Final.optimized.png"} alt={"Final Image"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)}
]} connections={[[0, 2], [1, 2], [2, 3]]} />            </div>
            <div className={"p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative"}>
              <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/30 mb-6"}>
{"Study 03"}              </p>
              <h2 className={"text-4xl md:text-5xl font-bold tracking-tight mb-10 leading-[1.1]"}>
{"Environment Comparison"}              </h2>
              <div className={"space-y-8"}>
                <div>
                  <h4 className={"text-[10px] lg:text-xs uppercase tracking-widest font-bold text-black/40 mb-6"}>
{"Review Checklist"}                  </h4>
                  <ul className={"space-y-6"}>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"1"}                      </div>
                      <span>
{"Compare the subject pose and framing across the supplied pair"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"2"}                      </div>
                      <span>
{"Identify perspective, lighting direction, and depth cues"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"3"}                      </div>
                      <span>
{"Check whether the setting follows those same cues"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"4"}                      </div>
                      <span>
{"Inspect boundaries and contact shadows for visible discontinuities"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"5"}                      </div>
                      <span>
{"Record visual questions rather than assume the result is authentic"}                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 min-h-[600px] !p-0 overflow-hidden bg-white border border-black/5"}>
          <div className={"grid lg:grid-cols-[40%_60%] h-full min-h-[600px]"}>
            <div className={"p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white order-last lg:order-first relative"}>
              <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/30 mb-6"}>
{"Study 04"}              </p>
              <h2 className={"text-4xl md:text-5xl font-bold tracking-tight mb-10 leading-[1.1]"}>
{"Styling and Context"}              </h2>
              <div className={"space-y-8"}>
                <div>
                  <h4 className={"text-[10px] lg:text-xs uppercase tracking-widest font-bold text-black/40 mb-6"}>
{"Review Checklist"}                  </h4>
                  <ul className={"space-y-6"}>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"1"}                      </div>
                      <span>
{"Compare pose and composition between the supplied images"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"2"}                      </div>
                      <span>
{"Observe differences in clothing and texture"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"3"}                      </div>
                      <span>
{"Read environmental details without inferring audience research"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"4"}                      </div>
                      <span>
{"Check whether clothing, setting, and lighting appear coherent"}                      </span>
                    </li>
                    <li className={"flex gap-4 items-start font-medium text-black/80 text-lg"}>
                      <div className={"px-2.5 py-1 text-[10px] bg-black/5 rounded font-bold uppercase tracking-wider text-black/40 shrink-0"}>
{"CHECK 0"}{"5"}                      </div>
                      <span>
{"Note that visual plausibility does not establish cultural accuracy"}                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={"bg-zinc-100/50 flex flex-col items-center justify-center p-4 md:p-8 border-b lg:border-b-0 lg:border-l border-black/5 relative group"}>
<Workflow title={"Study 04: Styling and Context"} nodes={[
{x:40,y:40,title:"Subject Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 4/Shot.optimized.jpg",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-zinc-400/40 bg-zinc-400/10 text-zinc-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-zinc-400/40 bg-zinc-400/10 text-zinc-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-box h-4 w-4"}>
                    <path d={"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}>
                    </path>
                    <path d={"m3.3 7 8.7 5 8.7-5"}>
                    </path>
                    <path d={"M12 22V12"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Input"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Subject Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 4/Shot.optimized.jpg"} alt={"Shot"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)},
{x:40,y:260,title:"Setting Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 4/Location.optimized.png",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-blue-400/40 bg-blue-400/10 text-blue-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-blue-400/40 bg-blue-400/10 text-blue-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-image h-4 w-4"}>
                    <rect width={"18"} height={"18"} x={"3"} y={"3"} rx={"2"} ry={"2"}>
                    </rect>
                    <circle cx={"9"} cy={"9"} r={"2"}>
                    </circle>
                    <path d={"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Input"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Setting Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 4/Location.optimized.png"} alt={"Location"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)},
{x:40,y:480,title:"Clothing Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 4/Attire.optimized.png",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-rose-400/40 bg-rose-400/10 text-rose-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-rose-400/40 bg-rose-400/10 text-rose-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-image h-4 w-4"}>
                    <rect width={"18"} height={"18"} x={"3"} y={"3"} rx={"2"} ry={"2"}>
                    </rect>
                    <circle cx={"9"} cy={"9"} r={"2"}>
                    </circle>
                    <path d={"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Input"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Clothing Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 4/Attire.optimized.png"} alt={"Attire"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)},
{x:400,y:150,title:"Reference Notes",description:"Reference reading: inspect the supplied subject, house, scooter, and clothing together. Compare proportions, pose, and perspective. These notes describe a study of existing imagery, not a client brief or a prompt run by Petrus.",image:null,content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-purple-400/40 bg-purple-400/10 text-purple-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-purple-400/40 bg-purple-400/10 text-purple-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-wand-sparkles h-4 w-4"}>
                    <path d={"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"}>
                    </path>
                    <path d={"m14 7 3 3"}>
                    </path>
                    <path d={"M5 6v4"}>
                    </path>
                    <path d={"M19 14v4"}>
                    </path>
                    <path d={"M10 2v2"}>
                    </path>
                    <path d={"M7 8H3"}>
                    </path>
                    <path d={"M21 16h-4"}>
                    </path>
                    <path d={"M11 3H9"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Prompt"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Reference Notes"}                  </h3>
                </div>
              </div>
              <p className={"line-clamp-2 text-[11px] leading-relaxed text-black/60 font-medium"}>
{"Reference reading: inspect the supplied subject, house, scooter, and clothing together. Compare proportions, pose, and perspective. These notes describe a study of existing imagery, not a client brief or a prompt run by Petrus."}              </p>
            </div>
          </div>
)},
{x:400,y:340,title:"Result Reference",description:null,image:"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 4/Final.optimized.png",content:(          <div className={"group/node relative w-full overflow-hidden rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 bg-white/90 p-3 shadow-md backdrop-blur transition-all cursor-pointer "}>
            <div className={"absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100 pointer-events-none"}>
            </div>
            <div className={"relative space-y-2 pointer-events-none"}>
              <div className={"flex items-start gap-3"}>
                <div className={"flex h-8 w-8 mt-1 shrink-0 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 bg-white"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-shield-check h-4 w-4"}>
                    <path d={"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}>
                    </path>
                    <path d={"m9 12 2 2 4-4"}>
                    </path>
                  </svg>
                </div>
                <div className={"min-w-0 flex-1"}>
                  <div className={"mb-1 inline-block rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-black/60"}>
{"Output"}                  </div>
                  <h3 className={"truncate text-sm font-bold tracking-tight text-black/80"}>
{"Result Reference"}                  </h3>
                </div>
              </div>
              <div className={"mt-2 w-full rounded-md overflow-hidden border border-black/10 shadow-sm pointer-events-none"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Banners/Banner 4/Final.optimized.png"} alt={"Final Image"} className={"w-full h-auto object-cover max-h-[120px]"} />
              </div>
            </div>
          </div>
)}
]} connections={[[0, 3], [1, 3], [2, 3], [3, 4]]} />            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-black text-white flex items-center justify-center !py-24 lg:!py-40"}>
          <div>
            <h2 className={"text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-center max-w-4xl text-balance leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-zinc-500 p-6"}>
{"A workflow can be read as a system —"}              <br />
              <span className={"text-white mt-4 block"}>
{"these images remain attributed references."}              </span>
            </h2>
          </div>
        </StudyCard>
      </div>
    </main>
  );
}
