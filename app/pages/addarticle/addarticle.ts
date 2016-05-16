
import {Page, NavController, NavParams, Alert,IonicApp} from 'ionic-angular';
import {UniteItem} from '../../unite-framework/uniteitem';
import {UniteToast} from '../../unite-framework/unitetoast';
import {ListPage} from '../list/list';
import {NgZone} from 'angular2/core';
@Page({
    templateUrl: 'build/pages/addarticle/addarticle.html',
    providers: [UniteItem,UniteToast]
})
export class AddArticlePage {
    addarticle: any;
    submitted: boolean;
    resultdata: any;
    local: any;
    platform: any;
    events: any;
    items:any;
    updateButton: boolean;
    baseurl: string;
    uniteItem:any;
    selectedItem: any;
    noitem:boolean;
    
    constructor(private nav: NavController, uniteItem: UniteItem, private UniteToast: UniteToast, private app: IonicApp, private zone:NgZone) {
        // If we navigated to this page, we will have an item available as a nav param
        this.nav = nav;
        this.addarticle = {};
        this.submitted = false;
        this.updateButton = false;
        this.uniteItem = uniteItem;
        this.noitem=true;
        this.items = [];
        this.uniteItem.limit = 10;
        this.loadData();
    }
   loadData() {
        let url = 'http://172.132.45.153/joomla3.4_api/index.php?option=com_api&app=articles&resource=category&format=raw&key=a2d3ca11a77374b296ef06a1e20a9ea4&lang=en';
        this.uniteItem.getData(url).then((value: any) => {
		if(value){
				this.items = value;
			}
		});
	}
  
    postData(form){
    this.submitted = true;
    if (form.valid) {     
    let title = this.addarticle.articlename;
    let introtext = this.addarticle.introtext;
    let catid = this.addarticle.cat;
    let published = this.addarticle.published;
    let unpublished = this.addarticle.unpublished;
		let datatobesend =  'title='+title+'&introtext='+introtext+'&catid='+catid+'&published='+published+'&unpublished='+unpublished;
		let url = 'http://172.132.45.45/joomla/investsure/index.php?option=com_api&app=content&resource=articles&format=raw&key=62edf1d7654d77cc424ca8e5ea8a1140';
		this.uniteItem.postData(url,datatobesend).then((value: any) => {
		 this.zone.run(() => {
			if(value){
				if(value == 'Error'){
					this.uniteItem.toastOptions.message = "Something went wrong!";
					this.uniteItem.showToast();
				}else if(value.success && value.success == 'false'){
					this.uniteItem.toastOptions.message = value.message;
					this.uniteItem.showToast();
				}
				else
				{
					let nav = this.app.getComponent('nav');
					nav.setRoot(ListPage);
				}
			}
          });
			
		});
	}else{
			console.log("invalid");
		}
	}
   
}
