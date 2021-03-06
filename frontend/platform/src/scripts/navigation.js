class Navigation {
    constructor() {
        this.addEventListeners();
        let activeListItem = document.querySelector('nav li.active');
        this._changeMenuItem(activeListItem.firstChild, false);
    }

    addEventListeners() {
        this._onLinkClicked = this._onLinkClicked.bind(this);
        const links = Array.from(document.querySelectorAll('nav a'));
        links.forEach(link => {
            link.addEventListener('click', this._onLinkClicked);
        })
    }

    _onLinkClicked(evt) {
        evt.preventDefault();
        const a = evt.target;
        this._changeMenuItem(a);
    }

    _changeMenuItem(a, isUserInteraction = true) {
        const li = a.parentElement;

        if (this.activeListItem === li) {
            return;
        }

        // deactivate old list item
        if (this.activeListItem) {
            this.activeListItem.classList.remove('active');
        }

        // activate new item
        li.classList.add('active');
        this.activeListItem = li;

        // navigation request
        let href = a.getAttribute('href');
        let viewName = href.substring(1);
        const navRequestEvent = new CustomEvent('nav-request', {
            detail: {viewName, isUserInteraction}
        });
        document.dispatchEvent(navRequestEvent);
    }
}