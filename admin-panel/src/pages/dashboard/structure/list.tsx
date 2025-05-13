import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { StructureTree } from 'src/sections/structure/structure-tree';

// ----------------------------------------------------------------------

const metadata = { title: `Structure list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StructureTree />
    </>
  );
}
