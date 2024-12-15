import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MessageSquareMore, Users2, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquareMore className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Gre8 Comm</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />

                <Link href="/workspace">
                    <Button>Get Started</Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section
      <section className="py-20 px-4 h-screen`">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Team communication,
            <br />
            <span className="text-primary">simplified.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect, collaborate, and create with your team in real-time.
            Experience seamless communication that drives productivity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/workspace">
                <Button size="lg" className="gap-2">
                    Start for free <ArrowRight className="h-4 w-4" />
                </Button>
            </Link>
          </div>
        </div>
      </section>

       Features Section 
      <section className="py-20 bg-muted/50 h-screen" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why choose TeamSync?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="Lightning Fast"
              description="Real-time messaging and file sharing with instant sync across all devices."
            />
            <FeatureCard
              icon={<Users2 className="h-10 w-10 text-primary" />}
              title="Team-First Design"
              description="Built for modern teams with powerful organization and collaboration tools."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Enterprise Security"
              description="Bank-grade encryption and advanced security features to protect your data."
            />
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      <section className="py-20 h-[90vh] grid place-items-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your team communication?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams who have already made the switch to TeamSync.
            Start your free trial today.
          </p>

          <Link href="/workspace">
            <Button size="lg" className="gap-2">
              Get started now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquareMore className="h-5 w-5 text-primary" />
              <span className="font-semibold">TeamSync</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TeamSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg bg-background border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default Header;