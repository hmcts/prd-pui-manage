import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCasesFeature from '../../store';
import * as fromCaseList from '../../store/reducers';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';

@Component({
  selector: 'app-exui-case-share-complete',
  templateUrl: './case-share-complete.component.html',
  styleUrls: ['case-share-complete.component.scss']
})
export class CaseShareCompleteComponent implements OnInit, OnDestroy {

  public shareCases$: Observable<SharedCase[]>;
  public shareCases: SharedCase[];
  public newShareCases$: Observable<SharedCase[]>;
  public newShareCases: SharedCase[];
  public shareCaseState$: Observable<fromCasesFeature.ShareCasesState>;
  public isLoading: boolean;
  public completeScreenMode: string;
  public removeUserFromCaseToggleOn$: Observable<boolean>;

  constructor(public store: Store<fromCaseList.UnassignedCasesState>, public featureToggleService: FeatureToggleService) {}

  public ngOnInit() {
    this.shareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.shareCases$.subscribe(shareCases => {
      this.shareCases = shareCases;
    });
    this.store.dispatch(new fromCasesFeature.AssignUsersToCase(this.shareCases));

    this.shareCaseState$ = this.store.pipe(select(fromCasesFeature.getCaseShareState));
    this.shareCaseState$.subscribe(state => this.isLoading = state.loading);
    this.newShareCases$ = this.store.pipe(select(fromCasesFeature.getShareCaseListState));
    this.newShareCases$.subscribe(shareCases => {
      this.completeScreenMode = this.checkIfIncomplete(shareCases);
      this.newShareCases = shareCases;
    });
    this.removeUserFromCaseToggleOn$ = this.featureToggleService.getValue('remove-user-from-case-mo', false);
  }

  public ngOnDestroy() {
    if (this.completeScreenMode === 'COMPLETE') {
      this.store.dispatch(new fromCasesFeature.ResetCaseSelection());
    }
  }

  public checkIfIncomplete(shareCases: SharedCase[]) {
    if (this.isLoading) {
      if (shareCases.some(aCase => aCase.pendingShares && aCase.pendingShares.length > 0)
        || shareCases.some(aCase => aCase.pendingUnshares && aCase.pendingUnshares.length > 0)) {
        return 'PENDING';
      }
      return 'COMPLETE';
    }
  }

  public showUserAccessBlock(aCase: SharedCase): boolean {
    if ((aCase.pendingShares && aCase.pendingShares.length > 0)
      || (aCase.pendingUnshares && aCase.pendingUnshares.length > 0)) {
        return true;
    }
    return false;
  }
}
