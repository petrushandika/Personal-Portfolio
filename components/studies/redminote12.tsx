/* Editable JSX migrated from the personalized reference, with shared live interactions. */
import { ColorGallery, ExplorationDeck } from "./redmi";
import { StudyCard, Carousel, SlideTrack, Workflow, ArtworkGallery, ReferenceFilm } from "./interactive";

export default function Redminote12Study() {
  return (
    <main className={"relative min-h-screen bg-[#f8f9fa] text-[#1c1c1c] overflow-x-hidden selection:bg-black selection:text-white pb-32"}>
      <div className={"pt-32 pb-8"}>
      </div>
      <div className={"fixed bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 z-50"}>
        <a className={"flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-lg border border-black/10 rounded-full text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 group"} href={"/#works"}>
          <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-arrow-left w-4 h-4 group-hover:-translate-x-1 transition-transform"}>
            <path d={"m12 19-7-7 7-7"}>
            </path>
            <path d={"M19 12H5"}>
            </path>
          </svg>
{"Back to Studies"}</a>
      </div>
      <div className={"w-full max-w-[1600px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-4 md:gap-6"}>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 !p-10 lg:!p-16 bg-gradient-to-br from-white to-gray-50/80"}>
          <div className={"flex flex-col lg:flex-row lg:items-end justify-between gap-12"}>
            <div className={"max-w-4xl"}>
              <h1 className={"text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[1.05] mb-6"}>
{"Product Systems"}</h1>
              <p className={"text-2xl md:text-3xl text-black/60 font-medium leading-tight text-balance"}>
{"Visual-reference study curated by Petrus Handika: how a product identity travels across formats. Reference imagery: Cartooneast / Anurag Bandyopadhyay. Not client work by Petrus Handika."}</p>
            </div>
            <div className={"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 min-w-[200px]"}>
              <div>
                <p className={"text-xs uppercase tracking-widest font-bold text-black/40 mb-1"}>
{"Curator"}</p>
                <p className={"font-medium text-sm md:text-base leading-snug text-black/80"}>
{"Petrus Handika,"}<br />
{"Reference Curation"}</p>
              </div>
              <div>
                <p className={"text-xs uppercase tracking-widest font-bold text-black/40 mb-1"}>
{"Study Focus"}</p>
                <p className={"font-medium text-sm md:text-base leading-snug text-black/80"}>
{"Product Hierarchy,"}<br />
{"Cross-format Patterns"}</p>
              </div>
              <div>
                <p className={"text-xs uppercase tracking-widest font-bold text-black/40 mb-1"}>
{"Type"}</p>
                <p className={"font-medium text-sm md:text-base leading-snug text-black/80"}>
{"Study"}</p>
              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 aspect-[4/3] md:aspect-[21/9] !p-0"}>
          <div className={"absolute inset-0 w-full h-full"}>
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/Header.optimized.jpg"} alt={"Header"} className={"w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"} />
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-1 justify-between min-h-[400px]"}>
          <div>
            <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-6"}>
{"1. Reading the Product"}</p>
            <h2 className={"text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance leading-[1.1]"}>
{"A Product-led Reference"}</h2>
            <p className={"text-sm md:text-base text-black/70 leading-relaxed mb-6"}>
{"This third-party reference brings product imagery, feature messaging, and launch formats into one visual collection. Petrus presents it for observation, not as an authored campaign."}</p>
          </div>
          <p className={"text-sm md:text-base font-medium tracking-tight text-balance leading-tight bg-black/5 p-4 rounded-xl"}>
{"Study question: how can hierarchy keep a complex product story readable?"}</p>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-3 min-h-[400px] !p-0 bg-zinc-900 text-white flex flex-col"}>
          <div className={"p-8 md:p-10 pb-6"}>
            <h3 className={"text-2xl font-bold tracking-tight mb-2"}>
{"Colour and Material Notes"}</h3>
            <p className={"text-white/60 mb-6"}>
{"Compare how lighting, colour, and negative space distinguish the supplied product references. These are observations of existing imagery, not new product designs."}</p>
          </div>
          <ColorGallery />
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-[#f1f1f1] text-[#1c1c1c] !p-10 lg:!p-16"}>
          <div className={"grid md:grid-cols-2 gap-12 items-center"}>
            <div>
              <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-6"}>
{"Questions for Review"}</p>
              <h2 className={"text-4xl lg:text-6xl font-bold tracking-tighter mb-8 text-balance leading-[1.05]"}>
{"Read the reference through three lenses:"}</h2>
              <ul className={"space-y-6"}>
                <li className={"flex items-start gap-4"}>
                  <div className={"w-6 h-6 mt-1 flex-shrink-0 bg-black/10 rounded-full flex items-center justify-center text-xs font-bold"}>
{"1"}</div>
                  <p className={"text-xl lg:text-2xl text-black/80 font-medium"}>
{"Compare the same composition across screen and physical formats."}</p>
                </li>
                <li className={"flex items-start gap-4"}>
                  <div className={"w-6 h-6 mt-1 flex-shrink-0 bg-black/10 rounded-full flex items-center justify-center text-xs font-bold"}>
{"2"}</div>
                  <p className={"text-xl lg:text-2xl text-black/80 font-medium"}>
{"Notice which product details receive the strongest emphasis."}</p>
                </li>
                <li className={"flex items-start gap-4"}>
                  <div className={"w-6 h-6 mt-1 flex-shrink-0 bg-black/10 rounded-full flex items-center justify-center text-xs font-bold"}>
{"3"}</div>
                  <p className={"text-xl lg:text-2xl text-black/80 font-medium"}>
{"Look for recurring hierarchy at small and large scales."}</p>
                </li>
              </ul>
            </div>
            <div className={"h-full flex items-center justify-center"}>
              <p className={"text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-500 to-zinc-900 italic"}>
{"One reference. "}<br />
{"Several readings."}</p>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-2 min-h-[400px]"}>
          <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-6"}>
{"2. Reading the Composition"}</p>
          <h2 className={"text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-[1.1]"}>
{"Composition Notes"}</h2>
          <p className={"text-lg text-black/70 leading-relaxed mb-8"}>
{"The supplied composition uses "}<span className={"font-semibold text-black"}>
{"monumental scale"}</span>
{" to make the device a focal point. Useful details to inspect include:"}</p>
          <ul className={"space-y-4"}>
            <li className={"flex gap-4 items-center bg-black/5 p-4 rounded-xl font-medium"}>
              <div className={"w-2 h-2 rounded-full bg-black/40"}>
              </div>
{"Narrative lighting cues"}</li>
            <li className={"flex gap-4 items-center bg-black/5 p-4 rounded-xl font-medium"}>
              <div className={"w-2 h-2 rounded-full bg-black/40"}>
              </div>
{"Subject-to-environment ratios"}</li>
            <li className={"flex gap-4 items-center bg-black/5 p-4 rounded-xl font-medium"}>
              <div className={"w-2 h-2 rounded-full bg-black/40"}>
              </div>
{"Product-centred framing"}</li>
          </ul>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-2 !p-0 aspect-square md:aspect-auto"}>
          <div className={"w-full h-full relative p-8 flex flex-col justify-end min-h-[400px]"}>
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/KV/KV.optimized.jpg"} alt={"Master Key Visual"} className={"absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"} />
            <div className={"absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"}>
            </div>
            <div className={"relative z-10 text-white"}>
              <p className={"font-bold text-2xl tracking-tight mb-2"}>
{"Primary Composition Reference"}</p>
              <p className={"text-white/80 font-medium"}>
{"A reference for comparing hierarchy across related images."}</p>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 !p-0 bg-[#f1f1f1] text-[#1c1c1c]"}>
          <div className={"grid md:grid-cols-12 h-full"}>
            <div className={"md:col-span-5 p-8 md:p-12 flex flex-col justify-center"}>
              <h3 className={"text-3xl font-bold tracking-tight mb-4"}>
{"Comparative Reading"}</h3>
              <p className={"text-black/70 text-lg leading-relaxed mb-8"}>
{"These supplied variations invite comparison of lighting, camera placement, and environmental context. Their inclusion documents visual references, not a design process performed by Petrus."}</p>
              <div className={"h-px w-full bg-black/10 mb-8"}>
              </div>
              <ul className={"space-y-4 text-black/90 font-medium"}>
                <li className={"flex gap-4"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-arrow-up-right w-5 h-5 text-black/40"}>
                    <path d={"M7 7h10v10"}>
                    </path>
                    <path d={"M7 17 17 7"}>
                    </path>
                  </svg>
{" Observe the reveal and framing"}</li>
                <li className={"flex gap-4"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-arrow-up-right w-5 h-5 text-black/40"}>
                    <path d={"M7 7h10v10"}>
                    </path>
                    <path d={"M7 17 17 7"}>
                    </path>
                  </svg>
{" Compare depth and contrast"}</li>
                <li className={"flex gap-4"}>
                  <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} className={"lucide lucide-arrow-up-right w-5 h-5 text-black/40"}>
                    <path d={"M7 7h10v10"}>
                    </path>
                    <path d={"M7 17 17 7"}>
                    </path>
                  </svg>
{" Check how crops change emphasis"}</li>
              </ul>
            </div>
            <div className={"md:col-span-7 bg-white/50 flex items-center justify-center min-h-[500px] w-full"}>
              <div className={"w-full mb-12"}>
                <ExplorationDeck />
              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 !p-0"}>
          <div className={"grid lg:grid-cols-2 h-full"}>
            <div className={"p-8 md:p-12 flex flex-col justify-center bg-[#1c1c1c] text-white"}>
              <h3 className={"text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight"}>
{"Large-format References"}</h3>
              <p className={"text-lg text-white/70 mb-8 leading-relaxed max-w-md"}>
{"The stage imagery provides another scale for reading the same visual language. Compare distance, contrast, and text density; no event production or collaboration by Petrus is implied."}</p>
            </div>
            <div className={"grid grid-cols-2 bg-black"}>
              <div className={"relative aspect-square overflow-hidden border border-white/10"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/KV/KV Stage 1.optimized.jpg"} alt={"KV Stage 1"} className={"w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out cursor-pointer"} loading={"lazy"} />
              </div>
              <div className={"relative aspect-square overflow-hidden border border-white/10"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/KV/KV Stage 2.optimized.jpg"} alt={"KV Stage 2"} className={"w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out cursor-pointer"} loading={"lazy"} />
              </div>
              <div className={"relative aspect-square overflow-hidden border border-white/10"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/KV/KV Stage 3.optimized.jpg"} alt={"KV Stage 3"} className={"w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out cursor-pointer"} loading={"lazy"} />
              </div>
              <div className={"relative aspect-square overflow-hidden border border-white/10"}>
                <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/KV/KV Stage 4.optimized.jpg"} alt={"KV Stage 4"} className={"w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out cursor-pointer"} loading={"lazy"} />
              </div>
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-gradient-to-br from-white to-[#f1f1f1] flex flex-col items-center text-center"}>
          <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-6"}>
{"3. Reading the Interface"}</p>
          <h2 className={"text-3xl md:text-5xl font-bold tracking-tighter mb-4"}>
{"Interface Reference"}</h2>
          <p className={"text-lg text-black/70 leading-relaxed mb-8 max-w-2xl mx-auto"}>
{"The supplied interface captures offer a reference for studying section order and product emphasis. They are not interfaces built or shipped by Petrus."}</p>
          <ul className={"space-y-4 mb-12 max-w-3xl mx-auto text-left w-full"}>
            <li className={"flex gap-4 items-center bg-white border border-black/5 p-4 md:px-6 rounded-xl text-sm md:text-base font-medium shadow-sm"}>
              <div className={"w-6 h-6 flex-shrink-0 bg-black text-white rounded-full flex items-center justify-center"}>
{"1"}</div>
{"Observe the relationship between narrative and features"}</li>
            <li className={"flex gap-4 items-center bg-white border border-black/5 p-4 md:px-6 rounded-xl text-sm md:text-base font-medium shadow-sm"}>
              <div className={"w-6 h-6 flex-shrink-0 bg-black text-white rounded-full flex items-center justify-center"}>
{"2"}</div>
{"Compare heading levels and section rhythm"}</li>
            <li className={"flex gap-4 items-center bg-white border border-black/5 p-4 md:px-6 rounded-xl text-sm md:text-base font-medium shadow-sm"}>
              <div className={"w-6 h-6 flex-shrink-0 bg-black text-white rounded-full flex items-center justify-center"}>
{"3"}</div>
{"Consider clarity without assuming engagement results"}</li>
          </ul>
          <div className={"mt-auto max-w-3xl w-full"}>
            <p className={"text-lg md:text-xl font-bold tracking-tight flex gap-3 items-center justify-center bg-black/5 p-5 md:py-6 rounded-2xl w-full"}>
              <span className={"text-xl md:text-2xl"}>
{"👉"}</span>
{" From image to interface: inspect continuity, not conversion claims."}</p>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 !p-0 overflow-hidden bg-white/5 border-none shadow-none group"}>
          <div className={"w-full relative aspect-[1/2] md:aspect-[5/3] lg:aspect-[16/9] bg-[#f2f2f2] rounded-[2rem] overflow-hidden shadow-inner border border-black/5 flex flex-col"}>
            <div className={"h-10 md:h-12 bg-[#e6e6e6]/80 backdrop-blur-md border-b border-black/10 flex items-center px-4 gap-4 sticky top-0 z-20 flex-shrink-0"}>
              <div className={"flex Bird gap-2"}>
                <div className={"w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400 border border-black/10"}>
                </div>
                <div className={"w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400 border border-black/10"}>
                </div>
                <div className={"w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400 border border-black/10"}>
                </div>
              </div>
              <div className={"flex-1 bg-white/70 rounded-md h-6 md:h-7 flex items-center px-3 justify-center text-[10px] md:text-xs text-black/50 font-medium font-sans"}>
{"Original product-page reference"}</div>
              <div className={"w-10"}>
              </div>
{" "}</div>
            <div className={"flex-1 overflow-y-auto no-scrollbar relative w-full h-full bg-[#f2f2f2]"}>
              <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/Mobile.optimized.jpg"} alt={"Redmi Note 12 Mobile Website"} className={"block md:hidden w-full h-auto object-top"} loading={"lazy"} />
              <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/Desktop.optimized.jpg"} alt={"Redmi Note 12 Desktop Website"} className={"hidden md:block w-full h-auto object-top"} loading={"lazy"} />
            </div>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-[#f1f1f1] !p-10 lg:!p-16"}>
          <p className={"text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black/40 mb-6"}>
{"4. Reading the Context"}</p>
          <h2 className={"text-4xl lg:text-5xl font-bold tracking-tighter mb-4"}>
{"Physical-format References"}</h2>
          <p className={"text-xl text-black/70 mb-12 max-w-2xl text-balance"}>
{"The supplied outdoor and retail images show compositions in different surroundings. Use them to compare legibility and cropping; this page does not claim rollout work or measured recall by Petrus."}</p>
          <div className={"columns-2 lg:columns-3 gap-4"}>
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH Horizontal.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 1"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH Verticle.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 2"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH1.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 3"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH10.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 4"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH11.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 5"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH2.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 6"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH3.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 7"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH4.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 8"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH5.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 9"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH6.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 10"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH7.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 11"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH8.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 12"} />
            <img src={"/storage/v1/object/public/portfolio-assets/public/Sections/Redmi Note 12/OOH/OOH9.optimized.jpg"} className={"w-full rounded-2xl border border-black/5 hover:scale-[1.02] transition-transform shadow-sm break-inside-avoid mb-4"} alt={"OOH 13"} />
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-2 min-h-[400px]"}>
          <h3 className={"text-3xl font-bold tracking-tight mb-4"}>
{"Presentation Reference"}</h3>
          <p className={"text-lg text-black/70 leading-relaxed mb-6"}>
{"The embedded source video adds presentation context to the visual collection. It is a third-party reference, not a launch, film, or presentation produced by Petrus."}</p>
          <div className={"w-full mt-auto rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center relative group"}>
            <iframe src={"https://www.youtube.com/embed/dBSJ2NY9oq0?rel=0&modestbranding=1"} title={"YouTube video player"} frameBorder={"0"} allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"} allowFullScreen={true} className={"w-full h-full absolute inset-0 z-10"}>
            </iframe>
          </div>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-2 bg-[#ff5100] text-white flex flex-col justify-center !p-10 min-h-[400px]"}>
          <h3 className={"text-3xl md:text-5xl font-bold tracking-tight mb-8"}>
{"Study Takeaways"}</h3>
          <ul className={"space-y-6"}>
            <li className={"flex gap-4 items-start font-medium text-lg leading-snug"}>
              <svg className={"w-6 h-6 flex-shrink-0 text-white"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.5"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                <polyline points={"20 6 9 17 4 12"}>
                </polyline>
              </svg>
{"Recurring visual cues can be compared across the supplied formats."}</li>
            <li className={"flex gap-4 items-start font-medium text-lg leading-snug"}>
              <svg className={"w-6 h-6 flex-shrink-0 text-white"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.5"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                <polyline points={"20 6 9 17 4 12"}>
                </polyline>
              </svg>
{"Scale changes invite different readability checks."}</li>
            <li className={"flex gap-4 items-start font-medium text-lg leading-snug"}>
              <svg className={"w-6 h-6 flex-shrink-0 text-white"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.5"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                <polyline points={"20 6 9 17 4 12"}>
                </polyline>
              </svg>
{"No perception, performance, or business outcomes are attributed to this study."}</li>
          </ul>
        </StudyCard>
        <StudyCard className={"col-span-1 md:col-span-2 lg:col-span-4 bg-black text-white flex items-center justify-center !py-24 lg:!py-40"}>
          <div>
            <h2 className={"text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-center max-w-4xl text-balance leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-zinc-500"}>
{"A reference for thinking in systems —"}<br />
{"not a claim of authorship."}</h2>
          </div>
        </StudyCard>
      </div>
    </main>
  );
}
