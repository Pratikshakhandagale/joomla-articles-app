
import {Page, NavController, NavParams, Storage, LocalStorage, Events, Alert, IonicApp} from 'ionic-angular';
import {UniteItem} from '../../unite-framework/uniteitem';
import {UniteToast} from '../../unite-framework/unitetoast';

import {ListPage} from '../list/list';
@Page({
    templateUrl: 'build/pages/addcat/addcat.html',
    providers: [UniteItem,UniteToast]
})
export class AddCatPage {
    addcat: any;
    submitted: boolean;
    resultdata: any;
    local: any;
    scannerRes: any;
    platform: any;
    events: any;
    pages: any;
    updateButton: boolean;
    constructor(private nav: NavController, events: Events, private UniteItem: UniteItem, private app: IonicApp) {
        // If we navigated to this page, we will have an item available as a nav param
        this.nav = nav;
        this.addcat = {};
        this.submitted = false;
        this.local = new Storage(LocalStorage);
        this.scannerRes = [];
        this.events = events;
        this.updateButton = false;
        this.pages = [];
       // UniteItem.getMenu().then((value) => {
      //      this.getCustomPage(value);
      //  });
    }
    getCustomPage(pages) {
        this.pages = [];
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].addedMenu) {
                this.pages.push(pages[i]);
            }
        }
    }
    addCat(form) {
        this.submitted = true;
        if (form.valid) {
            this.events.publish('page:added', this.addcat);
            //this.UniteItem.getMenu().then((value) => {
           //     this.getCustomPage(value);
           // });
        } else {
        }
        return false;
    }
    removeMenu(index) {
        let confirm = Alert.create({
            title: 'Configure',
            message: 'Do you want to delete it?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('No clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.pages.splice(index, 1);
                        this.events.publish('page:removed', index);
                    }
                }
            ]
        });
        this.nav.present(confirm);
    }
    editMenu(index, item) {
        this.addcat.menuname = item.title;
        this.addcat.component = item.component;
        this.addcat.index = index;
        this.updateButton = true;
    }
    updateMenu(form) {
        this.submitted = true;
        if (form.valid) {
            this.events.publish('page:updated', this.addcat);
           // this.UniteItem.getMenu().then((value) => {
           //     this.getCustomPage(value);
           //     this.updateButton = false;
           //     this.addcat = {};
            //    this.submitted = false;
           // });
        } else {
            console.log("not valid");
        }
        return false;
    }
    
    
    cancleAddCat(event){
    let nav = this.app.getComponent('nav');
					nav.setRoot(ListPage);
    
    }

}
