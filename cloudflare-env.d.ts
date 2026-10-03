// Optional application binding: this portfolio currently provisions no database.
// Keep getDb()'s runtime guard; declarations do not configure a D1 instance.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
