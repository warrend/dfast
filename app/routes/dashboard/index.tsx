import React, { useContext, useEffect, useState } from 'react';
import { json, redirect, type LoaderFunction } from '@remix-run/node';
import { useActionData, useLoaderData, useTransition } from '@remix-run/react';
import { FastList, links as fastListLinks } from '~/components/fast-list';
import { Sidebar, links as sidebarLinks } from '~/components/sidebar';
import styles from '~/styles/dashboard.css';
import { allFastNames, allFastTypes } from '~/constants';
import { objectKeys } from '~/helpers';
import { createFast, type Fast, type TStatus } from '~/server/db.server';

export const links = () => [
  ...fastListLinks(),
  ...sidebarLinks(),
  { rel: 'stylesheet', href: styles },
];

function addMinutesToStartDate(min: number, isoDate: string) {
  const date = new Date(Date.parse(isoDate));
  date.setMinutes(date.getMinutes() + min);
  return date.toISOString();
}

export const action = async ({ request }: { request: Request }) => {
  const form = await request.formData();
  const typeId = form.get('fastType') as keyof typeof allFastTypes;
  const nameId = form.get('fastName') as keyof typeof allFastNames;
  const duration = form.get('duration');
  const errors = {} as { [key: string]: string };

  if (!objectKeys(allFastNames).includes(nameId)) {
    errors.fastType = 'Must use a valid fast name.';
  }

  if (!objectKeys(allFastTypes).includes(typeId)) {
    errors.fastType = 'Must use a valid fast type.';
  }

  if (objectKeys(errors).length) {
    return json({ errors, status: 422 });
  }

  const date = new Date().toISOString();
  const end = addMinutesToStartDate(Number(duration), date);

  const data = {
    nameId,
    typeId,
    end,
    status: 'in-progress',
    start: date,
  } as Fast;

  return await createFast(request, data);
};

type Data = {
  [key: string]: any;
};

type ContextValue = Data | ({ status: number } & Data);

export const FastContext = React.createContext<ContextValue>({
  actionData: {},
  transition: {},
});

export default function Dashboard() {
  const [selectedFast, setSelectedFast] = useState<
    null | keyof typeof allFastNames
  >(null);

  const actionData = useActionData<typeof action>();
  const transition = useTransition();

  return (
    <FastContext.Provider value={{ actionData, transition }}>
      <div>
        <h2>Fasts</h2>
        <div className="dashboard__fast-list">
          <FastList
            selectedFast={selectedFast}
            setSelectedFast={setSelectedFast}
          />
        </div>

        <Sidebar
          visible={selectedFast !== null}
          setVisible={setSelectedFast}
          selectedFast={selectedFast}
        />
      </div>
    </FastContext.Provider>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.log({ errorDashboard: error });
  return <div>Error happened</div>;
}
