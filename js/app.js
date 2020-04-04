class LandingPage {
    constructor() {
        this._navbar = null;
    }

    run() {
        this._initPage();
    }

    _initPage() {
        this._initNavbarClickHandler();

        const sectionData = this._getMockedSectionData();

        const menuFragment = document.createDocumentFragment();
        const contentFragment = document.createDocumentFragment();
        
        for (let i = 0; i < sectionData.length; i++) {
            const data = sectionData[i];

            const sectionName = data.section;
            const sectionTitle = data.section;
            menuFragment.appendChild(this._createMenuItem(sectionName, sectionTitle, i === 0));

            contentFragment.appendChild(this._createSection(data));
        }

        document.querySelector('#navbar ul').appendChild(menuFragment);
        document.getElementById('main').appendChild(contentFragment);

        this._initScrollTracking();
    }

    // Delegates the event handling to the navbar itself
    // When an item is clicked, it will scroll to its corresponding section
    // then highlight the menu item
    _initNavbarClickHandler() {
        this._navbar = document.getElementById('navbar');

        this._navbar.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (ev.target.tagName === 'A') {
                this._clearNavbarSelectedItems(this._navbar);

                const item = ev.target;
                const sectionName = item.getAttribute('data-section');
                if (sectionName) {
                    const sectionElem = document.querySelector(`section[data-name="${sectionName}"]`);
                    if (sectionElem) {
                        sectionElem.scrollIntoView();
                    } else {
                        document.vody.scrollIntoView();
                    }
                }
                item.parentNode.classList.add('active');
            }
        }, true);
    }

    // The following methods help create DOM nodes
    _createMenuItem(sectionName, sectionTitle, active = false) {
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('data-section', sectionName);

        a.textContent = sectionTitle;

        const li = document.createElement('li');
        if (active) {
            li.classList.add('active');
        }
        li.appendChild(a);

        return li;
    }

    _createSection(sectionData) {
        const section = document.createElement('section');
        section.classList.add('landing-page-section');

        section.setAttribute('data-name', sectionData.section);

        section.appendChild(this._createSectionContent(sectionData));

        return section;
    }

    _createSectionContent(sectionData) {
        const content = document.createElement('div');
        content.classList.add('section-content', 'text-with-image-info');
        if (sectionData.reversed) {
            content.classList.add('image-reversed');
        }

        content.appendChild(this._createImage(sectionData.img));
        content.appendChild(this._createSectionDescription(sectionData.data));

        return content;
    }

    _createImage(imgData) {
        const img = document.createElement('img');
        img.classList.add('section-image');

        img.setAttribute('src', imgData.src);
        img.setAttribute('alt', imgData.alt);

        return img;
    }

    _createSectionDescription(data) {
        const descElem = document.createElement('div');
        descElem.classList.add('section-description');

        descElem.appendChild(this._createHeading(data.title));
        descElem.appendChild(this._createParagraph(data.description));

        return descElem;
    }

    _createHeading(heading) {
        const h = document.createElement('h1');
        h.textContent = heading;
        return h;
    }

    _createParagraph(description) {
        const p = document.createElement('p');
        p.textContent = description;
        return p;
    }

    // Helper methods for navbar state management
    _clearNavbarSelectedItems(navbar) {
        var menuItems = navbar.getElementsByTagName('li');
        for (const item of menuItems) {
            item.classList.remove('active');
        }
    }

    _selectItemForSection(navbar, sectionName) {
        var linkItem = navbar.querySelector(`a[data-section="${sectionName}"]`);
        if (linkItem) {
            linkItem.parentNode.classList.add('active');
        }
    }

    // Tracks the current visible section upon scrolling (with ~200ms delay)
    // and highlights the corresponding menu item
    _initScrollTracking() {
        let timeoutHandle = null;
        let lastActiveSection = null;
        window.addEventListener('scroll', (ev) => {
            clearTimeout(timeoutHandle);

            timeoutHandle = setTimeout(() => {
                const sections = document.getElementsByTagName('section');
                for (const section of sections) {
                    // Finds the first section within the viewport, then breaks
                    if (this._isInViewPort(section)) {
                        if (section != lastActiveSection) {
                            this._clearNavbarSelectedItems(this._navbar);

                            const sectionName = section.getAttribute('data-name');

                            this._selectItemForSection(navbar, sectionName);
                        }
                        
                        lastActiveSection = section;
                        break;
                    }
                }
            }, 300);
        })
    }

    _isInViewPort(section) {
        const rect = section.getBoundingClientRect();
        const top = rect.top;
        console.log(top, window.innerHeight);
        return (
            top >= 0
        );
    };

    _getMockedSectionData() {
        return [{
            section: 'One',
            img: {
                src: './img/cover.jpg',
                alt: 'Lorem ipsum image description'
            },
            data: {
                title: 'Bacon ipsum dolor amet meatloaf boudin',
                description: 'Bacon ipsum dolor amet meatloaf boudin sausage pastrami. Andouille tri-tip swine pork beef ribs picanha short loin cow t-bone capicola shoulder hamburger beef buffalo. Pig porchetta short loin ribeye. Pork loin alcatra cupim cow capicola landjaeger. Ball tip capicola bresaola, burgdoggen chicken cow prosciutto.'
            },
            reversed: false
        }, {
            section: 'Two',
            img: {
                src: './img/cover.jpg',
                alt: 'Lorem ipsum image description'
            },
            data: {
                title: 'Ham pork salami bresaola hamburger',
                description: 'Ham pork salami bresaola hamburger. Fatback buffalo beef ground round pork loin. Landjaeger burgdoggen pork ham, chuck tenderloin fatback meatball meatloaf spare ribs shank pork loin shankle. Shank corned beef flank jowl pork chop doner tail. Brisket tri-tip chuck spare ribs pork belly turkey.'
            },
            reversed: true
        }, {
            section: 'Three',
            img: {
                src: './img/cover.jpg',
                alt: 'Lorem ipsum image description'
            },
            data: {
                title: 'Swine frankfurter beef ribs pork tongue ribeye',
                description: 'Swine frankfurter beef ribs pork tongue ribeye. Ground round tenderloin pork filet mignon shoulder turkey. Pancetta picanha pork belly cow drumstick rump venison kevin cupim boudin frankfurter. Short ribs capicola picanha, meatloaf shoulder tri-tip sirloin cupim kevin buffalo pastrami doner hamburger tongue.'
            },
            reversed: false
        }, {
            section: 'Four',
            img: {
                src: './img/cover.jpg',
                alt: 'Lorem ipsum image description'
            },
            data: {
                title: 'Sausage meatball turducken corned beef',
                description: 'Sausage meatball turducken corned beef leberkas tongue rump swine. Short ribs corned beef swine, cow andouille sausage rump tenderloin capicola. Salami filet mignon pork belly turducken pork, leberkas chislic biltong bacon meatball strip steak tail capicola hamburger.'
            },
            reversed: true
        }];
    }
}

const app = new LandingPage();
app.run();