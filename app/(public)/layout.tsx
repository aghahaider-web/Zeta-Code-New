import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { SkipLink } from './SkipLink';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <SkipLink />
      <Nav />
      <div id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        {children}
      </div>
      <Footer />
    </SmoothScroll>
  );
}