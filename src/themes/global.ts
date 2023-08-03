import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import { baseBackground, baseColors, borders, error, highlightOrange, success, textColor } from './colors';
import { fontTypes } from './fonts';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

export const customTheme = createTheme({
    palette: {
        common: {
            black: '#000',
            white: baseBackground.white,
        },
        primary: {
            main: baseColors.primary,
            contrastText: baseBackground.white,
        },
        secondary: {
            main: baseColors.secondary,
            contrastText: baseColors.primary,
        },
        tertiary: {
            main: baseColors.tertiary,
            contrastText: baseBackground.white,
            light: '',
            dark: '',
        },
        quatinary: {
            main: baseColors.quantinary,
            contrastText: baseBackground.white,
            light: '',
            dark: '',
        },
        text: {
            primary: textColor,
            secondary: baseColors.grey,
        },
        background: {
            default: baseBackground.background,
            paper: baseBackground.white,
        },
        success: {
            main: success[400],
        },
        error: {
            main: error[500],
        },
        divider: borders[600],
        tertiaryButton: createColor(baseColors.tertiary),
        quatinaryButton: createColor(baseColors.quantinary),
        highlightOrange: createColor(highlightOrange),
    },
    typography: {
        fontFamily: fontTypes.baseFontFamily,
        fontFamilySecondary: fontTypes.fontFamilySecondary,
        body1: {},
        h1Bold: {
            // TODO: this is an example of using, should be replaced once we need new custom typography we'd use
            fontSize: '40px',
            fontWeight: 700,
            fontFamily: fontTypes.fontFamilySecondary,
        },
        tableTitle: {
            fontSize: '20px',
            fontWeight: 600,
            fontFamily: fontTypes.fontFamilySecondary,
        },
        drawerLink: {
            fontSize: '18px',
            fontWeight: 400,
            fontFamily: fontTypes.fontFamilySecondary,
        },
        drawerLinkActive: {
            fontSize: '18px',
            fontWeight: 600,
            fontFamily: fontTypes.fontFamilySecondary,
        },
        h1: {
            fontSize: '32px',
            fontWeight: 600,
            fontFamily: fontTypes.fontFamilySecondary,
        },
        h3: {
            fontSize: '16px',
            fontWeight: '600',
        },
        h4: {
            fontSize: '16px',
            fontWeight: '400',
        },
        modalsText: {
            fontSize: '14px',
            fontWeight: '400',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1600,
        },
    },
    spacing: 4,
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    minWidth: '445px',
                    borderRadius: 10,
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: '24px !important',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '24px !important',
                    borderTop: `1px solid ${borders[500]}`,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiTabs-indicator': {
                        height: 3,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: '#FFB23F',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    '& .MuiTablePagination-actions': {
                        color: baseColors.primary,
                        '& button .MuiSvgIcon-root': {
                            fontSize: '32px',
                        },
                        '& > .MuiButtonBase-root.Mui-disabled': {
                            color: baseColors.secondary,
                        },
                    },
                },
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& > tr:last-child': {
                        border: 0,
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: baseColors.primary,
                    },
                },
            },
        },
    },
});

declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
        tertiary: Palette['secondary'];
        quatinary?: Palette['secondary'];
        tertiaryButton?: Palette['secondary'];
        quatinaryButton: PaletteColorOptions;
        highlightOrange: PaletteColorOptions;
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
        tertiary?: Palette['secondary'];
        quatinary?: Palette['secondary'];
        tertiaryButton: PaletteColorOptions;
        quatinaryButton: PaletteColorOptions;
        highlightOrange: PaletteColorOptions;
    }

    interface TypographyVariants {
        h1Bold: React.CSSProperties;
        tableTitle?: React.CSSProperties;
        drawerLink?: React.CSSProperties;
        drawerLinkActive?: React.CSSProperties;
        modalsText?: React.CSSProperties;
        fontFamilySecondary: string;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        h1Bold?: React.CSSProperties;
        tableTitle?: React.CSSProperties;
        drawerLink?: React.CSSProperties;
        drawerLinkActive?: React.CSSProperties;
        modalsText?: React.CSSProperties;
        fontFamilySecondary: string;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        h1Bold: true;
        tableTitle: true;
        drawerLink: true;
        drawerLinkActive: true;
        modalsText: true;
        fontFamilySecondary: string;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        tertiary: true;
        quatinary: true;
    }
}
