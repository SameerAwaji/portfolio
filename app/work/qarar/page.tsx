import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QARAR Technical Case Study — Sameer Awaji",
  description:
    "How Sameer Awaji changed and tested session refresh, retry behavior, Arabic SSE handling, and API compatibility in QARAR.",
};

const changes = [
  {
    number: "01",
    problem: "Two requests could receive 401 responses at the same time, while login or account switching could replace the active session during refresh.",
    title: "Session refresh and account switching",
    implementation: "I added a single in-flight refresh in ApiClient, tagged each request with its bearer and profile UID, and rechecked the bearer and UID after the refresh response. TokenStorage now writes the token and matching profile together and leaves a logout tombstone.",
    verification: "api_client_auth_test.dart checks one refresh for concurrent 401s and proves an old refresh cannot overwrite a newer account. token_storage_test.dart covers atomic restore, cross-user rejection, and logout resurrection.",
  },
  {
    number: "02",
    problem: "A timeout does not reveal whether the server completed an OTP or AI request. Replaying it automatically could create a second side effect.",
    title: "Retry behavior by request type",
    implementation: "I separated retry helpers: transient GET and PUT work can make bounded retries, while OTP, AI, and other user-triggered mutations make one original request only. After an uncertain AI result, the client can reconcile with a GET instead of repeating the POST.",
    verification: "api_retry_test.dart checks that timed-out auth work is not replayed and that idempotent work retries transient failures. api_connectivity_and_retry_test.dart checks the wall-clock timeout and Arabic error path.",
  },
  {
    number: "03",
    problem: "A network chunk can split an Arabic UTF-8 character, and a reconnect can return an event the client already received.",
    title: "Arabic SSE parsing and reconnects",
    implementation: "I decode the response as one UTF-8 stream before parsing SSE frames. The client sends last_id and since on reconnect. QARAR's backend contract defines event IDs as increasing database integers, so numeric duplicate checks are intentional.",
    verification: "api_client_sse_test.dart splits the bytes inside the Arabic word قرار. sse_subscription_service_test.dart reconnects twice, receives event IDs 1 then 2, and verifies that last_id=1 is sent without reporting a gap.",
  },
  {
    number: "04",
    problem: "A passing app build does not guarantee that an installed client understands a changed backend response.",
    title: "API compatibility checks",
    implementation: "I documented the Laravel dashboard as the contract owner, pinned its OpenAPI artifact in Flutter, and added a supported contract-version range. Older servers without the field remain readable; newer unsupported versions show an upgrade-required state.",
    verification: "openapi_contract_test.dart validates the pinned document and fixtures. contract_compatibility_test.dart covers missing, supported, and too-new server versions. This complements backward-compatible API changes; it does not replace them.",
  },
];

const testedFiles = [
  "api_client_auth_test.dart",
  "token_storage_test.dart",
  "api_retry_test.dart",
  "api_connectivity_and_retry_test.dart",
  "api_client_sse_test.dart",
  "sse_subscription_service_test.dart",
  "contract_compatibility_test.dart",
  "openapi_contract_test.dart",
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
                QARAR · Technical case study
              </p>
              <h1>
                How I addressed session and realtime reliability problems in
                QARAR.
              </h1>
            </div>
            <div className="case-hero-side">
              <span className="status-chip">Private Mrasim team product</span>
              <p>
                QARAR is an Arabic-first product for people seeking clearer
                decisions and experts responding to them. This page covers the
                client and API modules I changed, the failure cases behind the
                work, and the local tests I ran.
              </p>
            </div>
          </div>

          <dl className="case-facts">
            <div><dt>My contribution</dt><dd>Flutter session, retry, SSE, and contract work; Laravel token rotation and contract support</dd></div>
            <div><dt>Failure cases</dt><dd>Concurrent 401s, account switches during refresh, uncertain mutations, and split Arabic stream data</dd></div>
            <div><dt>Product surface</dt><dd>Arabic seeker and expert journeys</dd></div>
            <div><dt>Current verification</dt><dd>28 focused Flutter tests passed locally on 13 Aug 2026</dd></div>
          </dl>
        </section>

        <section className="case-visual-section" aria-labelledby="visual-proof-title">
          <div className="shell">
            <div className="case-section-heading">
              <p className="section-kicker">Simulator proof</p>
              <h2 id="visual-proof-title">Screens from the installed iOS simulator build.</h2>
              <p>
                These captures prove the visible first-run and guest flow, not
                the reliability mechanisms described below. They were captured
                from the installed app and stop before an identifier, OTP, or
                decision is submitted.
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
                    src="/projects/qarar-home-clean.png"
                    alt="QARAR Arabic guest home screen"
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Guest home</strong><span>A clear starting point for a new decision.</span></figcaption>
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
              <figure>
                <div className="case-phone-frame">
                  <Image
                    src="/projects/qarar-account-clean.png"
                    alt="QARAR guest account privacy and settings controls"
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                  />
                </div>
                <figcaption><strong>Account controls</strong><span>The guest account and privacy screen.</span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="case-section architecture-section" id="responsibility">
          <div className="shell">
            <div className="case-section-heading">
              <p className="section-kicker">My responsibility</p>
              <h2>The modules I changed.</h2>
              <p>
                I did not build every part of QARAR. This case study is limited
                to the authentication, retry, realtime, and compatibility work
                listed here.
              </p>
            </div>

            <div className="ownership-grid">
              <article><span>Flutter</span><strong>ApiClient</strong><p>401 handling, single-flight refresh, request bearer and UID checks.</p></article>
              <article><span>Flutter</span><strong>TokenStorage</strong><p>Token and profile stored together, plus a durable logout tombstone.</p></article>
              <article><span>Flutter</span><strong>ApiRetry + SSE services</strong><p>Retry rules, UTF-8 stream decoding, parser recovery, and reconnect cursors.</p></article>
              <article><span>Laravel</span><strong>AccessTokenRotationService</strong><p>Row-locked token rotation, a 120-second replay receipt, and token-family revocation.</p></article>
              <article><span>Both repositories</span><strong>API contract</strong><p>Dashboard-owned OpenAPI artifact, Flutter checksum pin, compatibility range, and fixtures.</p></article>
              <article><span>Not claimed here</span><strong>External delivery</strong><p>Live SMS/email, Firebase delivery, production hosting, and live AI were not reverified for this case study.</p></article>
            </div>
          </div>
        </section>

        <section className="case-section decisions-section" id="changes">
          <div className="shell">
            <div className="case-section-heading split-heading">
              <div>
                <p className="section-kicker">Failure → change → test</p>
                <h2>What failed and what I changed.</h2>
              </div>
              <p>
                Each item names an observed risk, the implementation I owned,
                and the test file that exercises it.
              </p>
            </div>
            <div className="decision-grid">
              {changes.map((change) => (
                <article className="decision-card" key={change.number}>
                  <span>{change.number}</span>
                  <h3>{change.title}</h3>
                  <div className="evidence-row"><strong>Observed risk</strong><p>{change.problem}</p></div>
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
                On 13 Aug 2026, I ran these eight Flutter test files with Flutter
                3.41.9: 28 tests passed. I also exercised the installed iOS app
                through startup, sign-in, guest home, account controls, and the
                first decision screen without submitting user data.
              </p>
              <p className="validation-boundary">
                The Laravel feature-test files cover token rotation, SSE replay,
                and the contract gate, but I could not rerun them for this update
                because the required local MySQL test service was unavailable.
                I do not present those backend tests as current passing evidence.
              </p>
            </div>
            <div>
              <div className="test-result" aria-label="Focused Flutter test result">
                <strong>28 / 28</strong>
                <span>focused Flutter tests passed</span>
                <small>13 Aug 2026 · Flutter 3.41.9 · local macOS run</small>
              </div>
              <ul className="validation-list">
                {testedFiles.map((file, index) => (
                  <li key={file}><span>{String(index + 1).padStart(2, "0")}</span><strong>{file}</strong></li>
                ))}
              </ul>
            </div>
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
