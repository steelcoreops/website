import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import { Shell, StandalonePage } from './components/Shell';
import { Button, Spinner } from './components/ui';
import { AuthProvider, useAuth } from './lib/auth';
import { isConfigured } from './lib/supabase';
import { Members } from './pages/admin/Members';
import { SignOffs } from './pages/admin/SignOffs';
import { Spaces } from './pages/admin/Spaces';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { PageView } from './pages/PageView';
import { SpaceIndex } from './pages/SpaceIndex';
import { SpaceLayout } from './pages/SpaceLayout';

// The editor carries the rich text library, so only admins who open it download it.
const PageEditor = lazy(() => import('./pages/PageEditor').then((m) => ({ default: m.PageEditor })));
const DemoApp = lazy(() => import('./DemoApp').then((m) => ({ default: m.DemoApp })));

export function App() {
  if (!isConfigured) {
    if (import.meta.env.DEV) {
      return (
        <Suspense fallback={<Spinner />}>
          <DemoApp />
        </Suspense>
      );
    }
    return (
      <StandalonePage eyebrow="Setup needed" title="Not connected">
        <p>
          Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, then rebuild. See <code>team-hub/README.md</code>.
        </p>
      </StandalonePage>
    );
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <RequireAuth>
                <Shell />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path="s/:spaceSlug" element={<SpaceLayout />}>
              <Route index element={<SpaceIndex />} />
              <Route path="new" element={<RequireAdmin><Suspense fallback={<Spinner />}><PageEditor /></Suspense></RequireAdmin>} />
              <Route path=":pageSlug" element={<PageView />} />
              <Route path=":pageSlug/edit" element={<RequireAdmin><Suspense fallback={<Spinner />}><PageEditor /></Suspense></RequireAdmin>} />
            </Route>
            <Route path="admin/members" element={<RequireAdmin><Members /></RequireAdmin>} />
            <Route path="admin/spaces" element={<RequireAdmin><Spaces /></RequireAdmin>} />
            <Route path="admin/sign-offs" element={<RequireAdmin><SignOffs /></RequireAdmin>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { loading, session, profile, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (!profile || !profile.active) {
    return (
      <StandalonePage eyebrow="No access" title="Access removed">
        <p>
          The account <strong>{session.user.email}</strong> does not currently have access to the Steel Core Team Hub. If you think this
          is a mistake, contact your Steel Core point of contact.
        </p>
        <Button variant="secondary" className="mt-6" onClick={signOut}>
          Sign out
        </Button>
      </StandalonePage>
    );
  }
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <NotFound />;
}
