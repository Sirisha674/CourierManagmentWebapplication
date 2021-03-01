import { Component, OnInit, ViewChild, ElementRef, NgZone ,Injectable} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'landmark',
  templateUrl: './landmark.html'
})

@Injectable()
export class LandmarkComponent {

  createForm: FormGroup;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  private headers: Headers = new Headers({});

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  initForm(): void {
    this.createForm = this.fb.group({
      name: ['',Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

  isValidInput(fieldName): boolean {
    return this.createForm.controls[fieldName].invalid &&
      (this.createForm.controls[fieldName].dirty || this.createForm.controls[fieldName].touched);
  }

  LoadData(): any {
    const url = "https://localhost:44304/Landmark";
    this.http.get<any>(url).subscribe((res) => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
    });
  }

  create(): any {
    console.log(this.createForm.value);
    var requestBody = {
      "name": this.createForm.value.name,
      "address": this.createForm.value.address,
      "latitude": Number(this.createForm.value.latitude),
      "longitude": Number(this.createForm.value.longitude),
      "phonenumber": this.createForm.value.phonenumber
    };
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    this.http.post('https://localhost:44304/Landmark', requestBody).subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit() {
    this.initForm();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
