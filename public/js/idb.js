/*
 *
 *  In the absence of internet connectivity, connect and store records in indexedDB
 * 
*/

let db;
const request = indexedDB.open('budget-app', 1);

// on db version changing
request.onupgradeneeded = function(event) {
    // save db reference 
    const db = event.target.result;
    // create a new object store
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// on successful indexedDB connection
request.onsuccess = function(event) {
    db = event.target.result;
    // if online, send browser data to api
    if (navigator.onLine) {
      uploadTransaction();
    }
};

// log errors
request.onerror = function(event) {
    console.log('idb error', {
        event: event,
        request: request,
        db: db,
        error: event.target.errorCode
    });
};

// create new db transaction and add record
function saveRecord(record) {
    // create transaction and access objectStore
    const dbtransaction = db.transaction(['new_transaction'], 'readwrite');
    const transactionObjectStore = dbtransaction.objectStore('new_transaction');

    // add record to objectStore
    transactionObjectStore.add(record);
}

// upload stored browser transactions to application backend
function uploadTransaction() {
    // create new transaction and access objectStore
    const dbtransaction = db.transaction(['new_transaction'], 'readwrite');
    const transactionObjectStore = dbtransaction.objectStore('new_transaction');
  
    // if records, post to api
    const getAll = transactionObjectStore.getAll();
    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    // create new transaction and access objectStore
                    const dbtransaction = db.transaction(['new_transaction'], 'readwrite');
                    const transactionObjectStore = dbtransaction.objectStore('new_transaction');

                    // clear all stored records
                    transactionObjectStore.clear();
                    alert('All transactions added while offline have been added succesfully.');
                })
                .catch(err => {
                    // fetch error
                    console.log(err);
                });
        }
    };
}

// check for online connectivity
window.addEventListener('online', uploadTransaction);