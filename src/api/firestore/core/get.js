import firebase from "../../../firebase";

import store from "redux/store";
import { addDocumentsToCollection } from "redux/actions";

import firebaseErrorHandler from "utils/errorHandlers/firebase";

const firestore = firebase.firestore();

class FirebaseQuery {
  /**
   * Custom made class for handling single or multiple firebase queries
   *
   * @param {string}  collectionName  Name of collection
   * @param {Query}   query           Query object
   * @param {string}  orderBy         Property by which queried results should be ordered by
   * @param {string}  direction       Order by direction
   * @param {integer} limit           Number of results to be displayed
   */
  constructor(collectionName, query, orderBy = "created", direction = "asc", limit = 20) {
    if (!collectionName || !query) {
      throw new Error("Wrong or missing query parameters!");
    }
    this.firestore = firebase.firestore();

    this.orderBy = orderBy;
    this.direction = direction;

    this.limit = limit;
    this.lastDocument = null;

    this.collectionName = collectionName;

    this.query = this.firestore.collection(collectionName);
    this.addQuery(...query);
  }

  /**
   * Add new queries (array of strings) to firestore object
   *
   * @param {string}  orderBy         Property by which queried results should be ordered by
   * @param {string}  direction       Order by direction
   */
  addQuery(key, operator, value) {
    this.query = this.query.where(key, operator, value);
  }

  /**
   * Get first X queried results
   *
   * @return {object} Map of queried objects
   */
  first = () =>
    this.query
      .orderBy(this.orderBy, this.direction)
      .limit(this.limit)
      .get()
      .then(parseQuerySnapshots)
      .then(this.setLastDocument)
      .then(results => {
        addDocumentsToCollection(results, this.collectionName, store.dispatch);
        return results;
      })
      .catch(firebaseErrorHandler);

  /**
   * Get next n queried results
   *
   * @return {object} Map of queried objects
   */
  next = () =>
    this.query
      .orderBy(this.orderBy, this.direction)
      .limit(this.limit)
      .startAfter(this.lastDocument)
      .get()
      .then(parseQuerySnapshots)
      .then(this.setLastDocument)
      .then(results => {
        addDocumentsToCollection(results, this.collectionName, store.dispatch);
        return results;
      })
      .catch(firebaseErrorHandler);

  setLastDocument = documents => {
    this.lastDocument = documents.last;
    return documents;
  };
}

/**
 * Retrieve a specific document of a specific collection
 *
 * @param   {string}  collectionName  Name of a collection
 * @param   {string}  docId           Document ID
 * @return  {object}  Parsed document with document ID added as a property
 */
function document(collectionName, docId) {
  return firestore
    .collection(collectionName)
    .doc(docId)
    .get()
    .then(document => document.data())
    .catch(firebaseErrorHandler);
}

/**
 * Retrieve a specific collection
 *
 * @param   {string}  collectionName  Name of a collection
 * @return  {object}  Whole collection
 */

function retrieveCollection(collectionName, conditions, orderBy, startAfter, limit) {
  let firestoreReq = firestore.collection(collectionName);
  if (Array.isArray(conditions)) {
    conditions.forEach(
      condition =>
        (firestoreReq = firestoreReq.where(condition.field, condition.operator, condition.value))
    );
  } else {
    firestoreReq = firestoreReq.where(conditions.field, conditions.operator, conditions.value);
  }
  if (orderBy) {
    firestoreReq = firestoreReq.orderBy(orderBy.field, orderBy.direction || "desc");
  }
  if (startAfter) {
    firestoreReq = firestoreReq.startAfter(startAfter);
  }
  if (limit) {
    firestoreReq = firestoreReq.limit(limit);
  }

  return firestoreReq.get().catch(firebaseErrorHandler);
}

////////////////////////////////////////////////////////////////////////////////
// Non-exportable functions                                                   //
////////////////////////////////////////////////////////////////////////////////

/**
 * Parse array of retreived documents
 *
 * @param   {array}   querySnapshots  Array of non-parsed documents
 * @return  {object}  Map of parsed documents with their IDs as keys
 */
function parseQuerySnapshots(querySnapshots) {
  const results = {};

  querySnapshots.forEach(document => {
    results[document.id] = document.data();
    results.last = document;
  });

  return results;
}

export default { document, FirebaseQuery, retrieveCollection };
