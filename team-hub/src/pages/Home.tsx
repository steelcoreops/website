import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { HubCard } from '../components/HubCard';
import { Badge, Eyebrow, Notice, Spinner, Title } from '../components/ui';
import { ackStatus, needsAck } from '../lib/acks';
import { useAuth } from '../lib/auth';
import { pad } from '../lib/format';
import { supabase } from '../lib/supabase';
import type { Acknowledgement, Page, Space } from '../lib/types';

export function Home() {
  const { profile, isAdmin } = useAuth();
  const [spaces, setSpaces] = useState<Space[] | null>(null);
  const [error, setError] = useState('');
  const [toAck, setToAck] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    supabase
      .from('spaces')
      .select('*')
      .order('sort')
      .order('name')
      .then(({ data, error }) => {
        if (error) setError(error.message);
        setSpaces((data as Space[]) ?? []);
      });
  }, []);

  // Count pages per space still waiting on this person's acknowledgement.
  useEffect(() => {
    if (isAdmin || !profile) return;
    (async () => {
      const [p, a] = await Promise.all([
        supabase.from('pages').select('id, space_id, requires_ack, version, published').eq('requires_ack', true).eq('published', true),
        supabase.from('acknowledgements').select('*').eq('user_id', profile.id),
      ]);
      const acks = (a.data ?? []) as Acknowledgement[];
      const counts = new Map<string, number>();
      for (const page of (p.data ?? []) as Pick<Page, 'id' | 'space_id' | 'requires_ack' | 'version' | 'published'>[]) {
        if (needsAck(ackStatus(page, acks))) counts.set(page.space_id, (counts.get(page.space_id) ?? 0) + 1);
      }
      setToAck(counts);
    })();
  }, [isAdmin, profile]);

  if (!spaces) return <Spinner />;
  // Most partners only belong to one space, so take them straight there.
  if (spaces.length === 1 && !isAdmin) return <Navigate to={`/s/${spaces[0]!.slug}`} replace />;

  const firstName = profile?.full_name?.split(' ')[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <Eyebrow className="mb-6">Team &amp; Delivery Hub</Eyebrow>
      <Title text={firstName ? `Welcome, ${firstName}` : 'Welcome'} className="text-[clamp(34px,6vw,56px)] mb-5" />
      <p className="text-lg text-steel-base max-w-[52ch]">Everything our team and delivery partners need, in one place.</p>

      {error && (
        <div className="mt-8">
          <Notice tone="error">{error}</Notice>
        </div>
      )}

      {spaces.length === 0 && !isAdmin ? (
        <div className="mt-10">
          <Notice>You have not been added to any spaces yet. Your Steel Core point of contact can sort this for you.</Notice>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {spaces.map((s, i) => (
            <HubCard
              key={s.id}
              to={`/s/${s.slug}`}
              label={pad(i + 1)}
              title={s.name}
              summary={s.description}
              badge={toAck.get(s.id) ? <Badge tone="rust">{toAck.get(s.id)} to acknowledge</Badge> : null}
            />
          ))}
          {isAdmin && (
            <Link
              to="/admin/spaces"
              className="flex flex-col items-center justify-center gap-2 min-h-[160px] border-2 border-dashed border-line hover:border-rust-base text-steel-base hover:text-rust-dark rounded-sm transition-colors"
            >
              <Plus size={20} />
              <span className="text-[13px] font-bold">Manage spaces</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
