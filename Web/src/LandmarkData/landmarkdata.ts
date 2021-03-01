import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: '/',
  templateUrl: './landmarkdata.html'
})

export class LanmarkDataComponent implements AfterViewInit {
  title = 'Courier Management';

  constructor(private http: HttpClient) {
  }

  LoadData(): Observable<any[]> {
    const url = "https://localhost:44304/Landmark";
    return this.http.get(url) as Observable<any[]>;
  }

  displayedColumns: string[] = ['id', 'name', 'address','pointOrder','distance'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.LoadData().subscribe((res) => {
      ELEMENT_DATA = res
      this.dataSource.data = ELEMENT_DATA;
    });
    console.log(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

let ELEMENT_DATA = [];
