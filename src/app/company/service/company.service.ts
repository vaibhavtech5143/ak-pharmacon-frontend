import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { companyApiUrl } from 'src/app/urls/api.url';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCompany() {
    return this.http.get(companyApiUrl.getAllCompanies)
  }
}
