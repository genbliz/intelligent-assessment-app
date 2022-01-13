import axios, { AxiosRequestConfig } from "axios";

class MyHeaders {
  private _headers: Map<string, string[]>;

  private _normalizedNames: Map<string, string>;

  constructor() {
    this._headers = new Map();
    this._normalizedNames = new Map();
  }

  append(name: string, value: string | string[]) {
    const existingValues = this.getAll(name);
    if (!existingValues) {
      this.set(name, value);
    } else {
      this.set(name, value, existingValues);
    }
  }

  delete(name: string) {
    const lcName = name.toLowerCase();
    this._normalizedNames.delete(lcName);
    this._headers.delete(lcName);
  }

  get(name: string) {
    const values = this.getAll(name);
    if (values === null) {
      return null;
    }
    return values.length > 1 ? values : values[0];
  }

  has(name: string) {
    return this._headers.has(name.toLowerCase());
  }

  keys() {
    return Array.from(this._normalizedNames.values());
  }

  values() {
    return Array.from(this._headers.values());
  }

  toJSON() {
    const serialized: { [header: string]: string } = {};
    this._headers.forEach((values, key) => {
      const split: string[] = [];
      values.forEach((v) => {
        split.push(v);
      });
      const _name = this._normalizedNames.get(key);
      if (_name) {
        if (split.length) {
          if (split.length === 1) {
            serialized[_name] = split[0];
          } else {
            serialized[_name] = split[0];
          }
        }
      }
    });
    return serialized;
  }

  private getAll(name: string) {
    return this.has(name)
      ? this._headers.get(name.toLowerCase()) || null
      : null;
  }

  private set(name: string, value: string | string[], oldValues?: string[]) {
    let _values: string[] = Array.isArray(value) ? [...value] : [value];
    if (oldValues) {
      _values = [..._values, ...oldValues];
    }
    this._headers.set(name.toLowerCase(), _values);
    this.setNormalizedName(name);
  }

  private setNormalizedName(name: string) {
    const lcName = name.toLowerCase();
    if (!this._normalizedNames.has(lcName)) {
      this._normalizedNames.set(lcName, name);
    }
  }
}

class HttpServiceBase {
  post<T>({
    url,
    data,
    params,
    headers,
  }: {
    url: string;
    data: any;
    params?: { [name: string]: any };
    headers?: string[][];
  }) {
    return new Promise<T>((resolve, reject) => {
      const _options: AxiosRequestConfig = {};

      const appHeaders = new MyHeaders();
      appHeaders.append("Content-Type", "application/json; charset=UTF-8");
      appHeaders.append("Accept", "application/json");

      if (headers && headers.length) {
        headers.forEach((header) => {
          appHeaders.append(header[0], header[1]);
        });
      }
      _options.headers = appHeaders.toJSON();

      if (params) {
        _options.params = params;
      }

      axios
        .post<T>(url, data, _options)
        .then((body) => {
          resolve(body.data);
        })
        .catch((err) => {
          reject(this.getAxiosError(err)?.data);
        });
    });
  }

  deleteData<T>({
    url,
    params,
    headers,
  }: {
    url: string;
    params?: { [name: string]: any };
    headers?: string[][];
  }) {
    return new Promise<T>((resolve, reject) => {
      const _options: AxiosRequestConfig = {};

      const appHeaders = new MyHeaders();
      appHeaders.append("Content-Type", "application/json; charset=UTF-8");
      appHeaders.append("Accept", "application/json");

      if (headers && headers.length) {
        headers.forEach((header) => {
          appHeaders.append(header[0], header[1]);
        });
      }
      _options.headers = appHeaders.toJSON();

      if (params) {
        _options.params = params;
      }

      axios
        .delete<T>(url, _options)
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(this.getAxiosError(err)?.data);
        });
    });
  }

  get<T>({
    url,
    params,
    headers,
  }: {
    url: string;
    params?: { [name: string]: any };
    headers?: string[][];
  }) {
    return new Promise<T>((resolve, reject) => {
      const _options: AxiosRequestConfig = {};

      const appHeaders = new MyHeaders();
      appHeaders.append("Content-Type", "application/json; charset=UTF-8");
      appHeaders.append("Accept", "application/json");

      if (headers && headers.length) {
        headers.forEach((header) => {
          appHeaders.append(header[0], header[1]);
        });
      }
      _options.headers = appHeaders.toJSON();

      if (params) {
        _options.params = params;
      }

      axios
        .get<T>(url, _options)
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(this.getAxiosError(err)?.data);
        });
    });
  }

  private getAxiosError<T = any>(err: any) {
    if (err?.response) {
      const { data, status, statusText, headers } = err.response;
      if (data && status) {
        return {
          data: data as T,
          status,
          statusText,
          headers,
        };
      }
    } else if (err?.request) {
      // console.log(err.request);
    } else {
      // console.log("Error", err?.message);
    }
    return null;
  }
}

export const HttpService = new HttpServiceBase();
