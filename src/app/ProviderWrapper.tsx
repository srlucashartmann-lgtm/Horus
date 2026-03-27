'use client';

import { ReactNode } from 'react';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

// next
import { SessionProvider } from 'next-auth/react';

// project-imports
import ThemeCustomization from 'themes';
import { ConfigProvider } from 'contexts/ConfigContext';
import RTLLayout from 'components/RTLLayout';
import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';

import Notistack from 'components/third-party/Notistack';
import Snackbar from 'components/@extended/Snackbar';
import MobileLandscapePrompt from 'components/MobileLandscapePrompt';
import { TVProvider } from 'components/ModoTV/TVContext';
import ModoTV from 'components/ModoTV/ModoTV';
import { OnboardingProvider } from 'components/onboarding/OnboardingProvider';
import { DEFAULT_THEME_MODE } from 'config';

// ==============================|| PROVIDER WRAPPER  ||============================== //

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <InitColorSchemeScript modeStorageKey="theme-mode" attribute="data-color-scheme" defaultMode={DEFAULT_THEME_MODE} />
      <ConfigProvider>
        <ThemeCustomization>
          <RTLLayout>
            <Locales>
              <ScrollTop>
                <SessionProvider refetchInterval={0}>
                  <TVProvider>
                    <OnboardingProvider>
                      <Notistack>
                        <Snackbar />
                        <MobileLandscapePrompt />
                        {children}
                        <ModoTV />
                      </Notistack>
                    </OnboardingProvider>
                  </TVProvider>
                </SessionProvider>
              </ScrollTop>
            </Locales>
          </RTLLayout>
        </ThemeCustomization>
      </ConfigProvider>
    </>
  );
}
