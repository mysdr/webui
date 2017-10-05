import {
  ApplicationRef,
  Component,
  Injector,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {RestService, WebSocketService} from '../../../../services/';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';

@Component({
  selector : 'app-cloudcredentials-gcs',
  template : `<entity-form [conf]="this"></entity-form>`
})
export class CloudCredentialsGCSComponent {

  protected isEntity: boolean = true;
  protected addCall = 'backup.credential.create';
  protected fieldConfig: FieldConfig[] = [
    {
      type : 'input',
      name : 'provider',
      placeholder : 'google cloud service',
      value: 'GCLOUD',
      isHidden: true
    },
    {
      type : 'input',
      name : 'name',
      placeholder : 'Account Name',
    },
    {
      type : 'upload',
      name : 'keyfile',
      placeholder : 'JSON Service Account Key',
    },
  ];

  constructor(
      protected router: Router,
      protected route: ActivatedRoute,
      protected rest: RestService,
      protected ws: WebSocketService,
      protected _injector: Injector,
      protected _appRef: ApplicationRef
  ) {}

  afterInit(entityForm: any) {
  }
}