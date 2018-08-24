/* eslint-disable no-console */

import './index.css';
import './components/designs/Listen.scss';
import './components/designs/Listen--color-1.scss';
import './components/designs/Suche.scss';
import TappList from './components/tapp/tappList';
import TappLoader from './components/tapp/tappLoader';
import AddTapp from './components/addTapp/addTapp';

const init = async () => {
    await chayns.ready;

    const tappList = new TappList();
    const tappLoader = new TappLoader(tappList);

    tappList.addCallback(async () => {
        chayns.showWaitCursor();
        tappLoader.load()
        .then(({ data, reachedEnd }) => tappList.addTapps(data, reachedEnd))
        .finally(chayns.hideWaitCursor);
    });

    const { data, reachedEnd } = await tappLoader.load();
    tappList.addTapps(data, reachedEnd);
    chayns.hideWaitCursor();

    AddTapp();
};

init();
