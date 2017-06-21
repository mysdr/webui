import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FieldConfig } from '../../common/entity/entity-form/models/field-config.interface';
import { GlobalState } from '../../../global.state';
import { RestService, WebSocketService } from '../../../services/';
import * as _ from 'lodash';

@Component({
  selector: 'app-group-form',
  template: `<entity-form [conf]="this"></entity-form>`
})
export class GroupFormComponent {

  protected route_success: string[] = ['groups'];
  protected resource_name: string = 'account/groups/';
  protected isEntity: boolean = true;

  protected fieldConfig: FieldConfig[] = [
        {
        type: 'input',
        name: 'bsdgrp_gid',
        placeholder: 'GID',
    },
        {
        type: 'input',
        name: 'bsdgrp_group',
        placeholder: 'Name',
    },
    {
      type: 'checkbox',
      name: 'bsdusr_sudo',
      placeholder: 'Permit Sudo'
    },
    {
      type: 'checkbox',
      name: 'allow',
      placeholder: 'Allow repeated GIDs'
    },
  ];
  public users: any[];
  private bsdgrp_gid: any;

  constructor(protected router: Router, protected rest: RestService, protected ws: WebSocketService,
    protected _state: GlobalState) {

  }

  afterInit(entityAdd: any) {
    this.rest.get('account/users/', {limit: 0}).subscribe((res) => {
      this.users = res.data;
    });

    this.rest.get(this.resource_name, {limit: 0, bsdgrp_builtin: false}).subscribe((res) => {
      let gid = 999;
      this.bsdgrp_gid = _.find(this.fieldConfig, { name : "bsdgrp_gid" });
      res.forEach((item, i) => {
        if (item.bsdgrp_gid > gid) gid = item.bsdgrp_gid;
      });
      gid += 1;
      entityAdd.formGroup.controls['bsdgrp_gid'].setValue(gid);
    });

  }

}