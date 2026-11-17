import { Fragment } from 'react';

/** Renders `inline code` spans from plain article text without allowing HTML. */
export function RichText({ text }: { text: string }) {
  return <>{text.split('`').map((part, i) => i % 2 ? <code key={i}>{part}</code> : <Fragment key={i}>{part}</Fragment>)}</>;
}

export const plain = (text: string) => text.replace(/`/g, '');
