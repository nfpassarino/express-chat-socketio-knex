const moment = require('moment');
module.exports = class FileContainer {

    constructor(knex = '', tableName = '') {
        this.knex = knex;
        this.tableName = tableName;
        this.lastId = lastId;
    }

    async save(obj) {
        if(typeof obj === 'object') {
            obj['timestamp'] = moment().format('D/M/YY H:m');
            const id = await this.knex(this.tableName)
                                .insert(obj)
                                .returning('id');
            this.knex.destroy();
            return id;
        }
        return null;
    }

    async updateById(id, newObject) {
        if(typeof id === 'number') {
            await this.knex
                .from(this.tableName)
                .where('id', Number(id))
                .update(newObject);
            this.knex.destroy();
            return id;
        }
        return null;
    }

    async getById(id) {
        if(typeof id === 'number') {
            const obj = await this.knex
                                .from(this.tableName)
                                .select('*')
                                .where('id', Number(id));
            this.knex.destroy();
            return obj;
        } else {
            return null;
        }
    }

    async getAll() {
        const list = await this.knex
                        .from(this.tableName)
                        .select('*');
        this.knex.destroy();
        return list;
    }

    async deleteById(n) {
        if(typeof n === 'number') {
            await this.knex
                        .from(this.tableName)
                        .where('id', Number(id))
                        .del();
            this.knex.destroy();
        }
    }

    async deleteAll() {
        await this.knex(this.tableName).del();
        this.knex.destroy();
    }

}
