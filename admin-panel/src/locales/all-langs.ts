// core (MUI)
import { trTR as trTRCore } from '@mui/material/locale';
// date pickers (MUI)
import { enUS as enUSDate, trTR as trTRDate } from '@mui/x-date-pickers/locales';
// data grid (MUI)
import { enUS as enUSDataGrid, trTR as trTRDataGrid } from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
  {
    value: 'tr',
    label: 'Türkçe',
    countryCode: 'TR',
    adapterLocale: 'tr',
    numberFormat: { code: 'tr-TR', currency: 'TRY' },
    systemValue: {
      components: { ...trTRCore.components, ...trTRDate.components, ...trTRDataGrid.components },
    },
  },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
