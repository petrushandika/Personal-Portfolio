import { notFound } from 'next/navigation';
import { StudyPage, studyPages, type StudySlug } from '../../components/studies';

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(studyPages).map(slug => ({ slug }));
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in studyPages)) notFound();
  return <StudyPage slug={slug as StudySlug} />;
}
