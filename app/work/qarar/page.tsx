import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QARAR Reliability Case Study — Sameer Awaji",
  description:
    "Authentication, retry safety, SSE recovery, and current test evidence from Sameer Awaji’s QARAR work.",
};

const changes = [
  {
    number: "01",
    problem:
      "Concurrent requests can receive 401 responses together, while a login or account change can replace the active session during refresh.",
    title: "Session refresh and account changes",
    implementation:
      "I serialized refresh, bound each request to the session that created it, and rechecked the active identity before accepting a refresh result. Session data is persisted together so a token cannot be restored with the wrong profile.",
    verification:
      "Automated tests reproduce concurrent 401s and an account change while refresh is in flight. They assert one refresh and confirm that the newer session remains active.",
  },
  {
    number: "02",
    problem:
      "A timeout does not reveal whether the server completed an OTP or AI mutation. Replaying it automatically could create a second side effect.",
    title: "Retry rules by request type",
    implementation:
      "Transient GET and PUT requests may retry within a fixed limit. Timed-out OTP, AI, and other user-triggered mutations are not automatically replayed; the client reads current state when reconciliation is safe.",
    verification:
      "Automated tests assert that a timed-out mutation is sent once, while safe GET and PUT requests retry only within the configured limit.",
  },
  {
    number: "03",
    problem:
      "A network chunk can split an Arabic UTF-8 character, and a reconnect can return an event the client has already received.",
    title: "Arabic SSE parsing and reconnects",
    implementation:
      "I decode the response as one UTF-8 stream before parsing SSE frames. Reconnects resume from the last acknowledged event and discard duplicates without treating a normal cursor advance as a gap.",
    verification:
      "Automated tests split bytes inside Arabic text, reconnect twice, and confirm that the next event is requested without reporting a false gap.",
  },
  {
    number: "04",
    problem:
      "A passing app build does not guarantee that an installed client understands a changed backend response.",
    title: "API compatibility checks",
    implementation:
      "The Laravel repository owns the OpenAPI contract. Flutter pins its checksum and verifies supported versions in tests, while backward-compatible responses remain readable.",
    verification:
      "Automated tests validate the pinned schema and reject a server contract version newer than the client supports. This complements backward-compatible API changes; it does not replace them.",
  },
];

const testAreas = [
  "Session refresh and account changes",
  "Retry limits and mutation safety",
  "Arabic stream decoding and reconnects",
  "API contract compatibility",
  "Backend token rotation",
  "SSE authorization and replay",
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
            <a href="#responsibility">My work</a>
            <a href="#changes">Changes</a>
            <a href="#validation">Validation</a>
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
                QARAR · Reliability case study
              </p>
              <h1>QARAR reliability work: authentication, retries, and SSE recovery.</h1>
            </div>
            <div className="case-hero-side">
              <span className="status-chip">Private team product · details generalized</span>
              <p>
                QARAR is an Arabic decision-support app with separate user and
                expert journeys. This page covers the reliability work I owned
                and the current local evidence behind it.
              </p>
              <p className="confidentiality-note">
                This public version omits internal identifiers, test filenames,
                endpoints, and operational timing values.
              </p>
            </div>
          </div>

          <dl className="case-facts">
            <div><dt>Status</dt><dd>Merged to main; backend deployed; updated mobile release pending</dd></div>
            <div><dt>My contribution</dt><dd>Mobile session, retry, stream, and contract work; supporting Laravel changes</dd></div>
            <div><dt>Reliability scope</dt><dd>Concurrent 401s, account changes, uncertain mutations, and split Arabic stream data</dd></div>
            <div><dt>Current verification</dt><dd>Full Flutter and Laravel suites passed locally on 13 Aug 2026</dd></div>
          </dl>
        </section>

        <section className="case-section architecture-section" id="responsibility">
          <div className="shell">
            <div className="case-section-heading">
              <p className="section-kicker">My responsibility</p>
              <h2>The parts I changed.</h2>
              <p>
                I did not build every part of QARAR. This case study is limited
                to the authentication, retry, real-time, and compatibility work
                listed here.
              </p>
            </div>

            <div className="ownership-grid">
              <article><span>Mobile</span><strong>Session handling</strong><p>I changed how refresh, account changes, and session persistence interact so an old request cannot restore a replaced session.</p></article>
              <article><span>Mobile</span><strong>Retry policy</strong><p>I separated safe retriable requests from mutations whose outcome may already have been committed.</p></article>
              <article><span>Mobile</span><strong>Real-time streams</strong><p>I corrected UTF-8 decoding and reconnect cursor handling for Arabic SSE updates.</p></article>
              <article><span>Backend</span><strong>Token rotation</strong><p>I aligned rotation and replay protection with the mobile client’s concurrency behavior.</p></article>
              <article><span>Both repositories</span><strong>API compatibility</strong><p>The backend owns the OpenAPI contract; the app pins its checksum and verifies supported versions.</p></article>
              <article><span>Not claimed here</span><strong>External delivery</strong><p>Live SMS, email, Firebase, production SSE, storage, and AI delivery were not reverified for this case study.</p></article>
            </div>
          </div>
        </section>

        <section className="case-section decisions-section" id="changes">
          <div className="shell">
            <div className="case-section-heading split-heading">
              <div>
                <p className="section-kicker">Risk → change → verification</p>
                <h2>Reliability risks I addressed.</h2>
              </div>
              <p>
                Each item connects a reproduced risk with the change I owned
                and the automated behavior that exercises it.
              </p>
            </div>
            <div className="decision-grid">
              {changes.map((change) => (
                <article className="decision-card" key={change.number}>
                  <span>{change.number}</span>
                  <h3>{change.title}</h3>
                  <div className="evidence-row"><strong>Reliability risk</strong><p>{change.problem}</p></div>
                  <div className="evidence-row"><strong>What I changed</strong><p>{change.implementation}</p></div>
                  <div className="evidence-row"><strong>Verification</strong><p>{change.verification}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section validation-section" id="validation">
          <div className="shell validation-grid">
            <div>
              <p className="section-kicker light-kicker">Validation</p>
              <h2>Current local verification.</h2>
              <p>
                On 13 Aug 2026, I reran the complete default local suites for
                the Flutter app and Laravel backend. The redacted excerpt shows
                the commands and final output; internal test names are omitted.
              </p>
              <div className="verification-results" aria-label="Current QARAR test results">
                <div className="test-result">
                  <strong>1,070</strong>
                  <span>Flutter tests passed</span>
                  <small>13 skipped · Flutter 3.41.9 · local macOS run</small>
                </div>
                <div className="test-result">
                  <strong>696</strong>
                  <span>Laravel tests passed</span>
                  <small>4,383 assertions · local MySQL test database</small>
                </div>
              </div>
              <p className="validation-boundary">
                These local suites do not prove live SMS or email delivery,
                Firebase delivery, production SSE, storage, AI behavior, or the
                pending updated mobile release.
              </p>
            </div>
            <div>
              <div className="terminal-evidence" aria-label="Redacted local terminal output">
                <div className="terminal-heading">
                  <span aria-hidden="true">● ● ●</span>
                  <strong>Redacted local test output · 13 Aug 2026</strong>
                </div>
                <pre>{`$ flutter test --no-pub --reporter compact
…
+1070 ~13: 13 skipped tests.
+1070 ~13: All other tests passed!

$ php artisan test --compact
…
Tests: 696 passed (4383 assertions)
Duration: 23.16s`}</pre>
              </div>
              <ul className="validation-list" aria-label="Verified behavior areas">
                {testAreas.map((area, index) => (
                  <li key={area}><span>{String(index + 1).padStart(2, "0")}</span><strong>{area}</strong></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="case-visual-section" aria-labelledby="visual-proof-title">
          <div className="shell">
            <div className="case-section-heading">
              <p className="section-kicker">Installed app screens</p>
              <h2 id="visual-proof-title">Three points in the current iOS flow.</h2>
              <p>
                These captures show the installed app’s startup, main sign-in,
                and first decision-entry screen. They do not demonstrate the
                reliability mechanisms above and stop before an identifier,
                OTP, or decision is submitted.
              </p>
            </div>

            <div className="case-gallery">
              <figure>
                <div className="case-phone-frame">
                  <Image
                    src="/projects/qarar-splash-clean.png"
                    alt="QARAR loading screen while current sign-in settings load"
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Startup</strong><span>The installed app loading before routing to sign-in.</span></figcaption>
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
                <figcaption><strong>Main sign-in</strong><span>The current Arabic entry screen and guest option.</span></figcaption>
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
                <figcaption><strong>Guided decision entry</strong><span>Examples and categories reduce the blank-page problem.</span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="case-next">
          <div className="shell case-next-grid">
            <div>
              <p className="section-kicker">Next</p>
              <h2>See the live web work.</h2>
            </div>
            <div className="case-next-links">
              <a href="https://mipksa.com" target="_blank" rel="noreferrer"><span>MIP</span><strong>Live agency website ↗</strong></a>
              <a href="https://maeen.com.sa" target="_blank" rel="noreferrer"><span>Maeen</span><strong>Live education website ↗</strong></a>
              <Link href="/">Back to the full portfolio →</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <span>© 2026 Sameer Awaji</span>
          <span>QARAR reliability case study</span>
          <a href="#case-main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
