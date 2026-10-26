import DOMPurify from 'dompurify';
import { marked } from 'marked';

// Links to other sites open in a new tab, so people do not lose their place in the hub.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && /^https?:/i.test(node.getAttribute('href') ?? '')) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

// {{like this}} marks a detail still to be confirmed. It renders highlighted so gaps are easy to spot.
const placeholders = (src: string) => src.replace(/\{\{(.+?)\}\}/g, '<mark class="ph">$1</mark>');

export const renderMarkdown = (src: string) =>
  DOMPurify.sanitize(marked.parse(placeholders(src), { async: false, gfm: true, breaks: true }));

export const renderInline = (src: string) =>
  DOMPurify.sanitize(marked.parseInline(placeholders(src), { async: false, gfm: true }));

/** HTML from the rich text editor. Sanitised again on the way out, as it is stored as written. */
export const renderRich = (html: string) => DOMPurify.sanitize(placeholders(html), { ADD_ATTR: ['target'] });
