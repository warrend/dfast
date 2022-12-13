import { type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { FastList, links as fastListLinks } from '~/components/fast-list';
import { getProjects, type Project as TProject } from '~/server/db.server';
import styles from '~/styles/dashboard.css';

export const links = () => [
  ...fastListLinks(),
  { rel: 'stylesheet', href: styles },
];

// export const loader: LoaderFunction = async ({ request }) => {
//   return getProjects(request);
// };

export default function Dashboard() {
  // const data = useLoaderData<TProject[]>();

  return (
    <div>
      <h2>Fasts</h2>
      <div className="dashboard__fast-list">
        <FastList />
      </div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque
      viverra justo nec ultrices. Feugiat nisl pretium fusce id velit ut tortor
      pretium viverra. Eu consequat ac felis donec et odio pellentesque.
      Pellentesque adipiscing commodo elit at imperdiet dui. Sit amet justo
      donec enim diam vulputate ut pharetra sit. Ut sem viverra aliquet eget sit
      amet. Ultricies integer quis auctor elit. Est ante in nibh mauris cursus
      mattis. Commodo quis imperdiet massa tincidunt nunc pulvinar. Semper
      feugiat nibh sed pulvinar proin gravida. Lacus sed viverra tellus in hac
      habitasse platea dictumst. Dui id ornare arcu odio ut sem nulla pharetra
      diam. Aliquam etiam erat velit scelerisque. Amet risus nullam eget felis
      eget. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus
      viverra. Dignissim diam quis enim lobortis scelerisque fermentum dui
      faucibus in. Eu turpis egestas pretium aenean pharetra magna ac placerat
      vestibulum. Varius sit amet mattis vulputate. Mauris nunc congue nisi
      vitae suscipit tellus mauris a diam. Eget nunc lobortis mattis aliquam
      faucibus purus. Aenean sed adipiscing diam donec adipiscing tristique
      risus nec feugiat. In iaculis nunc sed augue. Faucibus interdum posuere
      lorem ipsum dolor sit. Eget gravida cum sociis natoque penatibus et
      magnis. Neque gravida in fermentum et sollicitudin ac orci phasellus.
      Sodales ut eu sem integer vitae justo eget. Semper auctor neque vitae
      tempus quam. At in tellus integer feugiat. Posuere lorem ipsum dolor sit
      amet. Velit egestas dui id ornare arcu odio ut. Enim nunc faucibus a
      pellentesque. Gravida arcu ac tortor dignissim convallis aenean et tortor.
      Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis.
      Habitasse platea dictumst vestibulum rhoncus est. At urna condimentum
      mattis pellentesque id. Elit eget gravida cum sociis natoque penatibus et
      magnis. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum.
      Nec ultrices dui sapien eget mi proin. Gravida arcu ac tortor dignissim
      convallis aenean et tortor at. Odio euismod lacinia at quis risus sed
      vulputate. Donec massa sapien faucibus et molestie ac feugiat. Nisl purus
      in mollis nunc sed id. Non pulvinar neque laoreet suspendisse interdum
      consectetur libero id. Orci porta non pulvinar neque. Porttitor leo a diam
      sollicitudin tempor id. Arcu ac tortor dignissim convallis aenean et.
      Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper
      dignissim. Mus mauris vitae ultricies leo integer malesuada nunc vel. Enim
      praesent elementum facilisis leo vel fringilla. Accumsan tortor posuere ac
      ut consequat semper. Purus sit amet volutpat consequat mauris nunc. Diam
      in arcu cursus euismod quis viverra nibh cras pulvinar. Faucibus
      scelerisque eleifend donec pretium vulputate. Eget egestas purus viverra
      accumsan in nisl. Vitae sapien pellentesque habitant morbi. In tellus
      integer feugiat scelerisque varius. Auctor urna nunc id cursus metus
      aliquam eleifend. Nibh mauris cursus mattis molestie. Mauris rhoncus
      aenean vel elit scelerisque mauris. Congue mauris rhoncus aenean vel elit
      scelerisque mauris pellentesque pulvinar. Consectetur adipiscing elit duis
      tristique. In fermentum posuere urna nec tincidunt praesent semper. Erat
      velit scelerisque in dictum non consectetur a erat nam. Leo in vitae
      turpis massa sed elementum tempus egestas. Eget sit amet tellus cras
      adipiscing enim eu. Et netus et malesuada fames ac turpis egestas
      maecenas. Morbi non arcu risus quis. Ac auctor augue mauris augue neque
      gravida in fermentum et. Lorem ipsum dolor sit amet. Ac turpis egestas
      integer eget aliquet nibh praesent tristique magna. Ut tristique et
      egestas quis. Quam quisque id diam vel quam elementum. Nulla facilisi
      etiam dignissim diam quis enim lobortis scelerisque. Duis tristique
      sollicitudin nibh sit amet. Gravida dictum fusce ut placerat orci. Id
      semper risus in hendrerit gravida rutrum quisque non tellus. Accumsan
      tortor posuere ac ut consequat. Quam lacus suspendisse faucibus interdum
      posuere lorem ipsum dolor.
    </div>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ errorDashboard: error });
  return <div>Error happened</div>;
}
