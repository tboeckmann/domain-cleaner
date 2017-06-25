import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public domainForm: FormGroup
  public title: string = 'Domain cleaner for lists of domains, emails, urls etc.';
  public domains: string = "domain.com";
  public outputList: any[] = [];

  constructor(private _fb: FormBuilder) { } // form builder simplify form initialization

    ngOnInit() {
      
      this.domainForm = this._fb.group({
        domains: ['domain.com', <any>Validators.required],
      });

    }

    // Get clean URL from website box
    getParsedDomains() {
      var output = []
      var inputs = this.domains.split(/[\t\r\n ,]+/);
      console.log('inputs',inputs)
      inputs.forEach(websiteString => {
        output.push(this.parseWebsiteString(websiteString));
      })
      this.outputList = output
    };

    // Extract domain from known formats (strip 'http*' and remove www, www2 etc and remove trailing slashes )
    parseWebsiteString(websiteString) {
      var match = websiteString.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
      } else {
        return null;
      }
    };



}
