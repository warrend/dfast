import { getFirestore } from 'firebase-admin/firestore';
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore';
import { getUserSession } from './session.server';

export type Project = {
  id: string;
  category: string;
  createdAt: Date;
  description: string;
  editor: { email: string; name: string };
  history: { status: string; updatedAt: Date }[];
  publication: string;
  status: string;
  title: string;
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

export async function getProjects(request: Request) {
  const user = await getUserSession(request);
  if (!user) {
    throw new Error('Message');
  }
  const col = getFirestore()
    .collection(`users/${user.uid}/projects`)
    .withConverter(assignTypes<Project>());

  const data = await col.get();

  if (data.size === 0) {
    throw new Error('collection does not exit');
  }

  const projects = data.docs.map((doc) => doc.data());
  return projects;
}
