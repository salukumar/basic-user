import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { match } from './match.validator';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true }]

})
export class PasswordMatchDirective implements Validator {
  
  constructor() { }

  @Input('appPasswordMatch') mustMatch: string[] = [];

    validate(formGroup: FormGroup): ValidationErrors {
        return match(this.mustMatch[0], this.mustMatch[1])(formGroup);
    }
}


