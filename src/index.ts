import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

const navItems = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'CV', href: '/cv' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function layout(title: string, active: string, content: ReturnType<typeof html>) {
  return html`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#10110f" />
      <meta name="description" content="Software engineering portfolio: projects, technical writing, and experience." />
      <title>${title} · Nicholas's Portfolio</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/style.css" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </head>
    <body>
      <div class="site-shell">
        <header class="site-header">
          <a class="brand" href="/" aria-label="Go to homepage"><span class="brand-mark">💻</span><span>nicholaswebster<span class="brand-muted">.dev</span></span></a>
          <nav class="main-nav" aria-label="Main navigation">
            ${navItems.map((item) => html`<a class="${active === item.href ? 'active' : ''}" href="${item.href}">${item.label}</a>`)}
          </nav>
          <a class="header-status" href="/contact"><span class="status-dot"></span> Available for opportunities</a>
        </header>
        <main>${content}</main>
        <footer class="site-footer">
          <span>© ${new Date().getFullYear()} Nicholas Webster · Built with Hono</span>
          <div class="footer-links"><a href="/projects">Projects</a><a href="/blog">Blog</a><a href="/contact">Get in touch ↗</a></div>
        </footer>
      </div>
    </body>
  </html>`
}

const projects = [
  {
    number: '01',
    name: 'TaskMan CLI',
    type: 'Developer tooling',
    description: 'A lightweight command-line task manager built to make everyday task tracking quick and accessible.',
    tags: ['Node.js', 'CLI'],
    status: 'Experiment',
    href: '#',
  },
  {
    number: '02',
    name: 'TIVA-Board Clock',
    types: 'Embedded System',
    description: 'Simple Interrupt Driven Clock that displays an accurate time in LPM',
    tags: ['C', 'Embedded'],
    status: 'Uni Assesment',
    href: 'https://github.com/TotallyNick/2303ENG-Embedded-Systems'

  }
]

const blogPosts = [
  { date: 'Coming soon', category: 'Engineering notes', title: 'Building in public: a practical engineering log', excerpt: 'A lightweight approach to documenting decisions, experiments, and the lessons that stick.', read: '4 min read' },
  { date: 'Draft', category: 'Backend', title: 'Why I’m exploring Hono for small services', excerpt: 'Looking at Web Standards APIs, middleware, and keeping a small backend easy to understand.', read: '6 min read' },
  { date: 'Draft', category: 'Embedded systems', title: 'What register-level programming teaches you', excerpt: 'Getting closer to the hardware and understanding what abstractions are doing for you.', read: '7 min read' },
]

function projectCard(project: typeof projects[number]) {
  return html`<article class="project-card">
    <div class="card-topline"><span class="eyebrow">${project.number} / ${project.type}</span><span class="project-status">${project.status}</span></div>
    <h2>${project.name}</h2>
    <p>${project.description}</p>
    <div class="tag-row">${project.tags.map((tag) => html`<span class="tag">${tag}</span>`)}</div>
    <a class="text-link" href="${project.href}">View project <span aria-hidden="true">↗</span></a>
  </article>`
}

app.get('/', (c) => c.html(layout('Home', '/', html`
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow"><span class="eyebrow-line"></span> SOFTWARE ENGINEERING · PORTFOLIO</p>
      <h1>Building things.<br /><span class="accent-text">Understanding how they work.</span></h1>
      <p class="hero-description">I'm a software engineering student interested in the space between software, systems, and the real world. This is where I share what I'm building, learning, and figuring out.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="/projects">Explore projects <span>↗</span></a>
        <a class="button button-secondary" href="/cv">View my CV</a>
      </div>
      <div class="hero-meta"><span><span class="status-dot"></span> Always learning</span><span>Based in Australia</span></div>
    </div>
    <aside class="hero-panel" aria-label="Portfolio focus areas">
      <div class="panel-header"><span class="panel-dot"></span><span>current_focus.md</span><span class="panel-menu">•••</span></div>
      <div class="code-lines">
        <p><span class="line-number">01</span><span class="code-muted">const</span> focus = [</p>
        <p><span class="line-number">02</span><span class="code-green">"software engineering"</span>,</p>
        <p><span class="line-number">03</span><span class="code-green">"embedded systems"</span>,</p>
        <p><span class="line-number">04</span><span class="code-green">"developer tooling"</span>,</p>
        <p><span class="line-number">06</span>]</p>
      </div>
      <div class="panel-bottom"><span class="mini-pulse"></span> Iterating, one project at a time</div>
    </aside>
  </section>

  <section class="section-block">
    <div class="section-heading"><div><p class="eyebrow">A LITTLE OF EVERYTHING</p><h2>What I'm working on</h2></div><a class="text-link" href="/projects">All projects ↗</a></div>
    <div class="project-grid">${projects.slice(0, 2).map(projectCard)}</div>
  </section>

  <section class="wide-cta">
    <div><p class="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Good work starts with a conversation.</h2></div>
    <a class="button button-primary" href="/contact">Get in touch <span>↗</span></a>
  </section>
`)))

app.get('/projects', (c) => c.html(layout('Projects', '/projects', html`
  <section class="page-intro">
    <p class="eyebrow"><span class="eyebrow-line"></span> SELECTED WORK</p>
    <h1>Projects<span class="accent-text">.</span></h1>
    <p>A collection of things I've built, prototypes I'm exploring, and technical challenges I've learned from. This list will grow as I ship more work.</p>
  </section>
  <section class="project-grid project-grid-page">${projects.map(projectCard)}</section>
  <section class="note-box"><span class="note-icon">↳</span><p><strong>More in progress.</strong> I'm continually experimenting with software, embedded systems, and tools that solve real problems. Check back for updates.</p></section>
`)))

app.get('/blog', (c) => c.html(layout('Blog', '/blog', html`
  <section class="page-intro">
    <p class="eyebrow"><span class="eyebrow-line"></span> NOTES FROM THE WORKBENCH</p>
    <h1>Blog<span class="accent-text">.</span></h1>
    <p>Technical notes, project post-mortems, and ideas I'm working through. The goal is to share the process, not just the polished result.</p>
  </section>
  <section class="post-list">
    ${blogPosts.map((post, i) => html`<article class="post-row">
      <div class="post-index">${String(i + 1).padStart(2, '0')}</div>
      <div class="post-content"><div class="post-meta"><span>${post.category}</span><span>·</span><span>${post.date}</span></div><h2>${post.title}</h2><p>${post.excerpt}</p><span class="post-read">${post.read}</span></div>
      <span class="post-arrow" aria-hidden="true">↗</span>
    </article>`)}
  </section>
  <p class="small-note">These are placeholder entries. Replace them with published articles when you're ready.</p>
`)))

app.get('/cv', (c) => c.html(layout('CV', '/cv', html`
  <section class="page-intro cv-intro">
    <p class="eyebrow"><span class="eyebrow-line"></span> THE SHORT VERSION</p>
    <h1>Curriculum Vitae<span class="accent-text">.</span></h1>
    <p>A snapshot of my education, technical interests, and the skills I'm developing as an engineer.</p>
  </section>
  <div class="cv-layout">
    <div class="cv-main">
      <section class="cv-section"><p class="eyebrow">01 / PROFILE</p><h2>Software engineering with a systems mindset.</h2><p>I'm studying Software Engineering (Honours) at Griffith University, with interests spanning application development, embedded systems, and understanding software from the low-level up. I enjoy learning by building practical projects and investigating how systems behave.</p></section>
      <section class="cv-section"><p class="eyebrow">02 / EDUCATION</p><div class="timeline-item"><span class="timeline-date">In progress</span><div><h3>Bachelor of Engineering (Honours) — Software Engineering</h3><p class="muted">Griffith University · Queensland, Australia</p><p>Relevant interests: software development, algorithms, embedded systems, and engineering design.</p></div></div></section>
      <section class="cv-section"><p class="eyebrow">03 / SELECTED PROJECTS</p>${projects.map(p => html`<div class="cv-project"><div><h3>${p.name}</h3><p>${p.description}</p></div><span class="project-status">${p.type}</span></div>`)}</section>
    </div>
    <aside class="cv-sidebar">
      <div class="sidebar-card"><p class="eyebrow">TECHNICAL TOOLKIT</p><h3>Languages</h3><div class="tag-row"><span class="tag">TypeScript</span><span class="tag">JavaScript</span><span class="tag">C</span><span class="tag">C++</span></div><h3>Tools & Framworks</h3><div class="tag-row"><span class="tag">Git</span><span class="tag">Hono</span></div>
      <div class="sidebar-card"><p class="eyebrow">NEXT STEP</p><h3>Let's connect.</h3><p>Interested in graduate roles, placements, and collaborative projects.</p><a class="text-link" href="/contact">Contact me ↗</a></div>
    </aside>
  </div>
  <div class="note-box"><span class="note-icon">i</span><p><strong><a href="/CV.pdf" download="CV.pdf">CV download</a></strong></p></div>
`)))

app.get('/about', (c) => c.html(layout('About', '/about', html`
  <section class="page-intro">
    <p class="eyebrow"><span class="eyebrow-line"></span> A BIT ABOUT ME</p>
    <h1>Curious by default<span class="accent-text">.</span></h1>
    <p>I'm interested in how things work, why they're designed the way they are, and what happens when you start pulling them apart.</p>
  </section>
  <section class="about-grid">
    <article class="about-card about-card-large"><p class="eyebrow">THE ENGINEER</p><h2>Learn by building.</h2><p>My approach is hands-on: take an idea, break it into smaller problems, build a working version, and improve it with each iteration. I like projects that make me think about both the code and the system around it.</p></article>
    <article class="about-card"><p class="eyebrow">INTERESTS</p><h2>Current rabbit holes</h2><ul class="clean-list"><li>Backend development & APIs</li><li>Embedded systems & electronics</li><li>Linux and developer tooling</li><li>Game development experiments</li></ul></article>
    <article class="about-card"><p class="eyebrow">OUTSIDE THE CODE</p><h2>Always exploring.</h2><p>I'm using this site as a home for projects, notes, and useful things I learn along the way. Expect it to evolve as my interests and experience grow.</p></article>
  </section>
  <section class="wide-cta"><div><p class="eyebrow">OPEN TO A GOOD CHALLENGE</p><h2>Have a project or idea to discuss?</h2></div><a class="button button-primary" href="/contact">Say hello <span>↗</span></a></section>
`)))

app.get('/contact', (c) => c.html(layout('Contact', '/contact', html`
  <section class="contact-wrap">
    <div class="contact-copy">
      <p class="eyebrow"><span class="eyebrow-line"></span> CONTACT</p>
      <h1>Let's make<br /><span class="accent-text">something useful.</span></h1>
      <p>Have a role, project, question, or interesting problem in mind? I'm happy to hear from you.</p>
      <a class="button button-primary" href="mailto:nick.m.webster@gmail.com">Email me <span>↗</span></a>
      <p class="small-note"><code>nick.m.webster@gmail.com</code></p>
    </div>
    <div class="contact-details">
      <div class="contact-detail"><span class="eyebrow">EMAIL</span><a href="mailto:nick.m.webster@gmail.com">nick.m.webster@gmail.com ↗</a></div>
      <div class="contact-detail"><span class="eyebrow">GITHUB</span><a href="https://github.com/totallynick" target="_blank" rel="noreferrer">github.com/totallynick ↗</a></div>
      <div class="contact-detail"><span class="eyebrow">LOCATION</span><span>Brisbane, Australia</span></div>
    </div>
  </section>
`)))

app.notFound((c) => c.html(layout('Page not found', '', html`
  <section class="page-intro error-page"><p class="eyebrow">404 / NOT FOUND</p><h1>Wrong turn<span class="accent-text">.</span></h1><p>That page doesn't exist, or it may have moved.</p><a class="button button-primary" href="/">Back home ↗</a></section>
`), 404))

export default app
