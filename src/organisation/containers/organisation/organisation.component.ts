import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { debug } from 'util';
import { Organisation } from 'src/organisation/organisation.model';




@Component({
  selector: 'app-prd-organisation-component',
  templateUrl: './organisation.component.html',
})
export class OrganisationComponent implements OnInit, OnDestroy {

  orgData: string[];
  organisationSubscription: Subscription;

  constructor(
    private store: Store<fromStore.OrganisationState>
  ) { }


  ngOnInit(): void {
    this.organisationSubscription = this.store.pipe(select(fromStore.getOrganisationSelArr)).subscribe(data => {
      this.orgData = data
    });

  }


  ngOnDestroy() {
    this.organisationSubscription.unsubscribe();
  }

}
