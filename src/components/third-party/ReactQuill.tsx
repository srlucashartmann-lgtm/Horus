'use client';

// next
import dynamic from 'next/dynamic';

// material-ui
import Box, { BoxProps } from '@mui/material/Box';

// third-party
import 'react-quill-new/dist/quill.snow.css';

// project-imports
import { ThemeDirection } from 'config';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Props {
  value?: string;
  borderRadius?: number;
  editorMinHeight?: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  sx?: BoxProps['sx'];
}

// ==============================|| QUILL EDITOR ||============================== //

export default function ReactQuillDemo({ value, editorMinHeight = 135, onChange, placeholder, borderRadius, sx = {} }: Props) {
  const editorRadius = borderRadius || 8;

  return (
    <Box
      sx={[
        (theme) => ({
          borderRadius: editorRadius,
          '& .quill': {
            '& .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label': {
              color: 'secondary.dark',
              'svg .ql-stroke': { stroke: theme.vars.palette.secondary.dark }
            },

            '& .ql-toolbar': {
              bgcolor: 'secondary.lighter',
              borderColor: 'secondary.300',
              borderTopLeftRadius: editorRadius,
              borderTopRightRadius: editorRadius,
              '& .ql-picker-options': { backgroundColor: 'background.paper' },

              ...theme.applyStyles('dark', {
                bgcolor: 'secondary.400',
                borderColor: 'secondary.400',
                '& .ql-formats': {
                  '& .ql-picker': { color: 'background.paper' },
                  'button:not(:hover):not(.ql-active)': {
                    '& .ql-stroke': { stroke: theme.vars.palette.background.paper },
                    '& .ql-fill': { fill: theme.vars.palette.background.paper }
                  },
                  '& .ql-picker-label:not(:hover):not(.ql-active)': {
                    color: theme.vars.palette.background.paper,
                    'svg .ql-stroke': { stroke: theme.vars.palette.background.paper }
                  }
                }

                // '& .ql-formats': {
                //   '& .ql-stroke, .ql-picker': { stroke: theme.vars.palette.background.paper },
                //   '& .ql-fill': { fill: theme.vars.palette.background.paper },

                //   'button:hover, button.ql-active': {
                //     '& .ql-stroke': { stroke: theme.vars.palette.primary.lighter },
                //     '& .ql-fill': { fill: theme.vars.palette.primary.lighter }
                //   },
                //   '& .ql-picker-label:hover, & .ql-picker-label.ql-active': {
                //     color: 'primary.lighter',
                //     'svg .ql-stroke': {
                //       stroke: theme.vars.palette.primary.lighter
                //     }
                //   }
                // }
              })
            },
            '& .ql-container': {
              borderColor: 'secondary.300',
              borderBottomLeftRadius: editorRadius,
              borderBottomRightRadius: editorRadius,
              ...theme.applyStyles('dark', { borderColor: 'secondary.200' }),
              '& .ql-editor': {
                minHeight: editorMinHeight,
                '&.ql-blank::before': { color: 'secondary.300', ...theme.applyStyles('dark', { color: 'secondary.400' }) }
              }
            },
            ...(theme.direction === ThemeDirection.RTL && {
              '& .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg': {
                right: '0%',
                left: 'inherit'
              }
            }),

            ...theme.applyStyles('dark', {
              '& .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label': {
                borderColor: 'secondary.200',
                color: 'background.paper',
                'svg .ql-stroke': { stroke: theme.vars.palette.background.paper }
              },
              '& .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options': {
                borderColor: 'secondary.200',
                color: 'secondary.500'
                // '.ql-picker-item:hover': {
                //   color: theme.vars.palette.primary.lighter
                // }
              }
            })
          }
        }),
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      <ReactQuill {...(value && { value })} {...(onChange && { onChange })} placeholder={placeholder} />
    </Box>
  );
}
