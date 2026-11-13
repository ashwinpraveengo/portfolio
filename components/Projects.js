import { useEffect, useRef } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'
import { gsap } from '@/lib/gsap'
import { useTilt } from '@/lib/hooks'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icons'
import styles from './Projects.module.css'

function ProjectCard({ project, index }) {
  const card = useRef(null)
  useTilt(card, 7)
  const host = new URL(project.link).hostname.replace('www.', '')

  return (
    <div className={styles.cardWrap} data-project-card>
      <a
        ref={card}
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`card tilt ${styles.card}`}
        style={{ '--a': project.accent }}
        data-spotlight
        data-cursor-label="VIEW"
      >
        <span className="tilt-glare" />

        <div className={styles.visual}>
          <div className={styles.visualInner} data-parallax>
            <span className={`${styles.blob} ${styles.blob1}`} />
            <span className={`${styles.blob} ${styles.blob2}`} />
            <span className={`${styles.blob} ${styles.blob3}`} />
            <span className={styles.visualGrid} />
          </div>
          <span className={styles.bigNum}>0{index + 1}</span>

          <div className={styles.window}>
            <div className={styles.windowBar}>
              <i />
              <i />
              <i />
              <span>{host}</span>
            </div>
            <div className={styles.windowBody}>
              <span className={styles.windowTitle}>{project.name}</span>
              <span className={styles.windowLine} style={{ width: '82%' }} />
              <span className={styles.windowLine} style={{ width: '64%' }} />
              <span className={styles.windowLine} style={{ width: '40%' }} />
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.meta}>
            <span className={styles.tag}>{project.tag}</span>
            <span className={styles.period}>{project.period}</span>
          </div>
          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.desc}>{project.desc}</p>
          <div className={styles.tech}>
            {project.tech.map(t => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <div className={styles.footer}>
            <span className={styles.role}>{project.role}</span>
            <span className={styles.arrow}>
              <Icon name="arrowUpRight" size={18} />
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}

export default function Projects() {
  const { projects, headings, ledes, links } = portfolioConfig
  const root = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  const counter = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    const total = projects.length

    // Desktop: pin the section and scroll the track sideways
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth
      const horizontal = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: self => {
            bar.current.style.transform = `scaleX(${self.progress})`
            const current = Math.min(total, Math.floor(self.progress * total) + 1)
            counter.current.textContent = String(current).padStart(2, '0')
          },
        },
      })

      gsap.utils.toArray('[data-project-card]', root.current).forEach(card => {
        gsap.from(card, {
          rotateY: -28,
          rotateZ: 3,
          yPercent: 8,
          opacity: 0.2,
          transformPerspective: 1400,
          transformOrigin: '0% 50%',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontal,
            start: 'left 100%',
            end: 'left 55%',
            scrub: true,
          },
        })
        gsap.fromTo(
          card.querySelector('[data-parallax]'),
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontal,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })
    })

    // Mobile / reduced motion: plain vertical stack with fade-ups
    mm.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-project-card]', root.current).forEach(card => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        })
      })
    })

    return () => mm.revert()
  }, [projects.length])

  return (
    <section id="projects" className={styles.projects} ref={root}>
      <div className={styles.track} ref={track}>
        <div className={styles.intro}>
          <SectionHeading index="04" label="Projects" title={headings.projects}>
            <p className={styles.lede} data-reveal>
              {ledes.projects}
            </p>
          </SectionHeading>
          <div className={styles.cue} aria-hidden="true">
            <span className={styles.count}>
              <span ref={counter}>01</span> / {String(projects.length).padStart(2, '0')}
            </span>
            <span className={styles.cueText}>
              Scroll <Icon name="arrowUpRight" size={14} className={styles.cueArrow} />
            </span>
          </div>
        </div>

        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}

        <div className={styles.cardWrap} data-project-card>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.outro}
            data-cursor-label="GITHUB"
          >
            <span className={styles.outroSmall}>Want more?</span>
            <span className={styles.outroBig}>
              Explore all <span className="accent-serif">repos</span>
            </span>
            <span className={styles.outroCircle}>
              <Icon name="github" size={28} />
            </span>
          </a>
        </div>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <span ref={bar} />
      </div>
    </section>
  )
}
