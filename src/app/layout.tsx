import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, Flex } from "@radix-ui/themes";
import { Navigation } from "@/components/Navigation";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ProgressBar } from "@/components/ProgressBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata = {
  title: 'Star Wars Project',
  description: 'A project about Star Wars universe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <Theme accentColor="amber" panelBackground="solid">
            <QueryProvider>
              <ProgressProvider>
                <div>
                  <Flex direction="column" gap="6" p="4">
                    <Navigation />
                    <Breadcrumbs />
                    <ProgressBar />
                    {children}
                  </Flex>
                </div>
              </ProgressProvider>
            </QueryProvider>
          </Theme>
      </body>
    </html>
  );
}
