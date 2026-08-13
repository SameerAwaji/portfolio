import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QARAR Technical Case Study — Sameer Awaji",
  description:
    "A technical case study on session safety, bounded retries, realtime SSE recovery, and Flutter-Laravel contract integrity in QARAR.",
};

const refreshPattern = `final failedIdentity = request.sessionIdentity;
final currentIdentity = session.identity;

if (failedIdentity != currentIdentity) {
  return RetryDecision.superseded;
}

final result = await refreshCoordinator.runOnce(
  bearer: request.bearer,
);

return result.rotatedFor(currentIdentity)
    ? RetryDecision.safeWithNewBearer
    : RetryDecision.endSession;`;

const realtimePattern = `await for (final text in utf8.decoder.bind(stream)) {
  for (final event in parser.addChunk(text)) {
    if (event.id <= cursor.lastEventId) continue;

    cursor = cursor.advance(
      eventId: event.id,
      timestamp: event.timestamp,
    );
    onEvent(event);
  }
}

reconnect(since: cursor.timestamp, lastId: cursor.lastEventId);`;

const decisions = [
  {
    number: "01",
    title: "Bind refresh to identity, not only a bearer token",
    text: "Concurrent requests can fail while a refresh or account switch is already in progress. Refresh is serialized, and each failed request carries the identity that created it. Work from account A is never replayed under account B.",
    tradeoff: "More session bookkeeping, in exchange for making cross-account replay impossible by construction.",
  },
  {
    number: "02",
    title: "Retry only work that is safe to repeat",
    text: "GET and idempotent update paths can use bounded recovery. OTP, AI, and other consequential mutations receive one controlled attempt so a timeout cannot silently duplicate a user action.",
    tradeoff: "Some failures return to the user instead of being hidden, which is preferable to creating duplicate effects.",
  },
  {
    number: "03",
    title: "Treat SSE as one UTF-8 stream with a cursor",
    text: "Arabic characters may be split across network chunks. The client decodes the response as one UTF-8 stream, stores the last event ID and timestamp, ignores duplicates, and reconnects from its last confirmed cursor.",
    tradeoff: "Cursor state adds complexity, but avoids full reloads on every short disconnection and detects real gaps explicitly.",
  },
  {
    number: "04",
    title: "Make the API contract a release boundary",
    text: "The Laravel dashboard owns the OpenAPI contract. The Flutter release pins its checksum so app and API changes are reviewed as one compatibility decision instead of two independent deployments.",
    tradeoff: "Releases require coordination, but mismatched client and server behavior becomes visible before shipping.",
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
            <a href="#architecture">Architecture</a>
            <a href="#decisions">Decisions</a>
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
                QARAR · Technical case study
              </p>
              <h1>
                Stabilizing a Flutter/Laravel decision platform under session
                rotation and realtime updates.
              </h1>
            </div>
            <div className="case-hero-side">
              <span className="status-chip">Private Mrasim team product</span>
              <p>
                QARAR is an Arabic-first product for people seeking clearer
                decisions and experts responding to them. I worked across its
                Flutter client and Laravel API to make identity, interrupted
                requests, draft continuity, and realtime state behave as one
                reliable journey.
              </p>
            </div>
          </div>

          <dl className="case-facts">
            <div><dt>My contribution</dt><dd>Flutter + Laravel implementation and release reliability</dd></div>
            <div><dt>Core problem</dt><dd>Identity safety across retries, switching, and reconnects</dd></div>
            <div><dt>Product surface</dt><dd>Arabic seeker and expert journeys</dd></div>
            <div><dt>Stack</dt><dd>Flutter · Riverpod · Dio · Laravel · Sanctum · SSE</dd></div>
          </dl>
        </section>

        <section className="case-visual-section" aria-labelledby="visual-proof-title">
          <div className="shell">
            <div className="case-section-heading">
              <p className="section-kicker">Simulator proof</p>
              <h2 id="visual-proof-title">The product, not a mockup.</h2>
              <p>
                Captured from the installed iOS app using non-sensitive guest
                data. The visible path stops before creating an account, sending
                an OTP, or submitting a decision.
              </p>
            </div>

            <div className="case-gallery">
              <figure>
                <div className="case-phone-frame">
                  <Image
                    src="/projects/qarar-launch.png"
                    alt="QARAR app loading its sign-in configuration"
                    width={447}
                    height={955}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Release initialization</strong><span>App startup and sign-in configuration.</span></figcaption>
              </figure>
              <figure>
                <div className="case-phone-frame">
                  <Image
                    src="/projects/qarar-guest-home.png"
                    alt="QARAR Arabic guest home with current, history, and account navigation"
                    width={447}
                    height={955}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Guest continuity</strong><span>Arabic RTL navigation with the current journey clearly owned.</span></figcaption>
              </figure>
              <figure>
                <div className="case-phone-frame">
                  <Image
                    src="/projects/qarar-privacy-gate.png"
                    alt="QARAR privacy consent gate before a decision can be started"
                    width={447}
                    height={955}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Consent before action</strong><span>A privacy gate prevents decision creation until terms are reviewed.</span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="case-section architecture-section" id="architecture">
          <div className="shell">
            <div className="case-section-heading">
              <p className="section-kicker">Architecture</p>
              <h2>One journey across two repositories.</h2>
              <p>
                The important boundary is not “mobile versus backend.” It is
                which layer owns identity, replay, continuity, and the release
                contract when the network is unreliable.
              </p>
            </div>

            <div className="architecture-map" role="img" aria-label="QARAR architecture from Flutter UI through Laravel API and realtime updates">
              <div className="architecture-node architecture-client">
                <span>01 · Client</span>
                <strong>Arabic Flutter UI</strong>
                <small>GoRouter · Riverpod · seeker and expert journeys</small>
              </div>
              <span className="architecture-arrow" aria-hidden="true">→</span>
              <div className="architecture-node">
                <span>02 · Boundary</span>
                <strong>Repositories + session</strong>
                <small>Dio · encrypted envelope · local draft cache</small>
              </div>
              <span className="architecture-arrow" aria-hidden="true">→</span>
              <div className="architecture-node architecture-server">
                <span>03 · Server</span>
                <strong>Laravel /api/v1</strong>
                <small>Sanctum · policies · services · OpenAPI contract</small>
              </div>
              <span className="architecture-arrow" aria-hidden="true">→</span>
              <div className="architecture-node">
                <span>04 · Delivery</span>
                <strong>Queues + outbox</strong>
                <small>Decision events · notifications · provider work</small>
              </div>
              <div className="realtime-return">
                <span>Cursor-based SSE returns live state to the authenticated client</span>
                <span aria-hidden="true">←</span>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section decisions-section" id="decisions">
          <div className="shell">
            <div className="case-section-heading split-heading">
              <div>
                <p className="section-kicker">Engineering decisions</p>
                <h2>Fix ownership, then recover safely.</h2>
              </div>
              <p>
                Rewriting the existing Flutter/Laravel product would have added
                risk without customer value. The work focused on the boundaries
                where the existing stack could contradict itself.
              </p>
            </div>
            <div className="decision-grid">
              {decisions.map((decision) => (
                <article className="decision-card" key={decision.number}>
                  <span>{decision.number}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.text}</p>
                  <div><strong>Trade-off</strong><p>{decision.tradeoff}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section code-section" aria-labelledby="code-title">
          <div className="shell">
            <div className="case-section-heading">
              <p className="section-kicker">Implementation patterns</p>
              <h2 id="code-title">The core rules, made explicit.</h2>
              <p>
                Sanitized pseudocode from the implemented patterns. Product and
                employer-specific details are intentionally omitted.
              </p>
            </div>
            <div className="code-grid">
              <article className="code-card">
                <div className="code-card-heading">
                  <span>Dart-like pseudocode</span>
                  <strong>Identity-safe refresh</strong>
                </div>
                <pre><code>{refreshPattern}</code></pre>
                <p>The failed request can continue only if the same identity owns the rotated session.</p>
              </article>
              <article className="code-card">
                <div className="code-card-heading">
                  <span>Dart-like pseudocode</span>
                  <strong>UTF-8 cursor recovery</strong>
                </div>
                <pre><code>{realtimePattern}</code></pre>
                <p>Chunks become one UTF-8 stream; the cursor makes reconnects resumable and duplicate-safe.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="case-section validation-section" id="validation">
          <div className="shell validation-grid">
            <div>
              <p className="section-kicker light-kicker">Validation</p>
              <h2>Tests support the path. The path remains the proof.</h2>
              <p>
                The work was checked through focused and full local regression
                suites, API contract checks, and iOS simulator journeys. For
                this case study I exercised the installed app through launch,
                guest home, account controls, and the decision privacy gate.
              </p>
            </div>
            <ul className="validation-list">
              <li><span>01</span><strong>Identity</strong><p>Refresh and account-switch behavior preserve the owner of each request.</p></li>
              <li><span>02</span><strong>Continuity</strong><p>Draft and navigation state recover without inventing duplicate work.</p></li>
              <li><span>03</span><strong>Realtime</strong><p>Arabic SSE data survives split chunks, reconnects, and duplicate events.</p></li>
              <li><span>04</span><strong>Release</strong><p>The app pins the Dashboard-owned OpenAPI contract before coordinated release.</p></li>
            </ul>
          </div>
        </section>

        <section className="case-next">
          <div className="shell case-next-grid">
            <div>
              <p className="section-kicker">Next</p>
              <h2>See the shipped web work.</h2>
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
          <span>QARAR technical case study</span>
          <a href="#case-main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
