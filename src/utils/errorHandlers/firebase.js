/**
 * Handle and return firebase error
 *
 * @param   {object}  errorObject  Error object
 * @return  {object}  Error object
 */
function handleFirebaseError(errorObject) {
  console.error(`FIREBASE ERROR - ${errorObject.message}`);

  return errorObject;
}

export default handleFirebaseError;
