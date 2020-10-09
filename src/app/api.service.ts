import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private firestore: AngularFirestore;

  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;
  }

  async getTrainingSolves() {
    return this.firestore
      .collection('trainingSolves')
      .get()
      .toPromise()
      .then(
        async (query) =>
          await Promise.all(
            query.docs.map(async (doc) => {
              const solve = await doc.data().solve.get();
              return { id: solve.id, ...solve.data() };
            })
          )
      );
  }

  async addTrainingSolve(solve): Promise<void> {
    const newSolve = await this.firestore.collection('solves').add(solve);
    await this.firestore.collection('trainingSolves').add({
      solve: this.firestore.doc(`solves/${newSolve.id}`).ref,
    });
  }

  async getCompetitionSolves() {
    return this.firestore
      .collection('competitionSolves')
      .get()
      .toPromise()
      .then(
        async (query) =>
          await Promise.all(
            query.docs.map(async (doc) => {
              const solves = await Promise.all(
                doc.data().solves.map(async (solve) => solve.get())
              );

              return {
                id: doc.id,
                ...doc.data(),
                solves: solves.map((solve: any) => solve.data()),
              };
            })
          )
      );
  }

  async getCompetitionById(id: string) {
    return this.firestore
      .collection('competitionSolves')
      .doc(id)
      .get()
      .toPromise()
      .then(async (doc) => {
        const solves = await Promise.all(
          doc.data().solves.map(async (solve) => solve.get())
        );

        return {
          id: doc.id,
          ...doc.data(),
          solves: solves.map((solve: any) => solve.data()),
        };
      });
  }

  async addCompetition(competition): Promise<void> {
    const solves = await Promise.all(
      competition.solves.map(async (solve) => {
        const newSolve = await this.firestore.collection('solves').add(solve);
        return this.firestore.doc(`solves/${newSolve.id}`).ref;
      })
    );
    await this.firestore.collection('competitionSolves').add({
      ...competition,
      solves,
    });
  }
}
