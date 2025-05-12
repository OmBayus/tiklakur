import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useGetProducts } from 'src/actions/product';

// ----------------------------------------------------------------------

const metadata = { title: `Product shop - ${CONFIG.appName}` };

export default function Page() {
  const { products, productsLoading } = useGetProducts();

  return (
    <Helmet>
      <title> {metadata.title}</title>
    </Helmet>
  );
}
