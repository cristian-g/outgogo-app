'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Outgogo documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutModalPageModule.html" data-type="entity-link">AboutModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutModalPageModule-869e308d585f295ff51c8c1bd4df8cba"' : 'data-target="#xs-components-links-module-AboutModalPageModule-869e308d585f295ff51c8c1bd4df8cba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutModalPageModule-869e308d585f295ff51c8c1bd4df8cba"' :
                                            'id="xs-components-links-module-AboutModalPageModule-869e308d585f295ff51c8c1bd4df8cba"' }>
                                            <li class="link">
                                                <a href="components/AboutModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutPageModule.html" data-type="entity-link">AboutPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutPageModule-101eb6f3ee56278c5b8f12c31394346b"' : 'data-target="#xs-components-links-module-AboutPageModule-101eb6f3ee56278c5b8f12c31394346b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutPageModule-101eb6f3ee56278c5b8f12c31394346b"' :
                                            'id="xs-components-links-module-AboutPageModule-101eb6f3ee56278c5b8f12c31394346b"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutTextPageModule.html" data-type="entity-link">AboutTextPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutTextPageModule-88e4d80727043ae1a93cdb9460f66f3a"' : 'data-target="#xs-components-links-module-AboutTextPageModule-88e4d80727043ae1a93cdb9460f66f3a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutTextPageModule-88e4d80727043ae1a93cdb9460f66f3a"' :
                                            'id="xs-components-links-module-AboutTextPageModule-88e4d80727043ae1a93cdb9460f66f3a"' }>
                                            <li class="link">
                                                <a href="components/AboutTextPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutTextPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActionsPageModule.html" data-type="entity-link">ActionsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActionsPageModule-7e9054edac245c0a15fa6d981eeae628"' : 'data-target="#xs-components-links-module-ActionsPageModule-7e9054edac245c0a15fa6d981eeae628"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActionsPageModule-7e9054edac245c0a15fa6d981eeae628"' :
                                            'id="xs-components-links-module-ActionsPageModule-7e9054edac245c0a15fa6d981eeae628"' }>
                                            <li class="link">
                                                <a href="components/ActionsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-50d904b0a41a975fe99337d285022d26"' : 'data-target="#xs-components-links-module-AppModule-50d904b0a41a975fe99337d285022d26"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-50d904b0a41a975fe99337d285022d26"' :
                                            'id="xs-components-links-module-AppModule-50d904b0a41a975fe99337d285022d26"' }>
                                            <li class="link">
                                                <a href="components/AboutModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutModalPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AboutPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AboutTextPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutTextPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpModalPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpTextPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpTextPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyApp.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyApp</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PointsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PointsPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacyModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivacyModalPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacyPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivacyPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacyTextPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivacyTextPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TosModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TosModalPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TosPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TosPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TosTextPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TosTextPage</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-50d904b0a41a975fe99337d285022d26"' : 'data-target="#xs-injectables-links-module-AppModule-50d904b0a41a975fe99337d285022d26"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-50d904b0a41a975fe99337d285022d26"' :
                                        'id="xs-injectables-links-module-AppModule-50d904b0a41a975fe99337d285022d26"' }>
                                        <li class="link">
                                            <a href="injectables/ActionsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ActionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConsumptionsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ConsumptionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OutgoesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OutgoesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymentsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PaymentsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VehiclesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>VehiclesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpModalPageModule.html" data-type="entity-link">HelpModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HelpModalPageModule-aedbfe933332d0e8ed83803588dc37be"' : 'data-target="#xs-components-links-module-HelpModalPageModule-aedbfe933332d0e8ed83803588dc37be"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpModalPageModule-aedbfe933332d0e8ed83803588dc37be"' :
                                            'id="xs-components-links-module-HelpModalPageModule-aedbfe933332d0e8ed83803588dc37be"' }>
                                            <li class="link">
                                                <a href="components/HelpModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpPageModule.html" data-type="entity-link">HelpPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HelpPageModule-a86b2f9ce3f59c2bd45d98a8802dbd9c"' : 'data-target="#xs-components-links-module-HelpPageModule-a86b2f9ce3f59c2bd45d98a8802dbd9c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpPageModule-a86b2f9ce3f59c2bd45d98a8802dbd9c"' :
                                            'id="xs-components-links-module-HelpPageModule-a86b2f9ce3f59c2bd45d98a8802dbd9c"' }>
                                            <li class="link">
                                                <a href="components/HelpPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpTextPageModule.html" data-type="entity-link">HelpTextPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HelpTextPageModule-ef8ade16d8b8ecbb00d44e2a824b3a8d"' : 'data-target="#xs-components-links-module-HelpTextPageModule-ef8ade16d8b8ecbb00d44e2a824b3a8d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpTextPageModule-ef8ade16d8b8ecbb00d44e2a824b3a8d"' :
                                            'id="xs-components-links-module-HelpTextPageModule-ef8ade16d8b8ecbb00d44e2a824b3a8d"' }>
                                            <li class="link">
                                                <a href="components/HelpTextPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpTextPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewConsumptionPageModule.html" data-type="entity-link">NewConsumptionPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewConsumptionPageModule-a61af60c192864cf8c880fd95fb68d72"' : 'data-target="#xs-components-links-module-NewConsumptionPageModule-a61af60c192864cf8c880fd95fb68d72"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewConsumptionPageModule-a61af60c192864cf8c880fd95fb68d72"' :
                                            'id="xs-components-links-module-NewConsumptionPageModule-a61af60c192864cf8c880fd95fb68d72"' }>
                                            <li class="link">
                                                <a href="components/NewConsumptionPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewConsumptionPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewOutgoPageModule.html" data-type="entity-link">NewOutgoPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewOutgoPageModule-2f4ba3fdb1c4b34c69fa0d2c8298bc5e"' : 'data-target="#xs-components-links-module-NewOutgoPageModule-2f4ba3fdb1c4b34c69fa0d2c8298bc5e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewOutgoPageModule-2f4ba3fdb1c4b34c69fa0d2c8298bc5e"' :
                                            'id="xs-components-links-module-NewOutgoPageModule-2f4ba3fdb1c4b34c69fa0d2c8298bc5e"' }>
                                            <li class="link">
                                                <a href="components/NewOutgoPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewOutgoPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewPaymentPageModule.html" data-type="entity-link">NewPaymentPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewPaymentPageModule-5fe5723d187982f6525657a737a66555"' : 'data-target="#xs-components-links-module-NewPaymentPageModule-5fe5723d187982f6525657a737a66555"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewPaymentPageModule-5fe5723d187982f6525657a737a66555"' :
                                            'id="xs-components-links-module-NewPaymentPageModule-5fe5723d187982f6525657a737a66555"' }>
                                            <li class="link">
                                                <a href="components/NewPaymentPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewPaymentPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewVehiclePageModule.html" data-type="entity-link">NewVehiclePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewVehiclePageModule-41e5fe5d7ab35368e6b6a4d3d734d45b"' : 'data-target="#xs-components-links-module-NewVehiclePageModule-41e5fe5d7ab35368e6b6a4d3d734d45b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewVehiclePageModule-41e5fe5d7ab35368e6b6a4d3d734d45b"' :
                                            'id="xs-components-links-module-NewVehiclePageModule-41e5fe5d7ab35368e6b6a4d3d734d45b"' }>
                                            <li class="link">
                                                <a href="components/NewVehiclePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewVehiclePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OutgoPageModule.html" data-type="entity-link">OutgoPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OutgoPageModule-fb2417c3e00fbcb36194347ed3ec7804"' : 'data-target="#xs-components-links-module-OutgoPageModule-fb2417c3e00fbcb36194347ed3ec7804"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OutgoPageModule-fb2417c3e00fbcb36194347ed3ec7804"' :
                                            'id="xs-components-links-module-OutgoPageModule-fb2417c3e00fbcb36194347ed3ec7804"' }>
                                            <li class="link">
                                                <a href="components/OutgoPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OutgoPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentPageModule.html" data-type="entity-link">PaymentPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PaymentPageModule-694ac39ba48f15e3260abb0e3f79991e"' : 'data-target="#xs-components-links-module-PaymentPageModule-694ac39ba48f15e3260abb0e3f79991e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PaymentPageModule-694ac39ba48f15e3260abb0e3f79991e"' :
                                            'id="xs-components-links-module-PaymentPageModule-694ac39ba48f15e3260abb0e3f79991e"' }>
                                            <li class="link">
                                                <a href="components/PaymentPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaymentPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PointsPageModule.html" data-type="entity-link">PointsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PointsPageModule-a6c96ad60f6502cbaf28e10b6d89fa6e"' : 'data-target="#xs-components-links-module-PointsPageModule-a6c96ad60f6502cbaf28e10b6d89fa6e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PointsPageModule-a6c96ad60f6502cbaf28e10b6d89fa6e"' :
                                            'id="xs-components-links-module-PointsPageModule-a6c96ad60f6502cbaf28e10b6d89fa6e"' }>
                                            <li class="link">
                                                <a href="components/PointsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PointsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivacyModalPageModule.html" data-type="entity-link">PrivacyModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrivacyModalPageModule-6a624731c5b11930d475bc8d67a93e67"' : 'data-target="#xs-components-links-module-PrivacyModalPageModule-6a624731c5b11930d475bc8d67a93e67"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrivacyModalPageModule-6a624731c5b11930d475bc8d67a93e67"' :
                                            'id="xs-components-links-module-PrivacyModalPageModule-6a624731c5b11930d475bc8d67a93e67"' }>
                                            <li class="link">
                                                <a href="components/PrivacyModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivacyModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivacyPageModule.html" data-type="entity-link">PrivacyPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrivacyPageModule-45b13c40cc87706fa021f4cb98fa4de5"' : 'data-target="#xs-components-links-module-PrivacyPageModule-45b13c40cc87706fa021f4cb98fa4de5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrivacyPageModule-45b13c40cc87706fa021f4cb98fa4de5"' :
                                            'id="xs-components-links-module-PrivacyPageModule-45b13c40cc87706fa021f4cb98fa4de5"' }>
                                            <li class="link">
                                                <a href="components/PrivacyPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivacyPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivacyTextPageModule.html" data-type="entity-link">PrivacyTextPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrivacyTextPageModule-242c2c6a148aa6337af1c80f567d4f7a"' : 'data-target="#xs-components-links-module-PrivacyTextPageModule-242c2c6a148aa6337af1c80f567d4f7a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrivacyTextPageModule-242c2c6a148aa6337af1c80f567d4f7a"' :
                                            'id="xs-components-links-module-PrivacyTextPageModule-242c2c6a148aa6337af1c80f567d4f7a"' }>
                                            <li class="link">
                                                <a href="components/PrivacyTextPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivacyTextPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TosModalPageModule.html" data-type="entity-link">TosModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TosModalPageModule-a1878fae64ab04392d506ffd9ed28c85"' : 'data-target="#xs-components-links-module-TosModalPageModule-a1878fae64ab04392d506ffd9ed28c85"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TosModalPageModule-a1878fae64ab04392d506ffd9ed28c85"' :
                                            'id="xs-components-links-module-TosModalPageModule-a1878fae64ab04392d506ffd9ed28c85"' }>
                                            <li class="link">
                                                <a href="components/TosModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TosModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TosPageModule.html" data-type="entity-link">TosPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TosPageModule-aa9aabf35e9adafb7a1b93f053c0ccc0"' : 'data-target="#xs-components-links-module-TosPageModule-aa9aabf35e9adafb7a1b93f053c0ccc0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TosPageModule-aa9aabf35e9adafb7a1b93f053c0ccc0"' :
                                            'id="xs-components-links-module-TosPageModule-aa9aabf35e9adafb7a1b93f053c0ccc0"' }>
                                            <li class="link">
                                                <a href="components/TosPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TosPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TosTextPageModule.html" data-type="entity-link">TosTextPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TosTextPageModule-c879bb1b591ac2a35624c41b7f75b546"' : 'data-target="#xs-components-links-module-TosTextPageModule-c879bb1b591ac2a35624c41b7f75b546"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TosTextPageModule-c879bb1b591ac2a35624c41b7f75b546"' :
                                            'id="xs-components-links-module-TosTextPageModule-c879bb1b591ac2a35624c41b7f75b546"' }>
                                            <li class="link">
                                                <a href="components/TosTextPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TosTextPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VehiclePageModule.html" data-type="entity-link">VehiclePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VehiclePageModule-20d894fef47bf1adb1b0d0d298639d94"' : 'data-target="#xs-components-links-module-VehiclePageModule-20d894fef47bf1adb1b0d0d298639d94"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VehiclePageModule-20d894fef47bf1adb1b0d0d298639d94"' :
                                            'id="xs-components-links-module-VehiclePageModule-20d894fef47bf1adb1b0d0d298639d94"' }>
                                            <li class="link">
                                                <a href="components/VehiclePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VehiclePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VehiclesListPageModule.html" data-type="entity-link">VehiclesListPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VehiclesListPageModule-28723cfd35ba8c8aef66a2e781c9cab5"' : 'data-target="#xs-components-links-module-VehiclesListPageModule-28723cfd35ba8c8aef66a2e781c9cab5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VehiclesListPageModule-28723cfd35ba8c8aef66a2e781c9cab5"' :
                                            'id="xs-components-links-module-VehiclesListPageModule-28723cfd35ba8c8aef66a2e781c9cab5"' }>
                                            <li class="link">
                                                <a href="components/VehiclesListPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VehiclesListPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Action.html" data-type="entity-link">Action</a>
                            </li>
                            <li class="link">
                                <a href="classes/Consumption.html" data-type="entity-link">Consumption</a>
                            </li>
                            <li class="link">
                                <a href="classes/FinancialStatus.html" data-type="entity-link">FinancialStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/Outgo.html" data-type="entity-link">Outgo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payment.html" data-type="entity-link">Payment</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/Vehicle.html" data-type="entity-link">Vehicle</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/APIInterceptor.html" data-type="entity-link">APIInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/JwtInterceptor.html" data-type="entity-link">JwtInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});