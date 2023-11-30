import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Berths } from '../../../models/berths';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-berths-list',
  templateUrl: './berths-list.component.html',
  styleUrls: ['./berths-list.component.scss'],
})
export class BerthsListComponent implements OnInit {
  public berthsForm: FormGroup = <FormGroup>{};
  public berths: Berths[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalItems: number = 0;
  public searchText: string = '';
  public selectedId: number | undefined;
  public isHide = false;

  constructor(private fb: FormBuilder, private http: HttpService) {}
  ngOnInit(): void {
    this.berthsForm = this.fb.group({
      berthName: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      berthCapacity: [0, Validators.required],
      berthStatus: ['', [Validators.required]],
    });
    this.getBerths();
  }

  private getBerths() {
    this.http.getBerths().subscribe((data: Berths[]) => {
      this.berths = data;
      this.totalItems = this.berths.length;
    });
  }

  public onPageChange(page: number) {
    this.currentPage = page;
  }

  public getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  public getId(berth: Berths) {
    this.selectedId = berth.id;
    if (this.selectedId) {
      this.http.deleteBerth(this.selectedId).subscribe((res) => {
        console.log('Ship deleted successfully:', res);
        this.getBerths();
      });
    }
  }

  public edit(berth: Berths) {
    this.selectedId = berth.id;
    this.isHide = true;
    this.fillEditForm();
  }

  public fillEditForm() {
    if (this.selectedId) {
      const selected = this.berths.find((res) => res.id === this.selectedId);
      if (selected) {
        this.berthsForm.patchValue({
          berthName: selected.berthName,
          berthCapacity: selected.berthCapacity,
          berthStatus: selected.berthStatus,
        });
      }
    }
  }

  public update(event: any) {
    if (this.selectedId && this.berthsForm.valid) {
      const updatedShip = {
        berthName: this.berthsForm.get('berthName')?.value,
        berthCapacity: this.berthsForm.get('berthCapacity')?.value,
        berthStatus: this.berthsForm.get('berthStatus')?.value,
      };

      const requestBody = JSON.stringify(updatedShip);

      this.http.putBerth(this.selectedId, requestBody).subscribe((res) => {
        console.log('Ship updated successfully:', res);
        this.isHide = false;
        this.getBerths();
      });
    }
  }

  public search() {
    if (this.searchText.trim() === '') {
      this.getBerths();
      return;
    }
    const searchResults: Berths[] = [];
    const searchTerm = this.searchText.toLowerCase();
    for (const temp of this.berths) {
      if (temp.berthName.toLowerCase().includes(searchTerm)) {
        searchResults.push(temp);
      }
    }
    this.totalItems = searchResults.length;
    this.currentPage = 1;
    this.berths = searchResults;
  }
}
