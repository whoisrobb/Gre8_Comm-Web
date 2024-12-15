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
              <span className="text-xl font-bold">Gre8 Chat</span>
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
              <span className="font-semibold">Gre8 Chat</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Gre8 Chat. All rights reserved.
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