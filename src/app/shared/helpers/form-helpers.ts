import {
  AbstractControl, FormArray, FormControl,
  FormGroup, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { GameHelpers } from '@shared/helpers/game-helpers';
import { GeneralHelpers } from '@shared/helpers/general-helpers';
import { FormField } from '@shared/models/application/form-field';
import _ from 'lodash';

import { PasswordRequirementsText, PasswordValidationLabels } from '@users/models/password-requirements';
import { RoleTypes } from '@users/models/role-types';

export namespace FormHelpers {
  export const NAME_MAX_LENGTH = 150;

  /**
   * Validator function used for validating against password policies.
   *
   * Checks for minimum length, unique character requirements, and ensures the new password
   * is different from the current password (when a currentPassword control exists in the parent form).
   *
   * @param {boolean} [checkUniqueCharacters=false] - Whether to check five unique characters minimum in the password.
   * @returns {ValidatorFn} A validator function that takes an `AbstractControl` and returns `ValidationErrors` or null.
   */
  export function getPasswordValidator(checkUniqueCharacters: boolean = false): ValidatorFn {

    return (control: AbstractControl): ValidationErrors => {
      const { value } = control;

      if (value) {
        const ret = {} as ValidationErrors;
        if (value.length < 8) {
          ret[PasswordValidationLabels.passwordLength] = 'Password must be at least 8 characters in length.';
        }
        if (checkUniqueCharacters && !this.hasAtLeastFiveUniqueCharacters(value)) {
          ret[PasswordValidationLabels.uniqueCharacters] = PasswordRequirementsText.uniqueCharacters;
        }
        if (control.parent
          && control.parent.controls['currentPassword']
          && value === control.parent.controls['currentPassword'].value) {
          ret[PasswordValidationLabels.newPasswordNotDifferent] = 'Password must be different from current password.';
        }

        return ret;
      }

      return null;
    };
  }

  /**
   * Determines whether a given string contains at least five unique characters.
   *
   * Iterates over the characters in the provided string and uses a Set to track unique
   * characters. Once five unique characters are found, the function returns `true`. If
   * the end of the string is reached without finding five unique characters, the function returns `false`.
   *
   * @param {string} stringToCheck - The string to evaluate for unique characters.
   * @returns {boolean} - `true` if the string contains at least five unique characters; otherwise, `false`.
   */
  export function hasAtLeastFiveUniqueCharacters(stringToCheck: string): boolean {
    // Create a Set to store unique characters
    const uniqueChars = new Set();
    let hasFiveOrMoreUniqueChars = false;

    Array.from(stringToCheck).forEach((char) => {
      if (hasFiveOrMoreUniqueChars) return; // Early return if flag set to true

      uniqueChars.add(char);

      // If the Set has at least 5 unique characters, set the flag
      if (uniqueChars.size >= 5) {
        hasFiveOrMoreUniqueChars = true;
      }
    });

    return hasFiveOrMoreUniqueChars;
  }

  /** Usage: requires a password control. */
  export function getConfirmPasswordValidator(checkForRequired: boolean = false): ValidatorFn {
    return (control?: AbstractControl): ValidationErrors => {
      if (checkForRequired && control.parent) {
        // Only error for required when the password has value and confirmPassword is empty
        if (control.parent.controls['password']?.value && !control.value) {
          return { required: 'Confirm password required.' };
        }
      }

      return !control.parent || control.value === control.parent.controls['password'].value
        ? null
        : { passwordsMustMatch: 'Password does not match retyped password.' };
    };
  }

  export function getRequireOneValidator(): ValidatorFn {
    return (control?: FormArray): ValidationErrors => (
      !control || control.length > 0
        ? null
        : { requiresOneItem: 'At least one item is required.' }
    );
  }

  export function getArrayMinValidator(minCount: number = 0): ValidatorFn {
    return (control?: FormArray): ValidationErrors => (
      !control || control.length >= minCount
        ? null
        : { requiresMinItem: `At least ${ minCount } items are required.` }
    );
  }

  export function getArrayMaxValidator(maxCount: number = 0): ValidatorFn {
    return (control?: FormArray): ValidationErrors => (
      !control || control.length <= maxCount
        ? null
        : { requiresMaxItem: `At most ${ maxCount } items are allowed.` }
    );
  }

  export function getGuidValidator(name: string = 'educational unit id'): ValidatorFn {
    const pattern = /[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}/i;
    return (control?: AbstractControl): ValidationErrors => (
      control && control.value && !pattern.test(control.value)
        ? { invalidId: `Not a valid ${ name }` }
        : null
    );
  }

  export function getGalacticCoordinateValidator(): ValidatorFn {
    return (control?: AbstractControl): ValidationErrors => (
      control && control.value && !GameHelpers.galacticCoordinatesRegex.test(control.value)
        ? {
            invalidCoordinates: `Galactic Coordinates must have 4 sets of 4 digit hexadecimals separated by a colon,
            last four may be xxxx to cover region coordinates, example: 19af:19af:19af:xxxx.`
          }
        : null
    );
  }

  export function getHasMinimumValueValidator(minLength: number, controlName: string, label: string): ValidatorFn {
    const qualifier = minLength === 1 ? label : `${ label }s`;
    return (control: FormArray): ValidationErrors => {
      const hasValue = control.controls.reduce((ret, group) => (group.get(controlName).value ? true : ret), false);
      return hasValue ? null : { minimumRequired: `${ minLength } ${ qualifier } required` };
    };
  }

  export function getRoleTypeValidator(roles: RoleTypes[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => (
      control.value && !roles.includes(control.value)
        ? { invalidRoleType: 'invalid role type' }
        : null
    );
  }

  export function getCsvValidator(filename?: string): ValidatorFn {
    const extension = filename ? new RegExp(`${filename}.csv$`, 'i') : /\.csv$/i;
    const errors: ValidationErrors = filename
      ? { invalidFile: `File must be ${ filename }.` }
      : { invalidExtension: 'Invalid extension for CSV file.' };
    // Does basic extension check because mime type may not be reliable. Let the server do that.
    return (control: AbstractControl): ValidationErrors => (control.value && !extension.test(control.value)
      ? errors
      : null);
  }

  export function isControlValid(form: FormGroup, name: string): boolean {
    if (form.controls[name]) {
      // Form control statuses are mutually-exclusive so a disabled form control is never a valid form control.
      return form.controls[name].pristine || form.controls[name].valid || form.controls[name].disabled;
    }
    return false;
  }

  export function getAllFormErrors(control: AbstractControl, name: string = 'form', parentLabel: string = ''): string[] {
    // Falls back to using form name and error key if the error isn't a string so at least something makes sense.
    let errors = control.invalid
      ? _.map(control.errors, (value, key) => (typeof value === 'string' ? value : `${ name }: ${ key }`))
      : [];

    if (control instanceof FormGroup || control instanceof FormArray) {
      _.forEach(control.controls, (child: AbstractControl, controlName: string) => {
        const newParentLabel = parentLabel && parentLabel.length > 0
          ? `${ parentLabel }[${ controlName }]`
          : `[${ controlName }]`;
        errors = errors.concat(FormHelpers.getAllFormErrors(child, controlName, newParentLabel));
      });
    }

    return errors;
  }

  // !!--------------------------------------------------------------------------------------------!!
  // All functions below here are used in ZBPortal Redesign & HLPortal only

  export function controlInvalid(control: FormControl): boolean {
    return control?.invalid;
  }

  export function controlTouchedAndInvalid(control: FormControl): boolean {
    return control?.touched && control.invalid;
  }

  /** Returns if form is not pristine and control is invalid. */
  export function formNotPristineAndControlInvalid(form: FormGroup, control: FormControl): boolean {
    return !form?.pristine && control.invalid;
  }

  export function getMaxLengthNameValidator(): ValidatorFn {
    return Validators.maxLength(NAME_MAX_LENGTH);
  }

  export function studentFormControlInvalid(control: FormControl): boolean {
    return control.touched && (control.invalid || control.value == null || typeof control.value === 'string');
  }

  export function formControlInvalidAndTouched(newUsersArray: FormArray<any>, index: number, name: string): boolean {
    const control = newUsersArray?.at(index)?.get(name) as FormControl;
    return controlTouchedAndInvalid(control);
  }

  export function parentFormControlInvalid(newUsersArray: FormArray<any>, userIndex: number, parentIndex: number, name: string): boolean {
    const userAssociationsArray = newUsersArray?.at(userIndex)?.get('userAssociations') as FormArray;
    const control = userAssociationsArray.at(parentIndex)?.get(name) as FormControl;
    return controlInvalid(control);
  }

  export function formControlInvalid(newUsersArray: FormArray<any>, index: number, name: string): boolean {
    const control = newUsersArray?.at(index)?.get(name) as FormControl;
    return controlInvalid(control);
  }

  export function confirmPasswordInvalid(newUsersArray: FormArray<any>, index: number, confirmPasswordFieldName: string): any {
    const confirmPasswordControl = newUsersArray?.at(index)?.get(confirmPasswordFieldName);
    return confirmPasswordControl?.errors;
  }

  export function isInvalidStudent(userFormGroup: FormArray<any>, studentFieldName: string): boolean {
    if (userFormGroup) {
      for (let i = 0; i < userFormGroup.length; i++) {
        const control = userFormGroup.at(i).get(studentFieldName) as FormControl;
        if (FormHelpers.studentFormControlInvalid(control)) {
          return true;
        }
      }
    }
    return false;
  }

  export function inputFieldErrorText(control: FormControl, formFields: {
    [key: string]: FormField
  }, name: string): string {
    if (control?.errors) {
      if (control.errors.maxlength) {
        return `Max length is ${ control.errors.maxlength } characters`;
      }

      if (control.errors.required) {
        return `${ formFields[name]?.label } required`;
      }

      if (control.errors.email) {
        return 'Email format not valid';
      }
    }
    return null;
  }

  export function nameFieldErrorText(formArrayWithNewUsers: FormArray<any>, formFields: {
    [key: string]: FormField
  }, index: number, name: string): string {
    if (formArrayWithNewUsers) {
      const control = formArrayWithNewUsers.at(index)?.get(name);
      if (control?.errors) {
        if (control.errors.maxlength) {
          return `Max length is ${ control.errors.maxlength.requiredLength } characters`;
        }

        if (control.errors.required) {
          return `${ formFields[name]?.label } required`;
        }

        if (control.errors.invalidUsername) {
          return `${ formFields[name]?.label } not valid`;
        }

        if (control.errors.email) {
          return 'Email format not valid';
        }
      }
    }

    return null;
  }

  export function numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      return typeof value === 'number' && !isNaN(value)
        ? null
        : { invalidYear: `The school year "${ control.value }" is not a valid year` };
    };
  }

  export function confirmPasswordFieldErrorText(formArrayWithNewUsers: FormArray<any>, formFields: {
    [key: string]: FormField
  }, index: number): string {
    const confirmPasswordControl = formArrayWithNewUsers?.at(index)?.get(formFields.confirmPassword.name);

    if (confirmPasswordControl?.errors) {
      if (confirmPasswordControl.errors.passwordsMustMatch) {
        return `Does not match ${ formFields.password.label }`;
      }

      if (confirmPasswordControl.errors.required) {
        return `${ formFields.confirmPassword.label } required`;
      }
    }

    return null;
  }

  /**
   * For use with FormArray<FormControl<boolean>>, representing a group of checkboxes.
   */
  export function requireMinChecked(minRequired: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control instanceof FormArray) {
        const count = control.controls
          .map(c => c.value)
          // count the number of true
          .reduce((acc, value) => (value ? acc + 1 : acc), 0);
        return count >= minRequired ? null : { requireMinChecked: true };
      }
      throw new Error('control is not an instance of FormArray');
    };

  }

  /**
   * For use when validating the selected value against allowed values.
   */
  export function getOneOfValidator(allowedValues: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => (
      control?.value && allowedValues.indexOf(control?.value) === -1
        ? { notAllowed: 'This is not a valid option.' }
        : null
    );
  }

  /**
   * Validates email format using Angular's built-in email validator first,
   * then expands validation to include the domain after the '@'.
   *
   * Custom validation is in compliance with RFC2822:
   * https://datatracker.ietf.org/doc/html/rfc2822
   *
   * Email should be in format of:
   * `{char(s)}{@}{char(s)}{.}{chars}`
   *
   * Uses Angular's Validators.email as the primary validation, then adds additional checks.
   * https://angular.dev/api/forms/Validators#email
   *
   */
  export function getStrictEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const controlValue = control?.value as string;

      if (!controlValue) {
        return null;
      }

      // Validation Step 1: use Angular's built-in email validator (this does not test for existance of '.')
      const angularEmailError = Validators.email(control);

      if (angularEmailError) {
        return angularEmailError;
      }

      // Validation Step 2: Ensure domain part contains at least 1 '.'
      // and follows RFC2822 standards.
      const atIndex = controlValue.indexOf('@');
      const domainPart = controlValue.substring(atIndex + 1);

      // Check that domain contains at least one '.'
      if (!domainPart.includes('.')) {
        return { email: true };
      }

      // Check that domain doesn't start with '.'
      if (domainPart.startsWith('.')) {
        return { email: true };
      }

      // Check that domain doesn't end with '.'
      if (domainPart.endsWith('.')) {
        return { email: true };
      }

      // Check that domain doesn't have consecutive dots
      if (domainPart.includes('..')) {
        return { email: true };
      }

      // Split domain by dots and validate each domain label
      const domainLabels = domainPart.split('.');

      // Check if any label is invalid
      const hasInvalidLabel = domainLabels.some((label) => {
        // Each label must be at least 1 character
        if (label.length === 0) {
          return true;
        }

        // Each domain label can only contain letters, digits, and hyphens (RFC2822)
        if (!/^[A-Za-z0-9-]+$/.test(label)) {
          return true;
        }

        // Labels cannot start or end with hyphen
        if (label.startsWith('-') || label.endsWith('-')) {
          return true;
        }

        return false;
      });

      if (hasInvalidLabel) {
        return { email: true };
      }

      return null;
    };
  }

}
