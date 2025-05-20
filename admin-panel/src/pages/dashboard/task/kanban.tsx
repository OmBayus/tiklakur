import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TaskKanban } from 'src/sections/task/task-kanban';

// ----------------------------------------------------------------------

const metadata = { title: `Task Kanban | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TaskKanban />
    </>
  );
}
