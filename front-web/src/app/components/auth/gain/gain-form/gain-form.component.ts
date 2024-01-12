import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gain-form',
  templateUrl: './gain-form.component.html',
  styleUrls: ['./gain-form.component.scss']
})
export class GainFormComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,) { }

  formGroup: FormGroup;
  @Output() code = new EventEmitter<number>();


  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      code: [null, Validators.required]
    });
  }



  getErrorCode() {
    return this.formGroup.get('code').hasError('required') ? 'code requis' : '';
  }


  get f() { return this.formGroup.controls; }


  sendCodeGain() {
    
    if (this.formGroup.invalid) {
      return;
    }
    this.code.emit(this.formGroup.value);
  }



}
