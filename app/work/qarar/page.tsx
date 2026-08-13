import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QARAR Case Study — Sameer Awaji",
  description:
    "How Sameer Awaji worked on authentication, retry safety, and Arabic live updates for QARAR.",
};

const changes = [
  {
    title: "One session stays in control.",
    text: "When several requests failed together, they could race to refresh or restore an account that was no longer active. I made them share one refresh and tied each request to the session that created it.",
  },
  {
    title: "Retries stop when the result is uncertain.",
    text: "Safe reads can retry within a limit. OTP, AI, and other actions that may already have completed are sent once after a timeout, then reconciled where that is possible.",
  },
  {
    title: "Arabic streams survive reconnects.",
    text: "I changed the client to decode each response as one UTF-8 stream, resume from the last event, and ignore duplicates after reconnecting.",
  },
  {
    title: "The app knows which API contract it supports.",
    text: "Laravel owns the OpenAPI contract. Flutter pins it and checks supported versions so an incompatible backend change is caught before release.",
  },
];

export default function QararCaseStudy() {
  return (
    <>
      <a className="skip-link" href="#case-main">Skip to case study</a>

      <header className="site-header case-header">
        <div className="shell header-inner case-header-inner">
          <Link className="wordmark" href="/" aria-label="Sameer Awaji portfolio home">
            <span className="wordmark-mark">SA</span>
            <span>Sameer Awaji</span>
          </Link>
          <nav className="case-nav" aria-label="Case study navigation">
            <a href="#work">The work</a>
            <a href="#checks">Checks</a>
            <a href="#screens">Screens</a>
          </nav>
          <Link className="header-action" href="/">Back to portfolio</Link>
        </div>
      </header>

      <main id="case-main">
        <section className="case-hero shell">
          <Link className="back-link" href="/">← Portfolio</Link>
          <div className="case-hero-grid">
            <div>
              <p className="eyebrow">
                <span className="signal" aria-hidden="true" />
                QARAR · Work at Mrasim
              </p>
              <h1>Making authentication and live updates more reliable.</h1>
            </div>
            <div className="case-hero-side">
              <p>
                QARAR is an Arabic decision-support app with separate user and
                expert journeys. My part sits across Flutter and Laravel:
                sessions, retries, real-time updates, and API compatibility.
              </p>
              <p className="case-note">
                This is a team product. Internal names and endpoints are omitted.
              </p>
            </div>
          </div>
          <p className="case-meta">
            <span>Flutter + Laravel</span>
            <span>Backend changes deployed</span>
            <span>Updated mobile release pending</span>
          </p>
        </section>

        <section className="case-story" id="work">
          <div className="shell case-story-grid">
            <div>
              <p className="section-kicker">Why this work mattered</p>
              <h2>The difficult bugs appeared when things went wrong.</h2>
            </div>
            <div className="case-story-copy">
              <p>
                A normal sign-in was fine. The harder cases were two requests
                failing together, someone switching accounts during a refresh,
                or a connection dropping halfway through an Arabic stream.
              </p>
              <p>
                I worked on those failure paths in the mobile app and the
                supporting Laravel behavior. I did not build the whole product;
                this page is about the part I changed.
              </p>
            </div>
          </div>
        </section>

        <section className="case-work-section">
          <div className="shell">
            <div className="case-simple-heading">
              <p className="section-kicker">What I changed</p>
              <h2>The work, in plain English.</h2>
            </div>
            <div className="case-work-list">
              {changes.map((change) => (
                <article className="case-work-item" key={change.title}>
                  <h3>{change.title}</h3>
                  <p>{change.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-checks" id="checks">
          <div className="shell case-checks-grid">
            <div>
              <p className="section-kicker light-kicker">How I checked it</p>
              <h2>Full local suites, not selected examples.</h2>
              <p>
                I reran both repositories on 13 Aug 2026, including the tests
                around concurrent refresh, account changes, retries, Arabic
                decoding, reconnects, and contract compatibility.
              </p>
            </div>
            <div>
              <div className="verification-results" aria-label="Current QARAR test results">
                <div className="test-result">
                  <strong>1,070</strong>
                  <span>Flutter tests passed</span>
                  <small>13 skipped · Flutter 3.41.9</small>
                </div>
                <div className="test-result">
                  <strong>696</strong>
                  <span>Laravel tests passed</span>
                  <small>4,383 assertions</small>
                </div>
              </div>
              <p className="case-checks-note">
                This is local test evidence. It doesn’t confirm live SMS,
                email, Firebase, production streams, storage, or the pending
                mobile release.
              </p>
            </div>
          </div>
        </section>

        <section className="case-visual-section" id="screens" aria-labelledby="visual-proof-title">
          <div className="shell">
            <div className="case-simple-heading case-gallery-heading">
              <p className="section-kicker">The app</p>
              <h2 id="visual-proof-title">A few screens from the current iOS build.</h2>
              <p>Startup, sign-in, and the first decision-entry screen.</p>
            </div>

            <div className="case-gallery">
              <figure>
                <div className="case-phone-frame">
                  <Image
                    src="/projects/qarar-splash-clean.png"
                    alt="QARAR loading screen in the iOS simulator"
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Startup</strong><span>The app loading before sign-in.</span></figcaption>
              </figure>
              <figure>
                <div className="case-phone-frame">
                  <Image
                    src="/projects/qarar-login-clean.png"
                    alt="QARAR Arabic main login screen"
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Sign-in</strong><span>The Arabic entry screen and guest option.</span></figcaption>
              </figure>
              <figure>
                <div className="case-phone-frame">
                  <Image
                    src="/projects/qarar-decision-clean.png"
                    alt="QARAR first decision stage with examples and categories"
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Decision entry</strong><span>Examples and categories for getting started.</span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="case-next">
          <div className="shell case-next-grid">
            <div>
              <p className="section-kicker">More work</p>
              <h2>Two live websites.</h2>
            </div>
            <div className="case-next-links">
              <a href="https://mipksa.com" target="_blank" rel="noreferrer"><span>MIP</span><strong>Open site ↗</strong></a>
              <a href="https://maeen.com.sa" target="_blank" rel="noreferrer"><span>Maeen</span><strong>Open site ↗</strong></a>
              <Link href="/">Back to the portfolio →</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <span>© 2026 Sameer Awaji</span>
          <span>QARAR · Work at Mrasim</span>
          <a href="#case-main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
