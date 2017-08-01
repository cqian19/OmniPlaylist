/**
 * Created by cqian19 on 7/28/2017.
 */
import * as RxDB from 'rxdb';
import 'babel-polyfill';

import playlistSchema from './schema';

RxDB.plugin(require('pouchdb-adapter-websql'));
RxDB.plugin(require('pouchdb-replication')); //enable syncing
RxDB.plugin(require('pouchdb-adapter-http')); //enable syncing over http

/**
 * rxdb example from:
 * @link https://github.com/pubkey/rxdb/blob/master/examples/react/src/Database.jsx
 */

let dbPromise = null;

const _create = async function() {
    const db = await RxDB.create({
        name: 'playlistdb',
        adapter: 'websql'
    });
    // await clearDb(db);
    try {
        await db.collection({
            name: 'playlist',
            schema: playlistSchema,
        });
    } catch (error) {
        console.log(error);
    }
    return db;
};

async function clearDb(db) {
    await db.remove();
}

export function getDb() {
    if (!dbPromise) {
        dbPromise = _create();
    }
    return dbPromise;
}