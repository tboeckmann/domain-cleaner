import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
  public rejectedOutputList: any[] = [];

  constructor(private _fb: FormBuilder) { } // form builder simplify form initialization

    ngOnInit() {
      
      this.domainForm = this._fb.group({
        domains: ['domain.com', <any>Validators.required],
      });

    }

    // Get clean URL from website box
    getParsedDomains() {
      var output = []
      var rejectedOutput = []

      var domains = this.domainForm.controls.domains.value
      var inputs = domains.split(/[\t\r\n ,]+/);
      
      console.log('inputs',inputs)
      
      inputs.forEach(websiteString => {
        var cleanString = this.parseWebsiteString(websiteString)
        if (output.indexOf(cleanString) === -1) { // remove dupes
          // if there are no '.', then it ain't a domain
          websiteString.indexOf(".") === -1 ? rejectedOutput.push(cleanString) : output.push(cleanString);
        }
      })
      this.rejectedOutputList = rejectedOutput.sort()
      this.outputList = output.sort()
      
      console.log('output',output)
      console.log('rejected output',rejectedOutput)
    };

    // Extract domain from known formats (strip 'http*' and remove www, www2 etc and remove trailing slashes )
    parseWebsiteString(websiteString) {
      var match = websiteString.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
      
      // strip the http[s], www etc.
      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        websiteString = match[2];
      }
      // split at slashes and return first value (the domain)
      if (websiteString.indexOf("/") > -1) {
        websiteString = websiteString.split('/')[0];
      }

      // split at '@' for any emails and take second value
      if (websiteString.indexOf("@") > -1) {
        websiteString = websiteString.split('@')[1];
      }
      
      return websiteString;
      
    };

    outputListAsList(list) {
      return list.join("\n")
    }
    // Output list as: " 'a.com', 'b.com' "
    outputListAsStrings(list) {
      return "'" + list.join("', '") + "'"
    }

    copyToClipboard(text) {
      window.prompt("Ctrl+C (Windows) or Cmd+C (Mac) to copy list", text);
    }
    


}
