---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502205238c977eeccff3a48e0e6e7cc0600776d79beb8c6ac347cb4628903fd38e9f6022100b47f3f9b9bfbdc4e7c689e958ad1eaa01ff97cb84bbe258a668277e1d9839b80
    ReservedCode2: 3046022100e08852460e9ac469887123c74286332b7ec2600e82191c2619a8dcc87139cf5a0221008e95fe840fd00e2ab99b8f886bd7b4f191ea02deb83fe3a99203cb05672acfcc
---

# Golf Shaft Review Website - Design Specification

## Project Overview
- **Project Name**: ShaftMaster Pro
- **Project Type**: Static multi-page website (4 HTML pages)
- **Core Functionality**: Professional golf shaft reviews, guides, and industry news
- **Target Users**: Golf enthusiasts, amateur and professional golfers looking for unbiased shaft recommendations

## Website Structure

### 4 Independent Pages
1. **index.html** - Home/Landing page
2. **reviews.html** - Reviews listing and detail
3. **guides.html** - Guides listing and detail
4. **news.html** - News listing and detail

### Navigation
- Fixed top navigation bar (responsive)
- Brand logo left, nav links right
- Mobile: Hamburger menu

## Visual Design

### Color Palette (MyGolfSpy Style - Professional Dark)
- **Primary Dark**: #2E2E2E (Main background, headers)
- **Champagne Gold**: #BF9A5E (Accent, buttons, highlights)
- **Pure White**: #FFFFFF (Background blocks)
- **Light Gray**: #F5F5F5 (Section backgrounds)
- **Text Primary**: #2E2E2E (Body text)
- **Text Headers**: #000000 (H1-H6)
- **Text Muted**: #666666 (Secondary text)
- **Border**: #E0E0E0 (Dividers)

### Typography
- **Primary Font**: 'Inter', sans-serif (Clean, modern, professional)
- **Secondary Font**: 'Playfair Display', serif (Optional for featured headings)
- **Font Sizes**:
  - H1: 48px (desktop), 32px (mobile)
  - H2: 36px (desktop), 24px (mobile)
  - H3: 28px (desktop), 20px (mobile)
  - Body: 16px
  - Small: 14px
  - Caption: 12px

### Layout System
- Max content width: 1200px
- Grid: 12-column responsive grid
- Spacing unit: 8px base (8, 16, 24, 32, 48, 64, 96)
- Section padding: 64px vertical (desktop), 32px (mobile)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Component Specifications

### Navigation Bar
- Height: 72px
- Background: #2E2E2E (dark)
- Links: White text, gold hover underline
- Logo: White text with gold accent
- Sticky on scroll

### Hero Section (Home Page)
- Full viewport height (100vh)
- Dark background with subtle gradient
- Large headline: "The shaft matters most"
- Subheadline: "Data-backed, unbiased shaft reviews"
- CTA Button: Gold background, dark text

### Card Components (Reviews/Guides/News)
- White background
- Subtle shadow on hover
- Image thumbnail (16:9 aspect ratio)
- Category tag (gold)
- Title (bold)
- Excerpt (2 lines max)
- Read more link

### Buttons
- Primary: #BF9A9A5E background, #2E2E2E text
- Secondary: Transparent, #BF9A5E border and text
- Hover: Darken 10%

### Footer
- Dark background (#2E2E2E)
- 4-column layout
- Copyright text
- Social links

## Page-Specific Content

### Page 1: Home (index.html)
- Hero banner with tagline
- Latest Reviews section (3 cards)
- Popular Guides section (3 cards)
- Latest News section (3 cards)
- Newsletter signup section (static)
- Footer

### Page 2: Reviews (reviews.html)
- Page header with filters (Flex, Weight, Type, Price)
- Review listing (6 items minimum)
- 1 complete review blog post (detail view)
- Rating system (out of 10)
- Pros/Cons section
- Final verdict

### Page 3: Guides (guides.html)
- Page header
- Guide listing (4 items minimum)
- 1 complete guide blog post (detail view)
- Step-by-step format
- Parameter explanations

### Page 4: News (news.html)
- Page header
- News listing (4 items minimum)
- 1 complete news article (detail view)
- Date stamps
- Source attribution

## Content Requirements

### Review Content (Minimum 1 Complete)
- Shaft model: "Project X HZRDUS Black 60"
- Flex: Stiff
- Weight: 60g
- Torque: 3.0°
- Launch: Low
- Spin: Mid-Low
- Pros section (bullet points)
- Cons section (bullet points)
- Final verdict

### Guide Content (Minimum 1 Complete)
- Topic: "How to Choose Shaft Flex"
- Sections: Introduction, Understanding Flex, Factors to Consider, Recommendations, FAQ

### News Content (Minimum 1 Complete)
- Topic: "New Matrix Shafts Launch"
- Date: Recent
- Summary and full article

## Animation & Interaction
- Smooth scroll behavior
- Card hover effects (subtle lift)
- Button hover transitions (0.3s)
- Page load fade-in
- Scroll-triggered animations (optional)

## Technical Requirements
- Pure HTML/CSS/JS (no frameworks)
- No external dependencies except fonts (Google Fonts)
- Responsive images
- Semantic HTML5
- Accessible (WCAG basic)
- Fast loading (minimal code)

## File Structure
```
/workspace/shaftmaster/
├── index.html
├── reviews.html
├── reviews-detail.html
├── guides.html
├── guides-detail.html
├── news.html
├── news-detail.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    (placeholder references)
```

## Acceptance Criteria
1. All 4 pages load without errors
2. Navigation works between all pages
3. Responsive on mobile, tablet, desktop
4. Color scheme matches specification exactly
5. At least 1 complete blog post per section
6. Professional, trustworthy aesthetic
7. Fast loading (no external dependencies)
8. Consistent styling across all pages