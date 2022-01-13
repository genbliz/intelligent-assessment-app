import { AppConfig } from "../helper/config";
import { HttpService } from "./http-service";

interface IRequestResult<T> {
  data: T;
  isUnion: boolean;
  message: string | null;
  success: boolean;
}

export class BaseDataService {
  private readonly API_BASE_URL = AppConfig.SERVER_API_BASE_URL;

  private async addHeaders() {
    return undefined;
  }

  protected async postApi<T>({
    url,
    data,
    params,
  }: {
    url: string;
    data: any;
    params?: Record<string, any>;
  }) {
    const result = await HttpService.post<IRequestResult<T>>({
      url: `${this.API_BASE_URL}/${url}`,
      headers: await this.addHeaders(),
      data,
      params,
    });
    return result;
  }

  protected async getApi<T>({
    url,
    params,
  }: {
    url: string;
    params?: Record<string, any>;
  }) {
    const result = await HttpService.get<IRequestResult<T>>({
      url: `${this.API_BASE_URL}/${url}`,
      headers: await this.addHeaders(),
      params,
    });
    return result;
  }

  protected async deleteApi<T>({
    url,
    params,
  }: {
    url: string;
    params?: Record<string, any>;
  }) {
    const result = await HttpService.deleteData<IRequestResult<T>>({
      url: `${this.API_BASE_URL}/${url}`,
      headers: await this.addHeaders(),
      params,
    });
    return result;
  }

  hasTokenError(errMessage: string) {
    if (errMessage && typeof errMessage === "string") {
      if (errMessage.toLowerCase().includes(`Invalid token`.toLowerCase())) {
        return true;
      }
      if (
        errMessage.toLowerCase().includes(`login has expired`.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  }
}
