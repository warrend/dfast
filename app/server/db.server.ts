import type {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import { getSession } from '~/sessions';
import { checkSessionCookie, getUserId } from './auth.server';
import { type SUBMISSION_STATUSES } from '~/constants';

export type Project = {
  id: string;
  category: string;
  createdAt: string;
  description: string;
  editor: { email: string; name: string };
  history: { status: string; updatedAt: string }[];
  publication: string;
  status: keyof typeof SUBMISSION_STATUSES;
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
  const uid = await getUserId(request);
  console.log({ uid });

  if (!uid) {
    throw new Error('Message');
  }
  const col = getFirestore()
    .collection(`users/${uid}/projects`)
    .withConverter(assignTypes<Project>());

  const data = await col.get();

  if (data.size === 0) {
    throw new Error('collection does not exit');
  }

  const projects = data.docs.map((doc) => doc.data());
  console.log({ projects });
  return projects;
}
// export const addTodo = async (uid: string, title: string) => {
//   const newTodoRef = db.userTodos(uid).doc();
//   await newTodoRef.set({ title, id: newTodoRef.id });
// };

// export const removeTodo = async (uid: string, todoId: string) => {
//   await db.userTodos(uid).doc(todoId).delete();
// };
