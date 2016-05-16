import {Page, NavController, NavParams} from 'ionic-angular';
import {UniteList} from '../../unite-framework/unitelist';
import {DetailsPage} from '../details/details';
import {GettingStartedPage} from '../getting-started/getting-started';
import {UniteToast} from '../../unite-framework/unitetoast';
import {UniteItem} from '../../unite-framework/uniteitem';

@Page({
	templateUrl: 'build/pages/list/list.html',
	providers: [UniteList,UniteToast,UniteItem],
})

export class ListPage {
	selectedItem: any;
	icons: string[];
	items: any;
	unitelist: any;
	baseurl: string;
	searchQuery: string;
	enableSearchbar: boolean;
	enablePullToRefresh: boolean;
	noitem:boolean;
	infinitescroll: any;
	uniteitem:any;
	unitetoast:any;
	constructor(private nav: NavController, navParams: NavParams, unitelist: UniteList, uniteitem: UniteItem, unitetoast: UniteToast) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		console.log(this.selectedItem);
		this.items = [];
		// API Definitions
		this.unitetoast=unitetoast;
		this.unitelist = unitelist;
		this.uniteitem = uniteitem;
		// http://jlike.cloudaccess.host/index.php?app=jlike&resource=annotations&option=com_api&format=raw&key=87aa58a73cc77f31411d226202e4a6b0&content_id=1&type=annotation&subtype=collaborators&client=com_content&plg_type=content&plg_name=jlike_articles&order=DESC&parent_id=0
		//this.unitelist.baseurl = 'http://jlike.cloudaccess.host/index.php?app=jlike&resource=annotations&option=com_api&format=raw&key=87aa58a73cc77f31411d226202e4a6b0&content_id=1&type=annotation&subtype=collaborators&client=com_content&plg_type=content&plg_name=jlike_articles&order=DESC&parent_id=0';
		this.unitelist.baseurl = 'http://172.132.45.45/joomla/investsure/index.php?option=com_api&app=content&resource=articles&format=raw&key=62edf1d7654d77cc424ca8e5ea8a1140';
		this.unitelist.limit = 10;
		this.searchQuery = '';
		this.enableSearchbar = true;
		this.enablePullToRefresh = true;
		this.noitem=true;
		// Loader Config
		if(this.selectedItem){
			this.unitelist.id = this.selectedItem;
		}
		this.unitelist.loaderconfig.content = 'Hold Tight!';
		this.loadData(null);
	}
	loadData(infiniteScroll) {
		if (infiniteScroll) {
			if (infiniteScroll.state == 'refreshing') {
				if (this.infinitescroll) {
					this.infinitescroll.enable(true);
				}
			} else {
				this.infinitescroll = infiniteScroll;
			}
		}
		this.unitelist.getData().then((value: any) => {
		if(value){
				if(value == 'Error'){
					this.unitetoast.toastOptions.message = "Something went wrong!";
					this.unitetoast.showToast();
				}else if(value.success && value.success == 'false'){
				    
				    this.unitetoast.toastOptions.message = value.message;
					this.unitetoast.showToast();
				}
				}
			if (value.data) {
				this.items = this.items.concat(value.data.results);
				
			}
			if (infiniteScroll) {
				infiniteScroll.complete();
				if (!value.data)
					infiniteScroll.enable(false);
			}
			//console.log(value);
		});

	}
	getItems(searchbar) {
		//let q = searchbar.value;
		this.unitelist.limitstart = 0;
		this.unitelist.search = this.searchQuery;		
		this.items = [];
		console.log(this.items.length);
		if(this.items.length >= 0)
		this.noitem=false;
		this.loadData(null);
	}
	doRefresh(refresher) {
		this.unitelist.limitstart = 0;
		this.items = [];
		this.loadData(refresher);
	}	
	 clearSearch() {
		this.unitelist.search = '';
		this.unitelist.limitstart = 0;
		this.items = [];
		this.loadData(null);
	}
	itemTapped(event, item) {
		this.nav.push(DetailsPage, {
			item: item
		});
	}
	

}
