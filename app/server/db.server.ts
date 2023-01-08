import type {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { checkSessionCookie, getUserId } from './auth.server';
import { allFastTypes, type allFastNames } from '~/constants';
import { json, redirect } from '@remix-run/node';
import { objectEntries } from '~/helpers';

export type TStatus = 'in-progress' | 'completed';

export type Fast = {
  id: string;
  start: string;
  end: string;
  status: TStatus;
  typeId: keyof typeof allFastTypes;
  nameId: keyof typeof allFastNames;
  secondsLeft: number;
};

function addMinutesToStartDate(min: number, isoDate: string) {
  const date = new Date(Date.parse(isoDate));
  date.setMinutes(date.getMinutes() + min);
  return date.toISOString();
}

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

export async function getCurrentFasts(uid: string) {
  try {
    const userRef = getFirestore().collection('users').doc(uid!);
    const userSnapshot = await userRef.get();
    const user = userSnapshot.data();

    const current = user?.current || {};
    return objectEntries(current).map(([_, item]) => item);
  } catch (error) {
    return json({ status: 500 });
  }
}

export async function getRecords(uid: string) {
  try {
    const userRef = getFirestore().collection('users').doc(uid!);
    const userSnapshot = await userRef.get();
    const user = userSnapshot.data();

    return user?.records || {};
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
    return await currentFastsRef.update({
      current: { [data.id]: data },
    });
  } catch (error) {
    return json({ status: 500 });
  }
}

export async function getFast(request: Request, fastId: string) {
  const uid = await getUserId(request);

  try {
    const userRef = getFirestore()
      .collection(`users/${uid}/fasts`)
      .withConverter(assignTypes<Fast>());
    const fastRef = userRef.doc(fastId);
    const doc = await fastRef.get();

    return { id: doc.id, ...doc.data() };
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

export async function createFast(request: Request, data: Fast) {
  try {
    const uid = await getUserId(request);
    const fastsRef = getFirestore()
      .collection(`users/${uid}/fasts`)
      .withConverter(assignTypes<Fast>());

    const createdFast = await fastsRef.add(data);
    const updatedData = { ...data, id: createdFast.id };
    await addFastToCurrentFasts(updatedData, uid!);

    return redirect(`/dashboard/fasts/${updatedData.id}`);
  } catch (error) {
    return json({ status: 500 });
  }
}

export async function removeFast(request: Request, docId: string) {
  try {
    const uid = await getUserId(request);
    if (!uid) {
      return json({ status: 422 });
    }

    const userRef = getFirestore().collection('users').doc(uid);
    await userRef.collection('fasts').doc(docId).delete();

    return await userRef.update({
      [`current.${docId}`]: FieldValue.delete(),
    });
  } catch (error) {
    return;
  }
}

export async function removeFromCurrentFasts(
  request: Request,
  fastId: string,
  nameId: string,
  typeId: string
) {
  try {
    const uid = await getUserId(request);

    if (!uid) {
      return json({ status: 422 });
    }

    const currentFastsRef = getFirestore().collection('users').doc(uid);
    await currentFastsRef.update({
      [`current.${fastId}`]: FieldValue.delete(),
    });

    await completeFast(uid, fastId);
    return await updateRecord(uid, nameId, allFastTypes[typeId].duration);
  } catch (error) {
    return json({ status: 500 });
  }
}

export async function completeFast(uid: string, fastId: string) {
  try {
    const userRef = getFirestore().collection('users').doc(uid);
    const fastRef = userRef.collection('fasts').doc(fastId);
    return await fastRef.update({
      status: 'completed',
    });
  } catch (error) {
    return json({ status: 500 });
  }
}

export async function updateRecord(
  uid: string,
  nameId: string,
  duration: number
) {
  try {
    const currentFastsRef = getFirestore().collection('users').doc(uid);
    return await currentFastsRef.update({
      [`records.${nameId}.minutes`]: FieldValue.increment(duration),
      [`records.${nameId}.total`]: FieldValue.increment(1),
    });
  } catch (error) {
    return json({ status: 500 });
  }
}
