import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TaskList } from 'src/sections/task/task-list';

// ----------------------------------------------------------------------

const metadata = { title: `Task list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TaskList />
    </>
  );
}
