export enum PasswordRequirementsText {
  passwordLength = 'be at least 8 characters in length',
  uniqueCharacters = 'have at least 5 unique characters',
  passwordsMustMatch = 'match in both fields',
  newPasswordNotDifferent = 'be different from your last 5 passwords',
  commonPassword = 'not be an extremely common password'
}

export enum PasswordValidationLabels {
  passwordLength = 'passwordLength',
  uniqueCharacters = 'uniqueCharacters',
  newPasswordNotDifferent = 'newPasswordNotDifferent',
  commonPassword = 'commonPassword',
  passwordsMustMatch = 'passwordsMustMatch',
}

export enum ApiPasswordErrorMessageMapping {
  commonPassword = 'common password',
  newPasswordNotDifferent = 'used in the last'
}
