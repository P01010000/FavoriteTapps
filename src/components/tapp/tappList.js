import getTappElement from './tapp';
import { NOTHING_FOUND, SHOW_MORE } from '../../constants/texts';

export default class TappList {
    constructor() {
        this.clear();
    }

    addTapp({ appstoreName, siteId, locationId }) {
        this.tapps.push({ appstoreName, siteId, locationId });
    }

    addTapps(tapps, reachedEnd) {
        this.reachedEnd = reachedEnd;
        if (tapps !== undefined && Array.isArray(tapps)) {
            tapps.forEach(t => this.addTapp(t));
            this.render();
        }
    }

    clear() {
        this.tapps = [];
        this.reachedEnd = true;
    }

    static createElementWithClasses(type, classes) {
        const node = document.createElement(type);
        classes.forEach(c => node.classList.add(c));
        return node;
    }

    addCallback(callback) {
        this.requestMore = callback;
    }

    render() {
        const { tapps } = this;
        const overview = document.querySelector('#tappOverview');
        overview.querySelectorAll(':scope > *').forEach(n => overview.removeChild(n));
        tapps.forEach(tapp => overview.appendChild(getTappElement(tapp)));

        if (tapps.length === 0) {
            const noData = document.createElement('div');
            noData.classList.add('accordion__content');
            noData.innerText = NOTHING_FOUND;
            overview.appendChild(noData);
        }
        if (!this.reachedEnd) {
            const more = TappList.createElementWithClasses('div', ['accordion__content']);
            const innerDiv = TappList.createElementWithClasses('div', ['right']);
            const link = TappList.createElementWithClasses('a', []);
            link.innerText = SHOW_MORE;
            link.href = '#';
            link.id = 'load';
            link.addEventListener('click', this.requestMore);

            innerDiv.appendChild(link);
            more.appendChild(innerDiv);
            overview.append(more);
        }
    }
}
