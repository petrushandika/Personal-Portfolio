import Redminote12Study from './studies/redminote12';
import DrivexdiwaliStudy from './studies/drivexdiwali';
import MarketplacecreativesStudy from './studies/marketplacecreatives';
import BannerrefreshStudy from './studies/bannerrefresh';
import ArtworksStudy from './studies/artworks';

export const studyPages = {
  redminote12: Redminote12Study,
  drivexdiwali: DrivexdiwaliStudy,
  marketplacecreatives: MarketplacecreativesStudy,
  bannerrefresh: BannerrefreshStudy,
  artworks: ArtworksStudy,
};
export type StudySlug = keyof typeof studyPages;
export function StudyPage({ slug }: { slug: StudySlug }) {
  const Page = studyPages[slug];
  return <Page />;
}
export default StudyPage;
