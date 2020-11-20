import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-misc-settings',
  templateUrl: './misc-settings.component.html',
  styleUrls: ['./misc-settings.component.scss']
})
export class MiscSettingsComponent implements OnInit {
  baseForm: FormGroup;
  nicotinForm: FormGroup;
  constructor(public settings: SettingsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
 
  }

}
