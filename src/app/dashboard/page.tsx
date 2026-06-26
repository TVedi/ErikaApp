import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canAccessDashboard } from "@/lib/auth/minor-consent";
import { formatTierLabel } from "@/lib/auth/roles";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboard, auth, nav } from "@/content/copy";
import type { Profile, Subscription } from "@/types/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/signup");
  }

  const typedProfile = profile as Profile;
  const hasAccess = canAccessDashboard(typedProfile);

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("profile_id", user.id)
    .eq("status", "mock_active")
    .maybeSingle();

  const typedSubscription = subscription as Subscription | null;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy sm:text-3xl">
                {dashboard.welcome}, {typedProfile.full_name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{auth.safetyDisclaimer}</p>
            </div>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>

          {!hasAccess ? (
            <Card className="mt-8 border-destructive/30 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">
                  {dashboard.minorConsentRequired}
                </CardTitle>
                <CardDescription>{dashboard.minorConsentBody}</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <Card className="border-border/60">
                  <CardHeader className="pb-2">
                    <CardDescription>{dashboard.currentTier}</CardDescription>
                    <CardTitle className="text-navy">
                      {typedSubscription
                        ? formatTierLabel(typedSubscription.tier)
                        : "No active plan"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typedSubscription && (
                      <Badge variant="secondary">{typedSubscription.status}</Badge>
                    )}
                  </CardContent>
                </Card>
                <Card className="border-border/60">
                  <CardHeader className="pb-2">
                    <CardDescription>{dashboard.profileStatus}</CardDescription>
                    <CardTitle className="text-navy">
                      {typedProfile.is_minor ? dashboard.minor : dashboard.adult}
                    </CardTitle>
                  </CardHeader>
                </Card>
                {typedProfile.is_minor && (
                  <Card className="border-border/60">
                    <CardHeader className="pb-2">
                      <CardDescription>Consent</CardDescription>
                      <CardTitle className="text-navy">
                        {typedProfile.parental_consent
                          ? dashboard.consentGiven
                          : dashboard.consentMissing}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                )}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  dashboard.cards.trainingPlan,
                  dashboard.cards.submitVideo,
                  dashboard.cards.latestFeedback,
                  dashboard.cards.progressTracking,
                ].map((card) => (
                  <Card key={card.title} className="border-border/60">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-navy">{card.title}</CardTitle>
                        <Badge variant="outline">{dashboard.comingSoon}</Badge>
                      </div>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
                <Card className="border-border/60 ring-1 ring-water/30">
                  <CardHeader>
                    <CardTitle className="text-base text-navy">
                      {dashboard.cards.trainingCamps.title}
                    </CardTitle>
                    <CardDescription>
                      {dashboard.cards.trainingCamps.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LinkButton size="sm" href="/camps" className="btn-cta-primary">
                      {nav.camps}
                    </LinkButton>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
