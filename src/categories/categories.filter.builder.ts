import { Op } from "sequelize";

export class CategoriesFilterBuilder {
    static init() {
        return new CategoriesFilterBuilder()
    }

    #filter = {
        where: {},
        limit: 2
    }
    #page = 0;


    build() {
        this.#filter['offset'] = this.#filter.limit * this.#page
        return this.#filter;
    }

    name(value) {
        if (!value) return this;
        if (this.#isSearchPredicateActive()) return this;
        this.#addTextSearch(value, 'name');
        return this;
    }

    description(value) {
        if (!value) return this;
        if (this.#isSearchPredicateActive()) return this;
        this.#addTextSearch(value, 'description');
        return this;
    }

    search(value) {
        if (!value) return this;
        this.#addTextSearch(value, 'name');
        this.#addTextSearch(value, 'description');
        return this;
    }

    active(value) {
        if(typeof value === 'undefined') return this;
        this.#filter.where['active'] = !!value;
        return this;
    }

    sort(value) {
        if (!value) return this;
        const order = (value.startsWith('-')) ? 'DESC' : 'ASC';
        this.#filter['order'] = [[value.replace('-', ''), order]];
        return this;
    }

    pageSize(value) {
        if (!value) return this;
        this.#filter.limit = value;
        return this;
    }

    page(value) {
        if (value > 1) {
            this.#page = value - 1;
        }
        return this;
    }

    #addTextSearch(value, field) {
        // TODO test after move to postgresql. Looks lime sqlite not support fulltext search with matches
        // this.#filter.where[field] = { [Op.match]: this.#handleUmlaut(value) }
        this.#filter.where[field] = { [Op.like]: `%${this.#handleUmlaut(value)}%` };
    }

    #handleUmlaut(value) {
        return value.replace(/[ЁE]/, '[ЁЕ]').replace(/[ёе]/, '[ёе]').trim();
    }

    #isSearchPredicateActive() {
        return Object.keys(this.#filter.where).includes('name')
            && Object.keys(this.#filter.where).includes('description');
    }
}