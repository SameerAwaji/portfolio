const allowedEvents = new Set([
  "email_click",
  "github_click",
  "hero_work",
  "language_switch",
  "linkedin_click",
  "note_open",
  "project_link",
  "project_visual",
  "resume_download",
]);

const allowedLocales = new Set(["en", "ar"]);
const safeValue = /^[a-z0-9-/]{1,80}$/i;

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > 1024) return new Response(null, { status: 413 });

  const body = await request.text();
  if (body.length > 1024) return new Response(null, { status: 413 });

  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return new Response(null, { status: 400 });
  }
  const input = parsed as Record<string, unknown>;

  const event = typeof input.event === "string" ? input.event : "";
  const locale = typeof input.locale === "string" ? input.locale : "";
  const path = typeof input.path === "string" ? input.path : "";
  const project = typeof input.project === "string" ? input.project : undefined;
  const note = typeof input.note === "string" ? input.note : undefined;

  if (!allowedEvents.has(event) || !allowedLocales.has(locale) || !safeValue.test(path)) {
    return new Response(null, { status: 400 });
  }
  if (project && !safeValue.test(project)) return new Response(null, { status: 400 });
  if (note && !safeValue.test(note)) return new Response(null, { status: 400 });

  console.info(
    JSON.stringify({
      type: "portfolio_interaction",
      event,
      locale,
      path,
      ...(project ? { project } : {}),
      ...(note ? { note } : {}),
    }),
  );

  return new Response(null, {
    status: 204,
    headers: { "cache-control": "no-store" },
  });
}
