import type {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getSession } from '~/sessions';
import { checkSessionCookie, getUserId } from './auth.server';
import { type allFastNames, type allFastTypes } from '~/constants';
import { json } from '@remix-run/node';

export type TStatus = 'in-progress' | 'completed';

export type Fast = {
  id: string;
  start: string;
  end: string;
  status: TStatus;
  typeId: keyof typeof allFastNames;
  nameId: keyof typeof allFastTypes;
};

export function assignTypes<T extends object>() {
  return {
    toFirestore(doc: T): DocumentData {
      return doc;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      return snapshot.data()! as T;
    },
  };
}

export async function getCurrentFasts(request: Request) {
  const uid = await getUserId(request);

  try {
    const userRef = getFirestore().collection('users').doc(uid!);
    const userSnapshot = await userRef.get();
    const user = userSnapshot.data();

    const current = user?.current || [];
    console.log({ current });

    return current;
  } catch (error) {
    return json({ status: 500 });
  }
}

export async function getFasts(request: Request) {
  const uid = await getUserId(request);

  try {
    const fastsRef = getFirestore()
      .collection(`users/${uid}/fasts`)
      .withConverter(assignTypes<Fast>());

    const data = await fastsRef.get();

    const fasts = data.docs.map((doc) => doc.data());
    return fasts;
  } catch (error) {
    return json({ status: 500 });
  }
}

async function addFastToCurrentFasts(data: any, uid: string) {
  try {
    const currentFastsRef = getFirestore().collection('users').doc(uid);
    await currentFastsRef.update({
      current: FieldValue.arrayUnion(data),
    });
  } catch (error) {
    return json({ status: 500 });
  }
}

export async function getFast(request: Request, fastId: string) {
  const uid = await getUserId(request);

  try {
    const userRef = getFirestore().collection(`users/${uid}/fasts`);
    const fastRef = userRef.doc(fastId);
    const doc = await fastRef.get();

    return doc.data();
  } catch (error) {
    return json({ status: 500 });
  }
}

async function addFastToFastTotals(data: any, uid: string) {
  try {
    const fastsRef = getFirestore().collection('users').doc(uid);
    await fastsRef.update({
      totals: FieldValue.arrayUnion(data),
    });
  } catch (error) {
    return json({ status: 500 });
  }
}

export async function createFast(request: Request, data: any) {
  try {
    const uid = await getUserId(request);
    const fastsRef = getFirestore()
      .collection(`users/${uid}/fasts`)
      .withConverter(assignTypes<Fast>());

    const createdFast = await fastsRef.add(data);
    const updatedData = { id: createdFast.id, ...data };
    await addFastToCurrentFasts(updatedData, uid!);

    return json({ status: 200 });
  } catch (error) {
    return json({ status: 500 });
  }
}
