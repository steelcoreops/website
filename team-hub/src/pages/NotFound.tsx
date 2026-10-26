import { Link } from 'react-router';
import { buttonClass, Eyebrow, Title } from '../components/ui';

export const NotFound = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
    <Eyebrow className="mb-6">Not found</Eyebrow>
    <Title text="Nothing here" className="text-[clamp(32px,6vw,48px)] mb-5" />
    <p className="text-steel-base mb-8">This page does not exist, or you do not have access to it.</p>
    <Link to="/" className={buttonClass('secondary')}>
      Back to the hub
    </Link>
  </div>
);
