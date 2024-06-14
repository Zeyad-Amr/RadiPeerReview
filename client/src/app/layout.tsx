import ThemeProvider from "@/core/theme";
import { primaryFont } from "@/core/theme/typography";
import { SettingsProvider } from "@/core/components/settings";
import "./globals.css";
import { StoreProvider } from "@/core/state/provider";
import { ServiceLocatorProvider } from "@/core/service-locator/provider";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html className={primaryFont.className}>
      <body>
        <ServiceLocatorProvider>
          <StoreProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: "light", // 'light' | 'dark'
                themeDirection: "ltr", //  'rtl' | 'ltr'
                themeContrast: "default", // 'default' | 'bold'
                themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>{children}</ThemeProvider>
            </SettingsProvider>
          </StoreProvider>
        </ServiceLocatorProvider>
      </body>
    </html>
  );
}
