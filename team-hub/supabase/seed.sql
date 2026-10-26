-- Steel Core Team Hub: starter content. Run after schema.sql.
-- Creates the Delivery Partners and Employees spaces and loads the Ways of Working pages.
-- {{like this}} in the text marks a detail still to be confirmed; it shows highlighted on the page.

insert into public.spaces (slug, name, description, sort) values
  ('delivery-partners', 'Delivery Partners', 'For the specialists who deliver alongside us: how we work together, getting started, the team and who to call.', 1),
  ('employees', 'Employees', 'For the Steel Core team: how we run, policies and the practical side of working here.', 2)
on conflict (slug) do nothing;

insert into public.pages (space_id, slug, title, eyebrow, summary, sort, published, blocks)
select id, 'getting-started', 'Getting Started', 'Joining us', 'What to sort in your first few days, how you get paid, then how we handle client information.', 1, true, $blocks$[
  {
    "id": "seed-1",
    "type": "text",
    "heading": "Access and your first week",
    "body": "Before you start, we set you up with what you need: Slack access, a Steel Core email where the role needs one, plus access to the client systems you will work in. Operations coordinates this, with technical access handled on the technology side. If anything is missing on day one, say so straight away so we can fix it.\n\nClient system access is arranged through us with the client's own IT, so give us a little lead time before your first day.\n\nWe take security seriously, above all with client data. A few basics we expect from everyone:\n\n- Turn on multi-factor authentication everywhere it is offered.\n- Use {{our password manager}} for shared logins, never a personal note or spreadsheet.\n- Keep client data inside {{the agreed systems}}, never on personal drives, personal email or your own devices."
  },
  {
    "id": "seed-2",
    "type": "checklist",
    "title": "Your first week",
    "items": [
      {
        "label": "Accounts live",
        "note": "Slack, email and client access all working."
      },
      {
        "label": "Read the Ways of Working",
        "note": "So you know how we operate together."
      },
      {
        "label": "Meet your point of contact",
        "note": "Your named contact for the engagement."
      },
      {
        "label": "First summary",
        "note": "Due at the end of your first working week."
      }
    ]
  },
  {
    "id": "seed-3",
    "type": "text",
    "heading": "Invoicing and payment",
    "body": "How this works depends on how you are engaged. Find the one that fits you."
  },
  {
    "id": "seed-4",
    "type": "panels",
    "panels": [
      {
        "title": "Through an agency",
        "body": "Your rate and payment sit between you and your agency. You invoice the agency, not us. We settle with them under our own agreement.\n\nFrom our side, send us your hours each {{week}} via {{method}}, so we can check them against the agency's invoice. Keep your own copy of anything you submit."
      },
      {
        "title": "Directly with us",
        "body": "You invoice Steel Core directly. Send invoices to {{billing email}} by {{when}}, covering the {{period and hours}} worked.\n\nInclude {{your business name, company number or UTR and bank details}}, plus any reference we have given you. We pay within {{X days}} by bank transfer. Add VAT only if you are registered. Show your number when you do."
      }
    ]
  },
  {
    "id": "seed-5",
    "type": "text",
    "heading": "Confidentiality and data",
    "body": "You will agree confidentiality terms {{in your contract, or a separate NDA}} before you get access to anything sensitive. Treat everything you see inside a client's business as confidential, during the engagement and after it ends.\n\nOnly keep client data inside the systems we agree. Do not copy it to personal drives, personal email or your own devices. When an engagement ends, return or delete whatever you hold, as we direct.\n\nIf you come through an agency, these obligations apply to you directly, as well as through your agency's terms.\n\nThe full legal wording lives in your contract. This is the plain version, so nobody slips up by accident."
  }
]$blocks$::jsonb
from public.spaces where slug = 'delivery-partners'
on conflict (space_id, slug) do nothing;

insert into public.pages (space_id, slug, title, eyebrow, summary, sort, published, blocks)
select id, 'ways-of-working', 'Ways of Working', 'Delivery Partners', 'How we work together, so every engagement runs well from day one.', 2, true, $blocks$[
  {
    "id": "seed-6",
    "type": "text",
    "heading": "",
    "body": "This sets out how we work with the specialists who deliver alongside us. It is not your contract. That sits separately and covers the legal and commercial terms.\n\nThis is the practical side: what you can expect from us, what we ask of you, so there is nothing left to guess. We give the same document to everyone we work with, so we are consistent and fair across the board."
  },
  {
    "id": "seed-7",
    "type": "text",
    "heading": "How we work together",
    "body": "Steel Core is the bridge between you and the client. You focus on delivering excellent work. We handle the scope, the commercials and the relationship around it.\n\nDay to day you will work directly with the client's team to get things done. That is expected. We want you close to the people you are helping."
  },
  {
    "id": "seed-8",
    "type": "callout",
    "label": "",
    "body": "Anything that touches scope, timelines, availability, time off or money comes to us first, never straight to the client. If the client raises any of those with you, loop us in and we will take it from there. This keeps you out of awkward positions. It keeps everyone working to the same plan."
  },
  {
    "id": "seed-9",
    "type": "panels",
    "panels": [
      {
        "title": "What you can expect from us",
        "body": "- A clear brief for every piece of work.\n- Timely decisions and answers, so you are never left waiting on us.\n- Payment on time, on the terms we agreed.\n- One point of contact.\n- We represent you well with the client. We back you when it counts."
      },
      {
        "title": "What we ask of you",
        "body": "- Route anything about scope, time or money through us, not the client.\n- Send your weekly progress summary on time, so the client sees momentum.\n- Reply to our requests within the agreed window, or tell us if that is not realistic.\n- Flag problems early, while they are still small.\n- Handle client access and data in line with their own policies."
      }
    ]
  },
  {
    "id": "seed-10",
    "type": "text",
    "heading": "Staying in sync",
    "body": "Day to day, we work in Slack. That is where quick questions, updates and nudges happen, so keep an eye on it during your working hours. Anything that needs a record, or a proper decision, still comes to us directly.\n\nA little rhythm keeps everything smooth. It also means the client sees steady progress, which matters more than any single update.\n\nEach week, send us a progress summary on our standard form. It follows a set template. This is the document the client reads to see where things stand."
  },
  {
    "id": "seed-11",
    "type": "checklist",
    "title": "Weekly Progress Summary",
    "items": [
      {
        "label": "Summary of the week",
        "note": "A short narrative of what you worked on."
      },
      {
        "label": "Work completed",
        "note": "What you delivered or progressed, with a status against each item."
      },
      {
        "label": "In progress and planned",
        "note": "Live workstreams, next steps and due dates."
      },
      {
        "label": "Requires attention",
        "note": "Risks, blockers or decisions needed from the client."
      },
      {
        "label": "Notes and next check-in",
        "note": "Anything else, plus when the next update is due."
      }
    ]
  },
  {
    "id": "seed-12",
    "type": "text",
    "heading": "",
    "body": "Submit it by the end of your own working week, not the calendar week. If your days run Monday to Wednesday, it is due on Wednesday.\n\nWe will also hold a short call each week, around {{fifteen minutes}}, to cover anything the summary does not.\n\nWhen we ask you for something, a figure, a file, an update, we will give you a clear deadline. As a rule, turn small requests round within {{two working days}}. If something needs longer, that is fine, just tell us."
  },
  {
    "id": "seed-13",
    "type": "text",
    "heading": "How we scope and estimate work",
    "body": "We break work into clear chunks, each with an estimate against it. Your weekly summary then tracks real progress against those estimates. This is how we keep timelines honest for the client. It is also how we spot drift early.\n\nIf a piece is going to take longer than estimated, tell us the moment you see it. An early flag is never a problem. A silent overrun always is."
  },
  {
    "id": "seed-14",
    "type": "text",
    "heading": "Hours and working pattern",
    "body": "Your engagement sets your days and hours, for example three days a week at seven hours a day, twenty one hours in total. Within those hours we expect you reachable and responsive. If your pattern needs to flex in a given week, agree it with us first."
  },
  {
    "id": "seed-15",
    "type": "text",
    "heading": "Time off and cover",
    "body": "Planned time off comes to us, never to the client. Give us as much notice as you can. For anything beyond a day or two, we ask for at least {{two weeks}}.\n\nWe will arrange cover where the work needs it, so the client keeps moving while you are away. We will plan any handover with you before you go, so whoever steps in can pick things up cleanly."
  },
  {
    "id": "seed-16",
    "type": "text",
    "heading": "The essentials",
    "body": "Confidentiality, data protection, intellectual property and the commercial terms all live in your contract with us. This document sits alongside it as the practical how. It does not change anything in the contract. Where the two ever seem to differ, the contract wins. Tell us, so we can fix the wording here."
  },
  {
    "id": "seed-17",
    "type": "callout",
    "label": "",
    "body": "We have kept this deliberately short. If anything here does not fit a particular engagement, tell us. We would rather agree it up front than find it later."
  }
]$blocks$::jsonb
from public.spaces where slug = 'delivery-partners'
on conflict (space_id, slug) do nothing;

insert into public.pages (space_id, slug, title, eyebrow, summary, sort, published, blocks)
select id, 'the-team', 'The Team', 'Who we are', 'Steel Core runs as a partnership of three. Here is who looks after what, so you always know who to go to.', 3, true, $blocks$[
  {
    "id": "seed-18",
    "type": "people",
    "layout": "stacked",
    "people": [
      {
        "name": "Toni Martin",
        "role": "Chief Strategy Officer",
        "photo": "/team/toni.jpg",
        "slack": "@toni",
        "email": "toni@steelcoreoperations.com",
        "remit": "Leads strategy, the client relationships and the commercial side of every engagement. Your point of contact for anything touching scope, fees or the shape of the work."
      },
      {
        "name": "Rhiannon Leila",
        "role": "Chief Operations Officer",
        "photo": "/team/rhiannon.jpeg",
        "slack": "@rhiannon",
        "email": "rhiannon@steelcoreoperations.com",
        "remit": "Runs operations, scheduling and the day-to-day of delivery. Your point of contact for onboarding, time off, cover and keeping the week moving."
      },
      {
        "name": "Shari Sant",
        "role": "Chief Technical Officer",
        "photo": "/team/shari.png",
        "slack": "@shari",
        "email": "shari@steelcoreoperations.com",
        "remit": "Leads on technology, tooling and technical standards. Your point of contact for anything technical, from access and environments to how we build."
      }
    ]
  },
  {
    "id": "seed-19",
    "type": "text",
    "heading": "",
    "body": "Not sure who to go to? Start with your named contact for the engagement, or the team Slack channel. We will point you the right way."
  }
]$blocks$::jsonb
from public.spaces where slug = 'delivery-partners'
on conflict (space_id, slug) do nothing;

insert into public.pages (space_id, slug, title, eyebrow, summary, sort, published, blocks)
select id, 'emergency-and-contacts', 'Emergency & Contacts', 'How to reach us', 'Most things can wait for the next working day. Here is what to do when something cannot.', 4, true, $blocks$[
  {
    "id": "seed-20",
    "type": "alert",
    "label": "Urgent, out of hours",
    "heading": "Something that cannot wait",
    "body": "An emergency means a live issue affecting the client, a security or data concern, or anything where waiting until the next working day would cause real harm. If you are unsure whether it qualifies, treat it as one and reach out.\n\nFirst, call {{name}} on {{number}}. If you cannot reach them, call {{second name}} on {{number}}. Follow up in Slack so there is a written trail.\n\nWe aim to respond to a genuine emergency within {{response time}}, at any hour."
  },
  {
    "id": "seed-21",
    "type": "contacts",
    "rows": [
      {
        "label": "General enquiries",
        "value": "hello@steelcoreoperations.com"
      },
      {
        "label": "Day-to-day comms",
        "value": "{{team Slack workspace}}"
      },
      {
        "label": "Invoices and payment",
        "value": "{{billing contact / email}}"
      },
      {
        "label": "Office hours",
        "value": "{{Mon to Fri, 9 to 5}}"
      }
    ]
  },
  {
    "id": "seed-22",
    "type": "text",
    "heading": "",
    "body": "For anything that is not urgent, Slack or email during office hours is always the best route."
  }
]$blocks$::jsonb
from public.spaces where slug = 'delivery-partners'
on conflict (space_id, slug) do nothing;

-- File the starter pages under one topic.
insert into public.topics (space_id, name, description, sort)
select id, 'Working with Steel Core', 'How we work together, getting started, the team and who to call.', 1
from public.spaces where slug = 'delivery-partners'
and not exists (select 1 from public.topics t where t.space_id = spaces.id and t.name = 'Working with Steel Core');

update public.pages p set topic_id = t.id
from public.topics t
where t.space_id = p.space_id and t.name = 'Working with Steel Core' and p.topic_id is null;

-- Partners confirm they have read these two before they start.
update public.pages set requires_ack = true
where slug in ('getting-started', 'ways-of-working')
  and space_id = (select id from public.spaces where slug = 'delivery-partners');
