class Tabs {
    constructor(idContainerOptions) {
        this.containerOptions = document.getElementById(idContainerOptions);
        this.tabs = this.containerOptions.querySelector('.tabs');

        this.tabs.addEventListener('click', (event) => {
            //
            if ([...event.target.classList].includes('tabs__button')) {
                //
                const tab = event.target.dataset.tab;

                if (this.containerOptions.querySelector('.tab--active')) {
                    this.containerOptions.querySelector('.tab--active').classList.remove('tab--active');
                }

                this.containerOptions.querySelector(`#${tab}`).classList.add('tab--active');

                if (this.tabs.querySelector('.tabs__button--active')) {
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }

                event.target.classList.add('tabs__button--active');
            }
        })
    }
}

export default Tabs;