'use client';

import { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { EVENTS, type CallBackProps, type TooltipRenderProps } from 'react-joyride';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useOnboarding, TourId } from './OnboardingProvider';
import { TOUR_STEPS } from './TourSteps';

const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

/** Resolve o elemento do passo (ignora `body` / centralizado). */
function resolveStepTargetElement(target: string | HTMLElement | undefined | null): Element | null {
  if (target == null || target === 'body') return null;
  if (typeof target === 'string') {
    try {
      return document.querySelector(target);
    } catch {
      return null;
    }
  }
  return target instanceof HTMLElement ? target : null;
}

interface Props {
  tourId: TourId;
  autoStart?: boolean;
  delay?: number;
}

function SpotlightOverlay({ target, active }: { target: string; active: boolean }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setRect(null);
      return;
    }

    const update = () => {
      if (target === 'body') {
        setRect(null);
      } else {
        const el = document.querySelector(target);
        if (el) {
          setRect(el.getBoundingClientRect());
        } else {
          setRect(null);
        }
      }
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active]);

  if (!active) return null;

  if (!rect) {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 99998,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease'
        }}
      />
    );
  }

  const pad = 10;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: rect.top - pad,
        left: rect.left - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
        zIndex: 99998,
        borderRadius: '12px',
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
        pointerEvents: 'none',
        transition: 'top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease'
      }}
    />
  );
}

/** Tokens Able Pro: usa variáveis quando existirem; fallback pelo tema MUI. */
function useTourSurfaceSx() {
  const theme = useTheme();
  return useMemo(
    () => ({
      backgroundColor: `var(--surface-card, ${theme.vars?.palette?.background?.paper ?? theme.palette.background.paper})`,
      border: `1px solid var(--border-soft, ${theme.vars?.palette?.divider ?? theme.palette.divider})`,
      borderRadius: '16px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
      maxWidth: 460,
      minWidth: 380,
      width: '100%',
      overflow: 'visible'
    }),
    [theme]
  );
}

type OnboardingTooltipProps = TooltipRenderProps & {
  tourId: TourId;
  userFirstName: string;
};

function OnboardingTooltip({
  continuous,
  index,
  step,
  size,
  isLastStep,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
  tourId,
  userFirstName
}: OnboardingTooltipProps) {
  const theme = useTheme();
  const surfaceSx = useTourSurfaceSx();

  const isWelcome = tourId === 'general' && index === 0 && Boolean((step as { data?: { welcome?: boolean } }).data?.welcome);

  const textHigh = `var(--text-high, ${theme.vars?.palette?.text?.primary ?? theme.palette.text.primary})`;
  const textMid = `var(--text-mid, ${theme.vars?.palette?.text?.secondary ?? theme.palette.text.secondary})`;
  const textLow = `var(--text-low, ${theme.vars?.palette?.text?.disabled ?? theme.palette.text.disabled})`;

  if (isWelcome) {
    const welcomeTitle = userFirstName
      ? `Bem-vindo ao Hórus, ${userFirstName}!`
      : 'Bem-vindo ao Hórus!';

    return (
      <div
        {...tooltipProps}
        style={{
          ...tooltipProps.style,
          userSelect: 'none',
          zIndex: 99999,
          overflow: 'visible',
          maxWidth: 460,
          minWidth: 380,
          width: 'auto'
        }}
      >
        <Box
          sx={{
            ...surfaceSx,
            px: '32px',
            py: '28px',
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
              boxShadow: (t) => `0 0 0 1px ${alpha(t.palette.primary.main, 0.2)}`
            }}
          >
            <Typography component="span" sx={{ fontSize: 52, lineHeight: 1 }}>
              👁
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 700,
              color: textHigh,
              mb: 1.5,
              lineHeight: 1.35
            }}
          >
            {welcomeTitle}
          </Typography>

          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: 1.7,
              color: textMid,
              whiteSpace: 'normal',
              wordBreak: 'normal',
              overflowWrap: 'break-word',
              mb: 3
            }}
          >
            {step.content}
          </Typography>

          <Stack spacing={1.5} alignItems="center">
            <Button
              {...(primaryProps as object)}
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', fontWeight: 600, px: 4, py: 1.25, borderRadius: '8px', minWidth: 200 }}
            >
              Começar Tour
            </Button>
            <Link
              component="button"
              type="button"
              variant="body2"
              underline="hover"
              {...(skipProps as object)}
              sx={{
                cursor: 'pointer',
                fontSize: 12,
                color: textLow,
                fontWeight: 400,
                textTransform: 'none',
                border: 'none',
                background: 'none',
                fontFamily: 'inherit'
              }}
            >
              Já conheço o sistema — Pular
            </Link>
          </Stack>
        </Box>
      </div>
    );
  }

  return (
    <div
      {...tooltipProps}
      style={{
        ...tooltipProps.style,
        userSelect: 'none',
        zIndex: 99999,
        overflow: 'visible',
        maxWidth: 460,
        minWidth: 380,
        width: 'auto'
      }}
    >
      <Box sx={{ ...surfaceSx, px: '32px', py: '28px' }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexWrap: 'wrap', mb: 2, gap: 1 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: '17px',
              fontWeight: 700,
              color: textHigh,
              flex: '1 1 auto',
              minWidth: 0,
              whiteSpace: 'normal',
              wordBreak: 'normal'
            }}
          >
            {step.title || 'Tour'}
          </Typography>
          <Chip
            label={`Passo ${index + 1} de ${size}`}
            size="small"
            color="primary"
            variant="light"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 600,
              flexShrink: 0,
              '& .MuiChip-label': { px: 1.25 }
            }}
          />
        </Stack>

        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: textMid,
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
            mb: 2.5
          }}
        >
          {step.content}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ flexWrap: 'wrap', gap: 1.5, pt: 0.5 }}>
          <Link
            component="button"
            type="button"
            variant="body2"
            underline="hover"
            {...(skipProps as object)}
            sx={{
              cursor: 'pointer',
              fontSize: 12,
              color: textLow,
              fontWeight: 400,
              textTransform: 'none',
              border: 'none',
              background: 'none',
              fontFamily: 'inherit'
            }}
          >
            Pular Tour
          </Link>

          <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
            {index > 0 && (
              <Button
                {...(backProps as object)}
                variant="text"
                color="secondary"
                sx={{ textTransform: 'none', fontSize: 14, fontWeight: 500 }}
              >
                Anterior
              </Button>
            )}
            {continuous && (
              <Button
                {...(primaryProps as object)}
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none', fontSize: 14, fontWeight: 600, px: 2.5, py: 1, borderRadius: '8px' }}
              >
                {isLastStep ? 'Finalizar' : 'Próximo'}
              </Button>
            )}
            {!continuous && (
              <Button
                {...(closeProps as object)}
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none', fontSize: 14, px: 2.5, py: 1, borderRadius: '8px' }}
              >
                Fechar
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

function createTourTooltip(tourId: TourId, userFirstName: string) {
  return function TourTooltipBound(props: TooltipRenderProps) {
    return <OnboardingTooltip {...props} tourId={tourId} userFirstName={userFirstName} />;
  };
}

export default function ModuleTour({ tourId, autoStart = true, delay = 800 }: Props) {
  const theme = useTheme();
  const { data: session } = useSession();
  const { isTourCompleted, completeTour, activeTour, startTour, isRunning } = useOnboarding();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const userFirstName = useMemo(() => {
    const n = session?.user?.name?.trim();
    if (!n) return '';
    return n.split(/\s+/)[0] ?? n;
  }, [session?.user?.name]);

  const TooltipComponent = useMemo(() => createTourTooltip(tourId, userFirstName), [tourId, userFirstName]);

  const steps = TOUR_STEPS[tourId] || [];

  const paperBg = theme.vars?.palette?.background?.paper ?? theme.palette.background.paper;

  useEffect(() => {
    if (!autoStart || isTourCompleted(tourId) || steps.length === 0) return;

    const timer = setTimeout(() => {
      startTour(tourId);
    }, delay);

    return () => clearTimeout(timer);
  }, [tourId, autoStart, delay, isTourCompleted, startTour, steps.length]);

  const handleCallback = useCallback(
    (data: CallBackProps) => {
      const { status, index, type, step } = data;

      // Índice do passo atual (evita `step:after`, que no Joyride costuma referir-se ao passo anterior).
      if (type === EVENTS.STEP_BEFORE || type === EVENTS.TOOLTIP || type === EVENTS.TOUR_START) {
        setCurrentStepIndex(index);
      }

      // Antes do passo: centraliza o alvo de forma imediata para medição correta do Popper/Floater.
      if (type === EVENTS.STEP_BEFORE) {
        const el = resolveStepTargetElement(step?.target as string | HTMLElement | undefined);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
        }
      }

      // Quando o tooltip do passo atual aparece: scroll suave com delay (alinha com o fim do scroll interno do Joyride).
      if (type === EVENTS.TOOLTIP) {
        const el = resolveStepTargetElement(step?.target as string | HTMLElement | undefined);
        if (el) {
          window.setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          }, 300);
        }
      }

      const finishedStatuses: string[] = ['finished', 'skipped'];
      if (finishedStatuses.includes(status as string)) {
        completeTour(tourId);
        setCurrentStepIndex(0);
      }
    },
    [tourId, completeTour]
  );

  if (activeTour !== tourId || !isRunning || steps.length === 0) return null;

  const currentTarget = steps[currentStepIndex]?.target || 'body';

  return (
    <>
      <SpotlightOverlay target={currentTarget as string} active={true} />
      <Joyride
        steps={steps as any}
        run={true}
        continuous={true}
        showSkipButton={true}
        disableScrolling={false}
        scrollToFirstStep={true}
        scrollOffset={100}
        scrollDuration={400}
        spotlightClicks={true}
        spotlightPadding={10}
        disableOverlay={true}
        disableOverlayClose={false}
        disableScrollParentFix={false}
        tooltipComponent={TooltipComponent as any}
        callback={handleCallback}
        locale={{
          back: 'Anterior',
          close: 'Fechar',
          last: 'Finalizar',
          next: 'Próximo',
          open: 'Abrir',
          skip: 'Pular Tour'
        }}
        styles={{
          options: {
            zIndex: 99999,
            primaryColor: theme.palette.primary.main,
            arrowColor: paperBg,
            backgroundColor: paperBg,
            textColor: theme.palette.text.primary
          }
        }}
        floaterProps={{
          disableAnimation: true,
          styles: {
            arrow: {
              color: paperBg,
              length: 12,
              spread: 12
            }
          }
        }}
      />
    </>
  );
}
