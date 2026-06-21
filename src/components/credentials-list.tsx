import type { CoachCredential } from "@/types/database";

export function CredentialsList({
  credentials,
  variant = "default",
}: {
  credentials: CoachCredential[];
  variant?: "default" | "compact";
}) {
  if (credentials.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Credentials loading…</p>
    );
  }

  return (
    <ul className={variant === "compact" ? "space-y-3" : "grid gap-4 sm:grid-cols-3"}>
      {credentials.map((cred) => (
        <li
          key={cred.id}
          className={
            variant === "compact"
              ? "flex items-start gap-3"
              : "rounded-xl border border-border bg-card p-5 shadow-sm"
          }
        >
          {variant === "compact" ? (
            <>
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-water" />
              <div>
                <p className="font-medium text-navy">
                  {cred.label}
                  {cred.year ? ` (${cred.year})` : ""}
                </p>
                {cred.detail && (
                  <p className="text-sm text-muted-foreground">{cred.detail}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="font-semibold text-navy">{cred.label}</p>
              {cred.year && (
                <p className="mt-1 text-sm font-medium text-water">{cred.year}</p>
              )}
              {cred.detail && (
                <p className="mt-2 text-sm text-muted-foreground">{cred.detail}</p>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
