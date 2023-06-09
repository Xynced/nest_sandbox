import { Op } from "sequelize";
import {CheckDefined} from "../utils/filter.builder.decorator";

export class CategoriesFilterBuilder {
    static init() {
        return new CategoriesFilterBuilder()
    }

    #filter = {
        where: {},
        limit: 2,
        replacements: {}
    }
    #page = 0;


    build() {
        this.#filter['offset'] = this.#filter.limit * this.#page
        return this.#filter;
    }

    @CheckDefined()
    name(value) {
        if (this.#isSearchPredicateActive()) return this;
        this.#addTextSearch(value, 'name');
        return this;
    }

    @CheckDefined()
    description(value) {
        if (this.#isSearchPredicateActive()) return this;
        this.#addTextSearch(value, 'description');
        return this;
    }

    @CheckDefined()
    search(value) {
        this.#addTextSearch(value, 'name');
        this.#addTextSearch(value, 'description');
        return this;
    }

    active(value) {
        if(typeof value === 'undefined') return this;
        this.#filter.where['active'] = value.toLowerCase() === 'true';
        return this;
    }

    @CheckDefined()
    sort(value) {
        const order = (value.startsWith('-')) ? 'DESC' : 'ASC';
        this.#filter['order'] = [[value.replace('-', ''), order]];
        return this;
    }

    @CheckDefined()
    pageSize(value) {
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
        // TODO regexp search also didn't work with sqlite. Should connect postgresql in future
        const replacementName = field + 'Replacement';
        this.#filter.replacements[replacementName] = this.#handleUmlaut(value);
        this.#filter.where[field] = { [Op.regexp]: `:${replacementName}` };
    }

    #handleUmlaut(value) {
        return value.replace(/[ЁE]/, '[ЁЕ]').replace(/[ёе]/, '[ёе]').trim();
    }

    #isSearchPredicateActive() {
        return Object.keys(this.#filter.where).includes('name')
            && Object.keys(this.#filter.where).includes('description');
    }
}