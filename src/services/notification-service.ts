import * as notie from 'notie';

interface IAlertParams {
  text: string;
  waitInSeconds?: number;
}

interface INotieAlertOptions {
  type: number | string;
  text: string;
  stay?: boolean; // optional, default = false
  time: number; // optional, default = 3, minimum = 1,
  position?: string; // optional, default = 'top', enum: ['top', 'bottom']
}

notie?.setOptions({
  colorSuccess: '#57BF57',
  colorWarning: '#D6A14D',
  colorError: '#E1715B',
  colorInfo: '#8554bc', // "#4D82D6",
  colorNeutral: '#A0A0A0',
  colorText: '#FFFFFF',
  // dateMonths: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], // For other languages
  // animationDelay: 300, // Be sure to also change "transition: all 0.3s ease" variable in .scss file
  backgroundClickDismiss: true,
});

class NotificationServiceBase {
  private readonly _waitInSeconds = 2.5;

  private readonly alertTypes = {
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'info',
    neutral: 'neutral',
  };

  readonly messages = {
    noPriviledge: 'You do not have the priviledge...',
    patientNotCheckedIn: 'You MUST check-in patient to continue...',
    youMustLogin: 'You MUST login to access...',
    deleteConfirmMsg: 'Do you want to delete the record?',
    dataIsEmptyOrNotFound: 'Data is EMPTY or NOT found',
    deletePromptMsg: `Are you really sure you want delete? If yes enter: delete`,
    couldNotLoadData: 'Could NOT load data',
    couldNotSave: 'Could NOT saved',
    //
    saveSuccessfuly: 'Saved Successfully!',
    someInputRequiredError: 'Require field(s) NOT inputed...',
    invalidRouteParameter: 'Invalid route parameter...',
  } as const;

  private setDismissible() {
    notie.setOptions({ overlayClickDismiss: true });
  }

  private setNonDismissible() {
    notie.setOptions({ overlayClickDismiss: false });
  }

  success(textOption: string | IAlertParams, waitInSeconds?: number) {
    this.setDismissible();
    const options = this.createOptions({
      type: this.alertTypes.success,
      textOption,
      waitInSeconds,
    });
    notie.alert(options);
  }

  info(textOption: string | IAlertParams, waitInSeconds?: number) {
    this.setDismissible();
    const options = this.createOptions({
      type: this.alertTypes.info,
      textOption,
      waitInSeconds,
    });
    notie.alert(options);
  }

  private createOptions({
    type,
    textOption,
    waitInSeconds,
  }: {
    type: string;
    textOption: string | IAlertParams;
    waitInSeconds?: number;
  }) {
    const options: INotieAlertOptions = {
      type,
      text: this.notieCustMsg({
        text: typeof textOption === 'string' ? textOption : textOption?.text,
        prefix: '',
      }),
      time: (() => {
        if (typeof textOption === 'object' && textOption?.waitInSeconds) {
          return textOption.waitInSeconds;
        }
        return waitInSeconds ?? this._waitInSeconds;
      })(),
    };
    return options;
  }

  error(textOption: string | IAlertParams, waitInSeconds?: number) {
    this.setDismissible();
    const options = this.createOptions({
      type: this.alertTypes.error,
      textOption,
      waitInSeconds,
    });
    notie.alert(options);
  }

  warning(textOption: string | IAlertParams, waitInSeconds?: number) {
    this.setDismissible();
    const options = this.createOptions({
      type: this.alertTypes.warning,
      textOption,
      waitInSeconds,
    });
    notie.alert(options);
  }

  confirm({
    title,
    text,
    yesText,
    cancelText,
  }: {
    title: string;
    text?: string;
    yesText?: string;
    cancelText?: string;
  }) {
    this.setNonDismissible();
    return new Promise<boolean>((resolve, reject) => {
      //
      const __yesText = yesText || 'Yes';
      const cancelText1 = cancelText || 'Cancel';
      let _msg = '';

      if (title && text) {
        _msg = `${title} <br> <small>${text}</small>`;
      } else {
        _msg = title || text || '';
      }

      let options: {
        text: string;
        submitText: string; // optional, default = 'Yes'
        cancelText: string; // optional, default = 'Cancel'
        position?: string; // optional, default = 'top', enum: ['top', 'bottom']
        submitCallback: () => void; // optional
        cancelCallback: () => void; // optional
      } = {} as any;
      options = {
        text: _msg,
        submitText: __yesText,
        cancelText: cancelText1,
        submitCallback: () => {
          resolve(true);
        },
        cancelCallback: () => {
          resolve(false);
        },
      };
      notie.confirm(options);
    });
  }

  prompt({
    message,
    submitText,
    cancelText,
    inputType,
    placeHolderText,
  }: {
    message: string;
    submitText?: string;
    cancelText?: string;
    inputType?: string;
    placeHolderText?: string;
  }) {
    this.setDismissible();
    return new Promise<any>((resolve, reject) => {
      const __submitText = submitText || 'Ok';
      const __cancelText = cancelText || 'Cancel';
      const __inputType = inputType || 'text';
      const __placeHolderText = placeHolderText || '';

      let options: {
        text: string;
        submitText: string; // optional, default = 'Submit'
        cancelText: string; // optional, default = 'Cancel'
        position?: string; // optional, default = 'top', enum: ['top', 'bottom']
        submitCallback: (value: any) => void; // Function(value) optional
        cancelCallback: (value: any) => void; // Function(value) optional
        autocapitalize?: 'words'; // default: 'none'
        autocomplete?: 'on'; // default: 'off'
        autocorrect?: 'off'; // default: 'off'
        autofocus?: 'true'; // default: 'true'
        inputmode?: 'latin'; // default: 'verbatim'
        max?: '10000'; // default: ''
        maxlength?: '10'; // default: ''
        min?: '5'; // default: ''
        minlength?: '1'; // default: ''
        placeholder?: string; // default: ''
        spellcheck?: boolean; // default: 'default'
        step?: '5'; // default: 'any'
        type: string; // default: 'text'
      } = {} as any;

      const _submitCallback = (value: any) => {
        if (value) {
          resolve(value);
        } else {
          reject();
        }
      };
      options = {
        submitText: __submitText,
        cancelText: __cancelText,
        text: message,
        type: __inputType,
        placeholder: __placeHolderText,
        submitCallback: _submitCallback,
        cancelCallback: () => {
          reject();
        },
      };
      notie.input(options);
    });
  }

  date(_initial?: any) {
    this.setDismissible();
    const initial1 = _initial ? new Date(_initial) : new Date();
    return new Promise<string>((resolve: any, reject: any) => {
      let options: {
        value: Date;
        submitText?: string; // optional, default = 'OK'
        cancelText?: string; // optional, default = 'Cancel'
        position?: string; // optional, default = 'top', enum: ['top', 'bottom']
        submitCallback: (value: any) => void; // optional
        cancelCallback: (value: any) => void; // optional
      } = {} as any;
      options = {
        value: initial1,
        submitCallback: (date: any) => {
          resolve(date);
        },
        cancelCallback: () => {
          reject();
        },
      };
      notie.date(options);
    });
  }

  select(title: string, textValueSelectionObjArray: [{ text: string; value: any }]) {
    this.setDismissible();
    return new Promise<any>((resolve, reject) => {
      try {
        const selectionArray: any[] = [];
        textValueSelectionObjArray.forEach((item) => {
          selectionArray.push({
            title: item.text,
            handler: () => {
              resolve(item.value);
            },
          });
        });
        notie.select(title, 'Cancel', selectionArray);
      } catch (error) {
        reject();
      }
    });
  }

  private notieCustMsg({ text, prefix }: { text: string; prefix: string }) {
    if (!text) {
      return prefix;
    }
    return `${prefix} ${text}`;
  }
}

export const NotificationService = new NotificationServiceBase();
