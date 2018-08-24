import { DEFAULT_QUERY, DEFAULT_ITEMS_PER_QUERY } from '../../constants/texts';

export default class TappLoader {
    constructor(tappList) {
        this.reset();
        this.tappList = tappList;
        this.search = document.querySelector('#searchFilter');
        this.search.addEventListener('keyup', this.newSearch.bind(this));
    }

    reset() {
        this.start = 0;
        this.filter = DEFAULT_QUERY;
        this.take = DEFAULT_ITEMS_PER_QUERY;
        clearTimeout(this.timeout);
        this.timeout = undefined;
    }

    async newSearch({ target: { value: searchString } }) {
        this.filter = searchString;

        clearTimeout(this.timeout);
        this.timeout = setTimeout((() => {
            chayns.showWaitCursor();

            this.start = 0;
            this.load().then(({ data, reachedEnd }) => {
                this.tappList.clear();
                this.tappList.addTapps(data, reachedEnd);
            }).finally(chayns.hideWaitCursor);
        }), 300);
    }

    async load() {
        chayns.showWaitCursor();
        let { Data } = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${this.filter}&Skip=${this.start}&Take=${this.take}`).then((res) => {
            if (!res.ok) Promise.reject(new Error(`${res.status}\n${res.statusText}`));
            return res.json();
        });
        if (Data === null) Data = [];
        this.start += Data.length;
        return { data: Data, reachedEnd: Data.length < DEFAULT_ITEMS_PER_QUERY };
    }
}
