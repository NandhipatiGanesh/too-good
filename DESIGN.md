---
version: alpha
name: "Hardware store template by 8B"
description: "A one-page site for an independent hardware shop: pale paper, regular-weight Host Grotesk, round pills, five soft photo tones and dark department panels. Free HTML template by 8B, MIT."
colors:
  primary: "#211d1e"
  neutral: "#f1eee9"
  surface: "#ffffff"
  accent-yellow: "#e4e17a"
  forest: "#0e2c29"
  tone-orange: "#ef6a44"
  tone-sage: "#b8cda1"
  tone-sand: "#ceb58c"
  tone-blue: "#93abc9"
  caption: "#66605b"
  stone: "#e5e1d9"
typography:
  headline-display:
    fontFamily: Host Grotesk
    fontSize: 96px
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Host Grotesk
    fontSize: 68px
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.045em
  headline-md:
    fontFamily: Host Grotesk
    fontSize: 52px
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: -0.04em
  headline-list:
    fontFamily: Host Grotesk
    fontSize: 84px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.05em
  body-lg:
    fontFamily: Host Grotesk
    fontSize: 27px
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: -0.025em
  body-md:
    fontFamily: Host Grotesk
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Host Grotesk
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  label-md:
    fontFamily: Host Grotesk
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.01em
  button:
    fontFamily: Host Grotesk
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.04em
rounded:
  none: 0px
  sm: 6px
  md: 16px
  full: 999px
spacing:
  gutter: 36px
  gutter-phone: 16px
  section-y: 176px
  max-width: 1720px
  button-height: 46px
  breakpoint: 900px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: "{spacing.button-height}"
    padding: 22px
  button-primary-hover:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: "{spacing.button-height}"
    padding: 22px
  button-secondary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  nav-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: 38px
    padding: 16px
  guide-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    padding: 14px
  badge:
    backgroundColor: "{colors.tone-orange}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 30px
  hire-tag-front:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.primary}"
    rounded: 12px
    height: 68px
    width: 150px
  hire-tag-back:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: 12px
    height: 68px
    width: 150px
  input-field:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: 54px
    padding: 22px
  menu-overlay:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
---

# Sixpenny Hardware, a hardware store template

## Overview

Sixpenny Hardware is a one-page site for a neighbourhood hardware shop that sells by the single screw, cuts keys, mixes paint, runs Saturday classes and hires out tools. The idea is a friendly shop with a very long catalogue: a cloud of small product photos opens the page, aisle names are shown as an index, and prices sit in plain rows. The ground is pale paper, the type is regular weight and tightly tracked, and five soft tones (orange, sage, yellow, sand, blue) sit behind the pictures like paint chips. The demo address, prices and people are invented.

## Colors

- **Primary (#211d1e):** body text, the thin rules above list rows, dark button fills, the departments ground under its photos, and the full-screen menu.
- **Neutral (#f1eee9):** the page background and the soft fog behind the opening heading.
- **Surface (#ffffff):** pill button and guide card faces, text on dark sections, and the ring gap of the keyboard focus outline.
- **Accent yellow (#e4e17a):** the footer ground, the front of each hire tag, the owner's role and quote, the hover fill of dark buttons and of the question marks, and one of the photo tones.
- **Forest (#0e2c29):** the owner section ground.
- **Tone orange (#ef6a44):** the dot beside Open 7 days, and the tone behind some photos, badges and guide covers.
- **Tone sage (#b8cda1), tone sand (#ceb58c), tone blue (#93abc9):** the other tones behind photos, badges and guide covers.
- **Caption (#66605b):** stock counts, input placeholders and small grey notes.
- **Stone (#e5e1d9):** the ground of the hire and brought photo frames and of the newsletter box, and the fallback tone when an element has none.

## Typography

Host Grotesk is the only family, loaded at weights 400 and 500. Headings stay at 400, which keeps big type friendly, with negative tracking from -0.04em to -0.05em and a line height near 1. Medium 500 is for labels, aisle captions and buttons. Buttons and small nav pills are uppercase with 0.04em tracking; everything else is sentence case. The footer wordmark is 500 with -0.065em tracking and is sized from the name's character count (--len) so it spans the page width.

Sizes use clamp, and the tokens give the desktop maximum: the opening heading runs 44px to 96px, section headings 36px to 68px, aisle names 34px to 84px, counter and hire names about 28px to 52px, prices 21px to 27px, body 16px to 17px.

## Layout

Content sits in a wrapper up to 1720px wide with a fluid gutter from 16px to 36px, and sections are spaced by 96px to 176px of vertical padding. The opening centres its heading over the tile field. Departments are full-screen photo panels with a hairline, an aisle label in a narrow left column, a badge, a heading and a button, and a guide card pinned bottom right. Counter and hire are lists of rows with a text column and a photo column. Aisles are centred rows; the visit section splits half photo, half information.

Below 900px the nav links give way to a Menu button, grids collapse to one column and the hire intro stops being sticky. Below 760px the brought pairs stack and the opening tiles shrink and bunch toward the middle.

## Elevation & Depth

Shadows are rare: only the white guide cards and class cards carry one, soft and offset downward, and the focus outline adds a white 5px gap. Depth is made by layers: the opening tiles fly in 3D perspective behind a heading, department panels stack and wipe over each other, a dark overlay of 46 to 72 percent sits over each department photo, the owner and departments sections go dark between light ones, and the hire tags turn over in 3D.

## Shapes

Pills and circles carry the interface: buttons, nav pills, badges, the email field and the question marks are fully round. Framed photos and cards use soft corners of 16px (the full-bleed department photos, the owner portrait and the tiles stay square); class photos 10px, guide covers 6px, hire tags 12px. The brought pairs join into one shape, the left photo rounded on its left side and the right photo on its right. Small square chips beside aisle names take the tone colours. The opening tiles are plain rectangles tinted with a tone.

## Components

- **Button primary:** dark pill with a small arrow disc; hover fills it from the bottom with yellow.
- **Button secondary:** white pill on photos and paper; hover fills it dark and turns the text white.
- **Nav pill:** 38px white pill, 12px text; Open 7 days carries a small orange dot.
- **Guide card:** white card with a short title, a link and a big letter on a tone cover.
- **Badge:** 30px pill in the tone of its panel or card (orange in the token, any of the five in use) with a small square chip.
- **Hire tag:** a 150px by 68px card; the front is yellow with the weekend price, the back is dark with the price to buy new.
- **Input field:** 54px tall, 1px dark outline, pill shaped, 16px text.
- **Menu overlay:** full-screen dark panel with large links and the phone and address.

## Motion

The page uses no animation library: CSS scroll-driven animations do the work, with a small inline script that marks elements as they arrive, numbers list items and smooths wheel scrolling. A gate script in the head switches the scroll motion on only when the browser supports scroll-driven animations and the visitor has not asked for reduced motion. The one motion idea is things arriving as you scroll, matching the shop's long catalogue.

- **Opening:** on load the heading rises and the buttons slide in. The 26 tiles fly toward you in a 16 second CSS loop, paused when the opening is out of view. On scroll the tile field rushes past, the heading shrinks and fades, and the promise sentence darkens word by word.
- **Departments:** the section holds the screen for about four screens of scrolling (its height is set for five panels); each panel wipes up over the previous one while its photo settles and its text rises.
- **Counter, owner, faq, footer:** headings and quotes rise through a clip, list rows draw their rule and slide their cells in, photos unveil with a slight zoom. Each plays once.
- **Aisles:** each row scales from 70 percent to full size as it nears the middle and back as it leaves, with the tile turning in.
- **Brought:** the two photos slide in from opposite sides, tilted, and level out.
- **Classes:** on screens 600px and wider the cards start piled at the centre and deal out; on phones they slide in from alternate sides.
- **Hire:** each tag flips from the buy-new price to the weekend price as its row passes the middle.
- **Visit:** on wide screens the shop photo steps back into the left half while the information slides in; on phones the photo zooms out and the information rises.

Scroll motion is tied directly to the scroll position, with power2 and power3 style easing curves written as CSS. Without scroll-driven animation support (Firefox today) and with reduced motion, the scroll motion and the smooth wheel are off: every section shows its finished layout, the departments become five stacked screens and the hire tags show the weekend price. The tile loop and the opening load-in still play in Firefox and stop with reduced motion. The nav hide on scroll and the hover fills keep working in both.

## Do's and Don'ts

- Do keep the type at regular weight with tight tracking; do not add bold headings or a second display face.
- Do keep one tone behind each photo, chosen from the five; do not add other accent colours or gradients.
- Do keep pills for every control and 16px corners for pictures; do not add square buttons or sharp cards.
- Do show prices and times as plain rows between thin dark rules; do not wrap them in cards.
- Do keep the department panels dark with the overlay so the white text reads.
- Do keep yellow for the footer, hire tags and hover fills only.
- Do not add shadows beyond the guide and class cards, or stock icons.
- Do keep both faces of every hire tag and set the footer wordmark's --len when the name changes.
