import {Page,MenuController,NavController,IonicApp,NavParams,Storage, SqlStorage} from 'ionic-angular';
import {Http,Headers} from 'angular2/http';
import {UniteList} from '../../unite-framework/unitelist';
import {ListPage} from '../list/list';
@Page({
	templateUrl: 'build/pages/login/login.html',
	providers: [UniteList],
})

export class LoginPage {
    private login:any;
    private submitted:boolean;
    resultdata:any;  
    data :any;
    http:any;
    baseurl: any;
    payloaddata:any;
    local:any;
    
  constructor(private app: IonicApp,private menu: MenuController, private nav: NavController,http: Http) {
    this.local = new Storage(SqlStorage);
    // If we navigated to this page, we will have an item available as a nav param
    this.nav = nav;
    this.login = {};
    this.data = {};
   // this.payloaddata = {};
    this.data.response = '';
    this.data.site
    this.http = http;
    this.submitted = false;
    
  }
  
  onPageDidEnter() {
		// the left menu should be disabled on the login page
		this.menu.enable(false);
	}

	onPageDidLeave() {
		// enable the left menu when leaving the login page
		this.menu.enable(true);
	}
 
 
 
    
    onLogin(form) {    
    this.submitted = true;
    if (form.valid) { 
       this.baseurl=  this.login.siteurl;
       let headers = new Headers();
		   headers.append('Content-Type', 'application/x-www-form-urlencoded');
       this.payloaddata = 'username='+ this.login.username+'&password='+ this.login.password;
       var link = this.baseurl+'/index.php?option=com_api&app=users&resource=login&format=raw';
       this.http.post(link, this.payloaddata,  {
				headers: headers
				})
        .map(res => res.json())
         .subscribe(data => {
          	this.data.response = data;
            this.local.set('authkey', this.data.response.auth);
             let nav = this.app.getComponent('nav');
             console.log("Login success");
				nav.setRoot(ListPage);
        }, error => {
            console.log("Oooops!");
        });
     }else{
       console.log("not valid"); 
    }
  }
  }

