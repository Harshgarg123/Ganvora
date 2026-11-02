import { RouterProvider, useRouter } from '@/lib/router';
import { Layout } from '@/components/Layout';
import { IntroOverlay } from '@/components/IntroOverlay';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { ContactPage } from '@/pages/ContactPage';
import { FieldNotesPage, FieldNoteDetailPage } from '@/pages/FieldNotesPage';

function Routes() {
  const { path } = useRouter();

  let page: React.ReactNode;

  if (path === '/') {
    page = <HomePage />;
  } else if (path === '/about') {
    page = <AboutPage />;
  } else if (path === '/services') {
    page = <ServicesPage />;
  } else if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '');
    page = <ServiceDetailPage slug={slug} />;
  } else if (path === '/contact') {
    page = <ContactPage />;
  } else if (path === '/field-notes') {
    page = <FieldNotesPage />;
  } else if (path.startsWith('/field-notes/')) {
    const slug = path.replace('/field-notes/', '').replace(/\/+$/, '');
    page = <FieldNoteDetailPage slug={slug} />;
  } else {
    page = <NotFound />;
  }

  return <Layout>{page}</Layout>;
}

function NotFound() {
  return (
    <section className="container-editorial pt-32 pb-32 text-center">
      <p className="label-mono">404</p>
      <span className="mx-auto mt-2 block h-px w-8 bg-forest" />
      <h1 className="mt-4 font-display text-display-md font-400 text-ink">
        Page not found.
      </h1>
      <p className="mt-4 text-sm text-ink-500">
        The page you're looking for doesn't exist or has moved.
      </p>
      <a href="/" className="btn-primary mt-8">
        Back home
      </a>
    </section>
  );
}

function App() {
  return (
    <RouterProvider>
      <IntroOverlay />
      <Routes />
    </RouterProvider>
  );
}

export default App;
