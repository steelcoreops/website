# Steel Core Team Hub

Signed-in hub at `team.steelcoreoperations.com` for the Steel Core team, delivery partners and, later, employees.

- **Spaces → Topics → Pages.** Spaces keep audiences apart (Delivery Partners, Employees, or one per client); people only see the spaces they are added to. Inside a space, topics group pages in a Waybook-style sidebar.
- **Steel Core team** accounts (role `admin`) see every space and can create, edit and delete pages, spaces and people.
- **Members** see published pages in their own spaces and nothing else.
- **Acknowledgements.** Any page can ask members to confirm they have read it. Each confirmation is dated and tied to the page's version; admins can ask everyone to confirm again after a significant change. **Sign-offs** shows who has signed what and exports the full history as CSV.
- **Files** live in a private storage bucket. Only people who can see the space can open them, through links that expire after an hour.
- **Sign-in** uses an emailed link or a 6-digit code. There are no passwords and no public sign-up, so only invited people can get in.
- **Removing access** blocks content straight away (row-level security checks `profiles.active`), bans the account so its session cannot be refreshed, and keeps the record. **Delete** removes the account entirely.

## Stack

React 19, Vite 6, Tailwind 4 and React Router, in the same house style as the marketing site. Supabase provides auth and Postgres with row-level security. One Vercel function (`api/members.ts`) handles invites and access changes that need the service key.

## Setup

### 1. Supabase

1. Create a project at supabase.com. Pick the London (eu-west-2) region.
2. In **SQL Editor**, run `supabase/schema.sql`, then `supabase/seed.sql`. The schema also creates the private `hub-files` storage bucket. The seed creates the Delivery Partners and Employees spaces, a "Working with Steel Core" topic holding the four starter pages, and marks Getting Started and Ways of Working as needing acknowledgement.
3. Go to **Authentication → Sign In / Providers**. Leave Email on, and turn **off** "Allow new users to sign up".
4. Go to **Authentication → URL Configuration**:
   - Site URL: `https://team.steelcoreoperations.com`
   - Redirect URLs: `https://team.steelcoreoperations.com/**` and `http://localhost:3100/**`
5. Go to **Authentication → SMTP Settings** and add a real email provider, such as Resend or Postmark, sending from `team@steelcoreoperations.com` or similar. Without one, Supabase only delivers email to members of your Supabase organisation, so invites to partners will not arrive.
6. Go to **Authentication → Email Templates** and update **Magic Link** and **Invite user** so they include the code as well as the link. Corporate email scanners sometimes "click" links and use them up. The code still works when that happens.

   ```html
   <h2>Sign in to the Steel Core Team Hub</h2>
   <p><a href="{{ .ConfirmationURL }}">Sign in</a></p>
   <p>Or enter this code: <strong>{{ .Token }}</strong></p>
   ```

7. Make yourself the first admin. Go to **Authentication → Users → Invite user** and enter your email. Then run:

   ```sql
   update public.profiles set role = 'admin' where email = 'you@steelcoreoperations.com';
   ```

   After this, invite everyone else from the **People** screen in the app.

### 2. Vercel

1. Create a **new** Vercel project from this same GitHub repo.
2. Set **Root Directory** to `team-hub`. The framework preset is Vite.
3. Add these environment variables (see `.env.example`). Find the values in Supabase under **Project Settings → API**.

   | Name | Value |
   | --- | --- |
   | `VITE_SUPABASE_URL` | Project URL |
   | `VITE_SUPABASE_ANON_KEY` | anon / publishable key |
   | `SUPABASE_URL` | Project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role / secret key. Server only, never give it a `VITE_` prefix. |
   | `SITE_URL` | `https://team.steelcoreoperations.com` |

4. Under **Domains**, add `team.steelcoreoperations.com`. If DNS is not managed by Vercel, add a `CNAME` record: `team` pointing to `cname.vercel-dns.com`.
5. Optional: stop each project rebuilding when only the other one changed. Under **Settings → Git → Ignored Build Step**:
   - Marketing site: `git diff --quiet HEAD^ HEAD -- . ':!team-hub'`
   - Team Hub: `git diff --quiet HEAD^ HEAD -- .`

## Run locally

```bash
cd team-hub
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # UI on http://localhost:3100
```

`npm run dev` serves the UI only. To use invite and remove-access locally, run `npx vercel dev` instead, which also serves `/api/members`.

## Editing content

Open any page and choose **Edit page**, or **New page** in a space's sidebar. Choose **Manage topics** on a space's front page to add, rename, reorder or delete topics; pick a page's topic in the editor. Deleting a topic keeps its pages under "Other pages".

A page is a list of blocks:

| Block | Use it for |
| --- | --- |
| Rich text | Free writing with a toolbar: headings, bold, italics, lists, quotes, links and uploaded images |
| Section | A numbered heading with text, or plain text when the heading is left blank |
| Callout | A rule or key point, with a rust edge |
| Two panels | Side by side, e.g. "what you can expect from us" / "what we ask of you" |
| Checklist | Numbered steps or a template outline |
| People | Team cards with photo, role, remit, Slack and email |
| Contact list | Label and value rows |
| Alert box | Dark box for urgent information |
| Downloads | Uploaded files (PDFs, templates, contracts), up to 50 MB each |
| Links | Cards linking out to tools and documents |
| Embed | Loom, YouTube, Vimeo, Google Docs / Slides / Sheets / Forms / Drive, or Figma. Anything else shows as a link |

Plain text fields in the other blocks take simple formatting: `**bold**`, `- bullets`, `[links](https://…)`. Wrap anything still to be confirmed in `{{double braces}}` and it shows highlighted, so gaps are easy to spot before you publish.

Pages stay as drafts, visible only to the Steel Core team, until **Published** is ticked. Tick **Needs acknowledgement** to ask members to confirm they have read a page. When you change it later, tick **Ask everyone to acknowledge again** for significant changes; leave it unticked for typo fixes.

Removing a file or image from a page does not delete it from storage. Clear out unused files from the `hub-files` bucket in Supabase if you ever need to.

## Files

```
api/members.ts           invite, remove access, restore, delete (service key, admin-only)
supabase/schema.sql      tables, row-level security, triggers, storage bucket
supabase/seed.sql        spaces and Ways of Working content
src/lib/                 auth, Supabase client, types, markdown, topics, acknowledgements, file storage, embeds
src/components/blocks/   block rendering and block editing
src/pages/               hub, space, page view and editor, admin screens (people, spaces, sign-offs)
```
