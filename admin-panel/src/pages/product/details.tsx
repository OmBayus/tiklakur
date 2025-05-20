import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetProduct } from 'src/actions/product';

// ----------------------------------------------------------------------

const metadata = { title: `Product details - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { product, productLoading, productError } = useGetProduct(id);

  return (
    <Helmet>
      <title> {metadata.title}</title>
    </Helmet>
  );
}
