import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { AckStatus } from '../lib/acks';
import { formatDate } from '../lib/format';
import { Button, Checkbox, Label, Notice } from './ui';

type Props = { title: string; status: AckStatus; onAcknowledge: () => Promise<void> };

/** The sign-off box at the foot of a page that asks members to confirm they have read it. */
export function AckPanel({ title, status, onAcknowledge }: Props) {
  const [ticked, setTicked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (status.state === 'none') return null;

  if (status.state === 'done') {
    return (
      <div className="mt-14 flex items-start gap-3 border-2 border-ok bg-ok/5 px-5 py-4">
        <CheckCircle2 size={20} className="text-ok flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-steel-dark">You have read and acknowledged this page</div>
          <div className="text-sm text-steel-base">Confirmed on {formatDate(status.at)}.</div>
        </div>
      </div>
    );
  }

  const submit = async () => {
    setError('');
    setSaving(true);
    try {
      await onAcknowledge();
      setTicked(false);
    } catch (e) {
      setError((e as Error).message);
    }
    setSaving(false);
  };

  return (
    <section className="mt-14 border-2 border-steel-dark bg-white shadow-[4px_4px_0_0_var(--color-rust-base)]" aria-labelledby="ack-heading">
      <div className="px-5 py-5 md:px-6">
        <Label className="text-rust-base mb-2">Acknowledgement needed</Label>
        <h2 id="ack-heading" className="font-display uppercase tracking-tight text-xl leading-tight mb-2">
          {status.state === 'outdated' ? 'This page has changed' : 'Please confirm you have read this'}
        </h2>
        <p className="text-[15px] text-steel-base mb-5 max-w-[60ch]">
          {status.state === 'outdated'
            ? `We have updated this page since you acknowledged it on ${formatDate(status.at)}. Please read it again, then confirm below.`
            : 'Once you have read the whole page, tick the box and confirm. We keep a record of the date.'}
        </p>
        {error && (
          <div className="mb-4">
            <Notice tone="error">{error}</Notice>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line">
          <Checkbox checked={ticked} onChange={setTicked} label={<span>I have read and understood <strong>{title}</strong></span>} />
          <Button onClick={submit} disabled={!ticked || saving}>
            {saving ? 'Saving…' : 'Acknowledge'}
          </Button>
        </div>
      </div>
    </section>
  );
}
