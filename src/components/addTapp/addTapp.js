const AddTapp = (() => {
    const formular = document.querySelector('#requestTapp');
    const submit = formular.querySelector('input[type="button"]');

    submit.addEventListener('click', (async () => {
        if (!formular.reportValidity()) return;
        const loggedIn = await login;
        if (loggedIn) {
            const data = [...new FormData(formular).entries()];
            const message = data.map(([k, v]) => `${k} = ${v}`).join('\n');
            chayns.intercom.sendMessageToPage({ text: message })
            .then(() => chayns.dialog.alert('Gespeichert'))
            .then(() => document.querySelector('form').reset())
            .catch(() => chayns.dialog.alert('Fehler'));
        }
    }));
});

async function login() {
    return new Promise(((resolve, reject) => {
        if (chayns.env.user.isAuthenticated) {
            resolve();
        } else {
            chayns.setAccessTokenChange(true, (() => {
                // replace the callback with an empty one
                chayns.setAccessTokenChange(false, () => undefined);
                if (chayns.env.user.isAuthenticated) resolve(); else reject();
            }));
        }
    }));
}

export default AddTapp;
