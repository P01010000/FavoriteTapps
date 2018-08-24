import htmlToElement from 'html-to-element';


const getTappElement = ({ appstoreName, siteId, locationId }) => {
    // Create an Individual Child of the Userlist. Now you Can Write the actual HTML-Code in here
    const element = htmlToElement(`
        <div class="ListItem ListItem--clickable ListItem__Image">
            <div class="ListItem__head">
                <div class="ListItem__Image" style="background-image: url(https://sub60.tobit.com/l/${locationId}); background-size: contain;"></div>
                <div class="ListItem__Title">
                    <div class="ListItem__Title--headline">${appstoreName}</div>
                    <div class="ListItem__Title--description">${siteId}</div>
                </div>
            </div>
        </div>`);
    // return the created Element
    element.addEventListener('click', () => chayns.openUrlInBrowser(`https://chayns.net/${siteId}`));
    return element;
};

export default getTappElement;
