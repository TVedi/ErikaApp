import type { CoachCredential } from "@/types/database";

export function CredentialsList({
  credentials,
  variant = "default",
}: {
  credentials: CoachCredential[];
  variant?: "default" | "compact";
}) {
  if (credentials.length === 0) {
    return <p className="text-sm text-gray-500">Credentials loading…</p>;
  }

  return (
    <ul className={variant === "compact" ? "space-y-3" : "grid gap-4 sm:grid-cols-3"}>
      {credentials.map((cred) => (
        <li
          key={cred.id}
          className={
            variant === "compact"
              ? "flex items-start gap-3"
              : "card-soft p-5"
          }
        >
          {variant === "compact" ? (
            <>
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
              <div>
                <p className="font-medium text-gray-900">
                  {cred.label}
                  {cred.year ? ` (${cred.year})` : ""}
                </p>
                {cred.detail && (
                  <p className="text-sm text-gray-600">{cred.detail}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-900">{cred.label}</p>
              {cred.year && (
                <p className="mt-1 text-sm font-semibold text-violet-600">{cred.year}</p>
              )}
              {cred.detail && (
                <p className="mt-2 text-sm text-gray-600">{cred.detail}</p>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
